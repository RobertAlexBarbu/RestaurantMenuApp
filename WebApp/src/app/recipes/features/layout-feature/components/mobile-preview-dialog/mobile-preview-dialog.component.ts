import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
    FullscreenDialogContentComponent,
} from '../../../../../shared/components/fullscreen-dialog-content/fullscreen-dialog-content.component'
import { PhoneComponent } from '../../../../../shared/components/phone/phone.component'
import { DialogRef } from '@angular/cdk/dialog'

@Component({
    selector: 'app-mobile-preview-dialog',
    imports: [
        FullscreenDialogContentComponent,
        PhoneComponent,
    ],
    templateUrl: './mobile-preview-dialog.component.html',
    styleUrl: './mobile-preview-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class MobilePreviewDialogComponent {
    private readonly dialogRef = inject(DialogRef<MobilePreviewDialogComponent>)

    closeDialog() {
        this.dialogRef.close()
    }
}
