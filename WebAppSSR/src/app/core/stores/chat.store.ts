import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { computed } from '@angular/core'
import { MessageDto } from '../http/dto/llm/message.dto'

export interface ChatStore {
    messages: MessageDto[];
}

export const initialChatState: ChatStore = {
    messages: [],
}

export const ChatStore = signalStore(
    withState(initialChatState),
    withComputed((state) => {
        const last5Messages = computed(() => {
            return [...state.messages()].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).slice(-5)
        })
        const sortedMessages = computed(() => {
            return [...state.messages()].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        })

        return { last5Messages, sortedMessages }
    }),
    withMethods((store) => ({
        initialize(messages: MessageDto[]) {
            patchState(store, () => ({
                messages: [...messages],
            }))
        },

        addMessage(message: MessageDto) {
            patchState(store, (state) => ({
                messages: [...state.messages, message],
            }))
        },


        clearChat() {
            patchState(store, () => ({
                messages: [],
            }))
        },
    })),
)