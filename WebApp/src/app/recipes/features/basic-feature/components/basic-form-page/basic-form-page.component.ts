import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { MatButton } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'

import { responsiveDialogConfig } from '../../../../../shared/configs/dialogs.config'
import { FormPageComponent } from '../../../../components/forms/form-page/form-page.component'
import { fadeInAnimation, pageLoadAnimation } from '../../../../../app.animations'
import {
    FormFullscreenDialogComponent,
} from '../../../../components/forms/form-fullscreen-dialog/form-fullscreen-dialog.component'

@Component({
    selector: 'app-basic-form-page',
    standalone: true,
    imports: [FormPageComponent, MatButton],
    templateUrl: './basic-form-page.component.html',
    styleUrl: './basic-form-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation, pageLoadAnimation],
})
export class BasicFormPageComponent {
    private readonly dialog = inject(MatDialog)

    openDialogForm() {
        this.dialog.open(FormFullscreenDialogComponent, responsiveDialogConfig)
    }
}
