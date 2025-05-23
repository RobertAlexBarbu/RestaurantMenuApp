import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core'
import { FormatLlmResponsePipe } from '../../pipes/format-llm-response/format-llm-response.pipe'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { TypewriterDirective } from '../../directives/typewriter/typewriter.directive'

import { ScrollService } from '../../../core/services/scroll/scroll.service'
import { messageAppearAnimation } from '../../../app.animations'
import { UtilityService } from '../../../core/services/utility/utility.service'
import { MessageDto } from '../../../core/http/dto/llm/message.dto'

@Component({
    selector: 'app-chat-messages',
    imports: [
        FormatLlmResponsePipe,
        MatProgressSpinner,
        TypewriterDirective,
    ],
    templateUrl: './chat-messages.component.html',
    styleUrl: './chat-messages.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [messageAppearAnimation],
})
export class ChatMessagesComponent {
    private readonly scrollService = inject(ScrollService)
    readonly isMobile = inject(UtilityService).isMobile()

    messages = input.required<MessageDto[]>()
    loadingMessage = input.required<boolean>()
    newMessage = input.required<boolean>()
    marginTopForEmptyMessage = input<string>('23vh')
    emptyMessage = input<string>('How can I help you?')
    typingDone = output()

    emitTypingDone() {
        this.typingDone.emit()
    }

}
