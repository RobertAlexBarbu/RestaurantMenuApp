import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    signal,
    viewChild,
} from '@angular/core'
import { DialogRef } from '@angular/cdk/dialog'
import {
    FullscreenDialogContentComponent,
} from '../../../../shared/components/fullscreen-dialog-content/fullscreen-dialog-content.component'
import { ChatInputComponent } from '../../../../shared/components/chat-input/chat-input.component'
import { ChatMessagesComponent } from '../../../../shared/components/chat-messages/chat-messages.component'
import { ChatStore } from '../../../../core/stores/chat.store'
import { LlmService } from '../../../../core/http/services/llm/llm.service'
import { ScrollService } from '../../../../core/services/scroll/scroll.service'
import { ErrorService } from '../../../../core/services/error/error.service'
import { Subject, takeUntil } from 'rxjs'

import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { fadeInAnimation } from '../../../../app.animations'
import { UtilityService } from '../../../../core/services/utility/utility.service'
import { MatButton } from '@angular/material/button'
import { MessageDto } from '../../../../core/http/dto/llm/message.dto'
import { AskQuestionDto } from '../../../../core/http/dto/llm/ask-question.dto'

@Component({
    selector: 'app-chat-sidebar-dialog',
    imports: [
        FullscreenDialogContentComponent,
        ChatInputComponent,
        ChatMessagesComponent,
        MatButton,
    ],
    templateUrl: './chat-dialog.component.html',
    styleUrl: './chat-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [fadeInAnimation],
})
export class ChatDialogComponent implements AfterViewInit {
    private readonly dialogRef = inject(DialogRef<ChatDialogComponent>)
    private readonly chatStore = inject(ChatStore)
    private readonly llmService = inject(LlmService)
    private readonly scrollService = inject(ScrollService)
    private readonly errorService = inject(ErrorService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly utilityService = inject(UtilityService)

    isMobile = this.utilityService.isMobile()
    sortedMessages = this.chatStore.sortedMessages
    stopAskQuestionRequest$ = new Subject<boolean>()
    loadingMessage = signal(false)
    newMessage = signal(false)
    chatInput = viewChild.required<ChatInputComponent>(ChatInputComponent)

    ngAfterViewInit() {
        setTimeout(() => {
            this.scrollService.scrollDialogBottom(true)
        }, 300)

    }

    askQuestion(message: MessageDto): void {
        this.newMessage.set(true)
        this.loadingMessage.set(true)
        const questionDto: AskQuestionDto = { chatHistory: this.chatStore.last5Messages(), question: message.text }
        this.chatStore.addMessage(message)
        setTimeout(() => {
            this.scrollDown()
        }, 0)
        this.sendQuestion(questionDto)
    }

    sendFormattingQuestion() {
        this.newMessage.set(true)
        this.loadingMessage.set(true)
        const questionDto: AskQuestionDto = {
            chatHistory: this.chatStore.last5Messages(),
            question: 'Please showcase all the ways you can format your responses. Provide examples',
        }
        const message: MessageDto = { createdAt: new Date().toISOString(), text: questionDto.question, isAI: false }
        this.chatStore.addMessage(message)
        setTimeout(() => {
            this.scrollDown()
        }, 0)
        this.sendQuestion(questionDto)


    }

    sendQuestion(questionDto: AskQuestionDto) {
        this.llmService.askQuestion(questionDto)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                takeUntil(this.stopAskQuestionRequest$),
            )
            .subscribe({
                next: (r) => {
                    this.loadingMessage.set(false)
                    this.chatInput().enableForm()
                    this.chatStore.addMessage(r)
                },
                error: err => {
                    this.loadingMessage.set(false)
                    this.chatInput().enableForm()
                    this.errorService.handleError(err)
                },
            })
    }

    scrollDown() {
        this.scrollService.scrollDialogBottom(true)
    }

    stopPrompt() {
        this.stopAskQuestionRequest$.next(true)
        this.loadingMessage.set(false)
        this.chatInput().enableForm()
    }

    closeDialog() {
        this.dialogRef.close()
    }
}
