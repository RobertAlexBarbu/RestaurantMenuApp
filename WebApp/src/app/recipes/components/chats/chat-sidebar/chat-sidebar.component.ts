import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, viewChild } from '@angular/core'
import { ChatStore } from '../../../../core/stores/chat.store'

import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Subject, takeUntil } from 'rxjs'
import { ChatMessagesComponent } from '../../../../shared/components/chat-messages/chat-messages.component'
import { ChatInputComponent } from '../../../../shared/components/chat-input/chat-input.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgForOf, NgIf } from '@angular/common'
import { MatInput } from '@angular/material/input'
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { MatButton, MatIconButton } from '@angular/material/button'
import { FormatLlmResponsePipe } from '../../../../shared/pipes/format-llm-response/format-llm-response.pipe'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { TypewriterDirective } from '../../../../shared/directives/typewriter/typewriter.directive'
import { MatIcon } from '@angular/material/icon'
import { fadeInAnimation } from '../../../../app.animations'
import { LlmService } from '../../../../core/http/services/llm/llm.service'
import { ScrollService } from '../../../../core/services/scroll/scroll.service'
import { ErrorService } from '../../../../core/services/error/error.service'
import { MessageDto } from '../../../../core/http/dto/llm/message.dto'
import { AskQuestionDto } from '../../../../core/http/dto/llm/ask-question.dto'

@Component({
    selector: 'app-chat-sidebar',
    imports: [
        NgForOf,
        FormsModule,
        MatInput,
        NgIf,
        MatFormField,
        MatLabel,
        CdkTextareaAutosize,
        MatButton,
        ReactiveFormsModule,
        FormatLlmResponsePipe,
        MatProgressSpinner,
        TypewriterDirective,
        MatIcon,
        MatSuffix,
        MatIconButton,
        ChatMessagesComponent,
        ChatInputComponent,
    ],
    templateUrl: './chat-sidebar.component.html',
    styleUrl: './chat-sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [fadeInAnimation],
})
export class ChatSidebarComponent {
    private readonly chatStore = inject(ChatStore)
    private readonly llmService = inject(LlmService)
    private readonly scrollService = inject(ScrollService)
    private readonly errorService = inject(ErrorService)
    private readonly destroyRef = inject(DestroyRef)

    sortedMessages = this.chatStore.sortedMessages
    stopAskQuestionRequest$ = new Subject<boolean>()
    loadingMessage = signal(false)
    newMessage = signal(false)
    chatInput = viewChild.required<ChatInputComponent>(ChatInputComponent)

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
        this.scrollService.scrollBottom(true, 'lateral-chat')
    }

    stopPrompt() {
        this.stopAskQuestionRequest$.next(true)
        this.loadingMessage.set(false)
        this.chatInput().enableForm()
    }


}
