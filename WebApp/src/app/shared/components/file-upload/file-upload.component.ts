import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatButton } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { InfoDialogComponent } from '../info-dialog/info-dialog.component'
import { MatRipple } from '@angular/material/core'
import { NgClass } from '@angular/common'

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [MatIcon, MatButton, MatRipple, NgClass],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
    private readonly dialog = inject(MatDialog)
    readonly uploadChange = output<File[]>()
    readonly accept = input('*/*')
    readonly detail = input('')
    readonly fileLimit = input(3)
    readonly appearance = input('dropzone')
    files: File[] = []
    randomId = Math.random().toString(36).substring(2, 15)

    onFileInputChange(event: Event) {
        const eventTarget = event.target
        if (eventTarget) {
            const fileInput = eventTarget as HTMLInputElement
            if (fileInput.files && fileInput.files.length > 0) {
                if (this.fileLimit() === 1) {
                    this.files = [fileInput.files[0]]
                } else if (this.files.length >= this.fileLimit()) {
                    this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: 'File Limit Reached',
                            content: `You can upload a maximum of ${this.fileLimit()} files`,
                        },
                    })
                } else {
                    this.files.push(fileInput.files[0])
                }

                this.uploadChange.emit(this.files)
            } else {
                this.files = []
                this.uploadChange.emit([])
            }
        }
    }

    deleteFile(fileInput: HTMLInputElement, index: number) {
        if (fileInput.files) {
            const fileArray = Array.from(fileInput.files)
            fileArray.splice(index, 1)
            const newFileList = new DataTransfer()
            fileArray.forEach((file) => newFileList.items.add(file))
            fileInput.files = newFileList.files
        }
        this.files.splice(index, 1)
        this.uploadChange.emit(this.files)
    }
}
