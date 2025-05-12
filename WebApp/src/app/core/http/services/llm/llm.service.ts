import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { EnvironmentService } from '../../../services/environment/environment.service'
import { StorageService } from '../../../services/storage/storage.service'
import { UtilityService } from '../../../services/utility/utility.service'
import { AskQuestionDto } from '../../dto/llm/ask-question.dto'
import { MessageDto } from '../../dto/llm/message.dto'


@Injectable({
    providedIn: 'root',
})
export class LlmService {
    private readonly http = inject(HttpClient)
    private readonly environment = inject(EnvironmentService)
    private readonly storage = inject(StorageService)
    private readonly baseUrl
    private readonly utility = inject(UtilityService)

    constructor() {
        this.baseUrl = this.environment.getBaseUrl() + '/Llm'
    }

    askQuestion(questionDto: AskQuestionDto) {
        return this.http.post<MessageDto>(`${this.baseUrl}/AskQuestion`, questionDto)
    }

    askQuestionWithContext(questionDto: AskQuestionDto) {
        return this.http.post<MessageDto>(`${this.baseUrl}/AskQuestionWithContext`, questionDto)
    }

}
