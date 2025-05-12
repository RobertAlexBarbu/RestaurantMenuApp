import { ChangeDetectionStrategy, Component, inject, ViewContainerRef } from '@angular/core'
import { ChatSidebarComponent } from '../../../../components/chats/chat-sidebar/chat-sidebar.component'

import { PhoneComponent } from '../../../../../shared/components/phone/phone.component'
import { ChatStore } from '../../../../../core/stores/chat.store'
import { MatButton } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { ChatDialogComponent } from '../../../../components/chats/chat-dialog/chat-dialog.component'
import { fullscreenDialogConfig } from '../../../../../shared/configs/dialogs.config'
import { pageLoadAnimation, slideRightToLeftAnimation } from '../../../../../app.animations'
import { RightSidebarComponent } from '../../../../../shared/components/right-sidebar/right-sidebar.component'

@Component({
    selector: 'app-ai-page',
    imports: [
        ChatSidebarComponent,
        PhoneComponent,
        MatButton,
        RightSidebarComponent,
    ],
    templateUrl: './ai-page.component.html',
    styleUrl: './ai-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [ChatStore],
    animations: [pageLoadAnimation, slideRightToLeftAnimation],
})
export class AiPageComponent {

    private readonly dialog = inject(MatDialog)
    private readonly viewContainerRef = inject(ViewContainerRef)


    openChatDialog(): void {
        this.dialog.open(ChatDialogComponent, { ...fullscreenDialogConfig, viewContainerRef: this.viewContainerRef })
    }

}
