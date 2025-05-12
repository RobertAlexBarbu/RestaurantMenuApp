import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'

import { UserService } from '../../../../core/http/services/user/user.service'
import { AppStore } from '../../../../core/stores/app.store'
import { BehaviorSubject, Observable } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { StorageService } from '../../../../core/services/storage/storage.service'
import {
    SingleImageUploadComponent,
} from '../../../../shared/components/single-image-upload/single-image-upload.component'

@Component({
    selector: 'app-edit-image-dialog',
    standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        SingleImageUploadComponent,
        AsyncPipe,
    ],
    templateUrl: './edit-image-dialog.component.html',
    styleUrl: './edit-image-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditImageDialogComponent {
    private readonly userService = inject(UserService)
    private readonly appStore = inject(AppStore)
    private readonly destroyRef = inject(DestroyRef)
    private readonly storage = inject(StorageService)
    protected readonly Observable = Observable
    readonly dialogRef = inject(MatDialogRef<EditImageDialogComponent>)
    file: File | null = null
    fileUrl: string | null = null
    loadingFileUpload$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false,
    )
    saveLoading$ = new BehaviorSubject<boolean>(false)

    constructor() {
        // Access the user signal directly
        const user = this.appStore.user()
        // Check if the profile picture URL is set
        if (user.imageUrl) {
            this.loadingFileUpload$.next(true)
            // Download the file using the imageUrl
            this.storage.download(user.imageUrl).subscribe({
                next: (value) => {
                    // Process the downloaded file
                    this.file = new File([value], 'example.txt', {
                        type: value.type,
                    })
                    this.fileUrl = URL.createObjectURL(value)
                    this.loadingFileUpload$.next(false)
                },
                error: () => {
                    this.loadingFileUpload$.next(false)
                    this.file = null
                    console.error('No image found')
                },
            })
        } else {
            // Handle case where no profile picture URL is set
            this.loadingFileUpload$.next(false)
            this.file = null
            console.error('No image URL set')
        }
    }

    onNoClick(): void {
        this.dialogRef.close()
    }

    uploadChange(file: File | null): void {
        this.file = file
    }

    saveChanges() {
        this.saveLoading$.next(true)
        const fileAux = this.file
        const user = this.appStore.user()
        if (fileAux === null) {
            if (user.imageUrl) {
                this.userService
                    .deleteImage(user.imageUrl)
                    .subscribe({
                        next: () => {
                            this.saveLoading$.next(false)
                            this.appStore.updateImageUrl({ imageUrl: null })
                            this.dialogRef.close()
                        },
                        error: () => {
                            this.saveLoading$.next(false)
                        },
                    })
            } else {
                this.saveLoading$.next(false)
                this.dialogRef.close()
            }
        } else {
            this.userService.addImage(fileAux, user).subscribe({
                next: (value) => {
                    this.saveLoading$.next(false)
                    this.appStore.updateImageUrl({ imageUrl: value })
                    this.dialogRef.close()
                },
                error: () => {
                    this.saveLoading$.next(false)
                },
            })
        }
    }
}
