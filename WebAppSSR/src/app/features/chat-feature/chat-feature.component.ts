import {Component, DestroyRef, inject, signal, viewChild, ViewContainerRef} from '@angular/core';
import {ToolbarComponent} from "../../shared/components/toolbar/toolbar.component";
import {ChatMessagesComponent} from "../../shared/components/chat-messages/chat-messages.component";
import {MatButton} from "@angular/material/button";
import {ChatInputComponent} from "../../shared/components/chat-input/chat-input.component";
import {DialogRef} from "@angular/cdk/dialog";
import {ChatStore} from "../../core/stores/chat.store";
import {ScrollService} from "../../core/services/scroll/scroll.service";
import {ErrorService} from "../../core/services/error/error.service";
import {UtilityService} from "../../core/services/utility/utility.service";
import {Subject, takeUntil} from "rxjs";
import {MessageDto} from "../../core/http/dto/llm/message.dto";
import {AskQuestionDto} from "../../core/http/dto/llm/ask-question.dto";
import {LlmService} from "../../core/http/services/llm/llm.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuStoreService} from "../../core/stores/menu-store/menu-store.service";
import {ChatItemDetailsDialogComponent} from "./components/chat-item-details-dialog/chat-item-details-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MenuAnalyticsService} from "../../core/http/services/menu-services/menu-analytics/menu-analytics.service";

@Component({
  selector: 'app-chat-feature',
    imports: [
        ToolbarComponent,
        ChatMessagesComponent,
        MatButton,
        ChatInputComponent
    ],
  templateUrl: './chat-feature.component.html',
  styleUrl: './chat-feature.component.scss',
    standalone: true,
    providers: [ChatStore]
})
export class ChatFeatureComponent {
    private readonly chatStore = inject(ChatStore)
    private readonly llmService = inject(LlmService)
    private readonly scrollService = inject(ScrollService)
    private readonly errorService = inject(ErrorService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly utilityService = inject(UtilityService)
    private readonly menuStore = inject(MenuStoreService);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly dialog = inject(MatDialog)


    isMobile = this.utilityService.isMobile()
    sortedMessages = this.chatStore.sortedMessages
    stopAskQuestionRequest$ = new Subject<boolean>()
    loadingMessage = signal(false)
    newMessage = signal(false)
    chatInput = viewChild.required<ChatInputComponent>(ChatInputComponent)

    lastId = -1;
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

    sendFoodQuestion() {
        this.newMessage.set(true)
        this.loadingMessage.set(true)
        const questionDto: AskQuestionDto = {
            chatHistory: this.chatStore.last5Messages(),
            question: 'Please give me some food recommendations',
        }
        const message: MessageDto = { createdAt: new Date().toISOString(), text: questionDto.question, isAI: false }
        this.chatStore.addMessage(message)
        setTimeout(() => {
            this.scrollDown()
        }, 0)
        this.sendQuestion(questionDto)


    }

    sendDrinksQuestion() {
        this.newMessage.set(true)
        this.loadingMessage.set(true)
        const questionDto: AskQuestionDto = {
            chatHistory: this.chatStore.last5Messages(),
            question: 'Please give me some drinks recommendations',
        }
        const message: MessageDto = { createdAt: new Date().toISOString(), text: questionDto.question, isAI: false }
        this.chatStore.addMessage(message)
        setTimeout(() => {
            this.scrollDown()
        }, 0)
        this.sendQuestion(questionDto)


    }
    

    openDetailsDialog(itemId: number) {
        this.dialog.open(ChatItemDetailsDialogComponent, {
            data: {
                itemId: itemId
            },
            viewContainerRef: this.viewContainerRef,
        }).beforeClosed().subscribe(result => {
            this.lastId = -1;
        });
    }

    sendQuestion(questionDto: AskQuestionDto) {
        questionDto.context = 'Food Menu:' + JSON.stringify(this.menuStore.foodCategoriesWithItems()) + 'Drinks Menu:' + JSON.stringify(this.menuStore.drinksCategoriesWithItems()) + 'Menu Details:' + JSON.stringify(this.menuStore.menuDetails()) 
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
        document.addEventListener('click', (event) => {
            // @ts-ignore
            const button = event.target?.closest('.view-details-btn');
            if (button) {
                const itemId = button.getAttribute('data-item-id');
                if (itemId) {
                    this.openDetailsDialog(itemId);
                }
            }
        });
        this.scrollService.scrollBottom(true)
    }

    stopPrompt() {
        this.stopAskQuestionRequest$.next(true)
        this.loadingMessage.set(false)
        this.chatInput().enableForm()
    }
    
}
