import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core'
import { UtilityService } from '../../../core/services/utility/utility.service'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatFormField, MatInput, MatSuffix } from '@angular/material/input'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MessageDto } from '../../../core/http/dto/llm/message.dto'

@Component({
    selector: 'app-chat-input',
    imports: [
        MatInput,
        ReactiveFormsModule,
        MatFormField,
        CdkTextareaAutosize,
        MatIconButton,
        MatIcon,
        MatSuffix,
    ],
    templateUrl: './chat-input.component.html',
    styleUrl: './chat-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ChatInputComponent {
    private readonly utilityService = inject(UtilityService)

    disabledStopButton = input<boolean>(true)
    newMessage = output<MessageDto>()
    stopPrompt = output<void>()
    isMobile = this.utilityService.isMobile()
    questionForm = new FormControl<string>('', {
        nonNullable: true,
    })

    askQuestion(event: KeyboardEvent): void {
        if (event.key !== 'Enter' || event.keyCode !== 13) {
            return
        }
        event.preventDefault()
        if (!this.questionForm.getRawValue().trim()) {
            return
        }
        const newMessage: MessageDto = {
            createdAt: new Date().toISOString(),
            text: this.questionForm.getRawValue().trim(),
            isAI: false,
        }
        this.newMessage.emit(newMessage)
        this.questionForm.reset()
        this.questionForm.disable()
    }

    askQuestionButton(): void {
        console.log('hey!')
        if (!this.questionForm.getRawValue().trim()) {
            return
        }
        const newMessage: MessageDto = {
            createdAt: new Date().toISOString(),
            text: this.questionForm.getRawValue().trim(),
            isAI: false,
        }
        this.newMessage.emit(newMessage)
        this.questionForm.reset()
        this.questionForm.disable()
    }

    stop() {
        this.stopPrompt.emit()
    }

    enableForm() {
        this.questionForm.enable()
    }

}
