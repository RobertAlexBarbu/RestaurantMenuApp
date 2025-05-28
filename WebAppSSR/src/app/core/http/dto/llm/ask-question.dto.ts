import { MessageDto } from './message.dto'

export interface AskQuestionDto {
    chatHistory: MessageDto[];
    question: string;
    context?: string;
}