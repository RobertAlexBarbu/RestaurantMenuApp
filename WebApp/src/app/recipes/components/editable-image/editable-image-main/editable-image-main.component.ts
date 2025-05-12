import { ChangeDetectionStrategy, Component, effect, inject, signal, ViewContainerRef } from '@angular/core'
import {
    EditableImageComponent,
} from '../../../../shared/components/editable-image/editable-image/editable-image.component'
import { StorageService } from '../../../../core/services/storage/storage.service'
import { AppStore } from '../../../../core/stores/app.store'
import { AsyncPipe } from '@angular/common'
import { EditImageDialogComponent } from '../edit-image-dialog/edit-image-dialog.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
    selector: 'app-editable-image-main',
    imports: [
        EditableImageComponent,
        AsyncPipe,
    ],
    templateUrl: './editable-image-main.component.html',
    styleUrl: './editable-image-main.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class EditableImageMainComponent {
    private readonly storage = inject(StorageService)
    private readonly appStore = inject(AppStore)
    private readonly dialog = inject(MatDialog)
    private readonly viewContainerRef = inject(ViewContainerRef)
    imageUrl = signal<string | null>(null)
    loadingImage = signal<boolean>(false)

    constructor() {
        // Handle profile picture logic
        let previousImageUrl = ''
        effect(() => {
            console.log('effect runs')
            const user = this.appStore.user()
            if (user.imageUrl) {
                this.loadingImage.set(true)
                if (user.imageUrl !== previousImageUrl) {
                    this.imageUrl.set(null)
                }
                previousImageUrl = user.imageUrl
                this.storage.download(user.imageUrl).subscribe({
                    next: (value) => {
                        this.imageUrl.set(URL.createObjectURL(value))
                        this.loadingImage.set(false)
                    },
                    error: () => {
                        this.loadingImage.set(false)
                        this.imageUrl.set(null)
                    },
                })
            } else {
                this.loadingImage.set(false)
                this.imageUrl.set(null)
            }
        })

    }

    openEditImageDialog() {
        this.dialog.open(EditImageDialogComponent, {
            autoFocus: false,
            viewContainerRef: this.viewContainerRef,
        })
    }

}
