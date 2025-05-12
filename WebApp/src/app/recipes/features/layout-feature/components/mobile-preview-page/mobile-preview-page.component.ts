import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { PhoneComponent } from '../../../../../shared/components/phone/phone.component'
import { MatDialog } from '@angular/material/dialog'
import { MobilePreviewDialogComponent } from '../mobile-preview-dialog/mobile-preview-dialog.component'
import { fullscreenDialogConfig } from '../../../../../shared/configs/dialogs.config'
import { pageLoadAnimation, slideRightToLeftAnimation } from '../../../../../app.animations'
import { ToolbarComponent } from '../../../../../shared/components/toolbar/toolbar.component'
import { ChatSidebarComponent } from '../../../../components/chats/chat-sidebar/chat-sidebar.component'
import { RightSidebarComponent } from '../../../../../shared/components/right-sidebar/right-sidebar.component'

@Component({
    selector: 'app-mobile-preview-page',
    imports: [
        MatButton,
        MatIcon,
        PhoneComponent,
        ToolbarComponent,
        ChatSidebarComponent,
        RightSidebarComponent,
    ],
    templateUrl: './mobile-preview-page.component.html',
    styleUrl: './mobile-preview-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [slideRightToLeftAnimation, pageLoadAnimation],
})
export class MobilePreviewPageComponent {
    private readonly dialog = inject(MatDialog)
    phone = viewChild(PhoneComponent)


    openMobilePreviewDialog(): void {
        this.dialog.open(MobilePreviewDialogComponent, fullscreenDialogConfig)
    }

    reloadPhone() {
        this.phone()?.reload()
    }
}
