import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'
import { MatButton, MatIconButton } from '@angular/material/button'
import { AsyncPipe } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { FileUploadComponent } from '../../../../../shared/components/file-upload/file-upload.component'
import {
    SingleImageUploadComponent,
} from '../../../../../shared/components/single-image-upload/single-image-upload.component'
import { RepositionOverlayComponent } from '../../../../components/reposition-overlay/reposition-overlay.component'
import {
    CloseOnScrollOverlayComponent,
} from '../../../../components/overlays/close-on-scroll-overlay/close-on-scroll-overlay.component'
import { ImageComponent } from '../../../../../shared/components/image/image.component'
import { MatIcon } from '@angular/material/icon'
import {
    DragAndDropSortingComponent,
} from '../../../../../shared/components/drag-and-drop-sorting/drag-and-drop-sorting.component'
import { MatCard, MatCardHeader, MatCardSubtitle } from '@angular/material/card'
import { CdkCopyToClipboard } from '@angular/cdk/clipboard'
import { MatTooltip } from '@angular/material/tooltip'
import { CardComponent } from '../../../../../shared/components/card/card.component'
import {
    EditableImageMainComponent,
} from '../../../../components/editable-image/editable-image-main/editable-image-main.component'
import { QrGeneratorComponent } from '../../../../components/qr-generator/qr-generator.component'
import { fadeInAnimation, messageAppearAnimation, pageLoadAnimation } from '../../../../../app.animations'

import { StorageService } from '../../../../../core/services/storage/storage.service'
import { NotificationService } from '../../../../../core/services/notification/notification.service'
import { UtilityService } from '../../../../../core/services/utility/utility.service'
import {
    DragAndDropSortingItem,
    DragAndDropSortingItemWithText,
} from '../../../../../core/stores/drag-and-drop-sorting.store'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { DialogComponent } from '../../../../components/dialogs/dialog/dialog.component'
import { ScrollDialogComponent } from '../../../../components/dialogs/scroll-dialog/scroll-dialog.component'
import { FullscreenDialogComponent } from '../../../../components/dialogs/fullscreen-dialog/fullscreen-dialog.component'
import { fullscreenDialogConfig, responsiveDialogConfig } from '../../../../../shared/configs/dialogs.config'
import { ResponsiveDialogComponent } from '../../../../components/dialogs/responsive-dialog/responsive-dialog.component'


export interface Movie {
    id: number
    position: number
    name: string
    releaseYear: number
}

@Component({
    selector: 'app-components-page',
    standalone: true,
    imports: [
        MatButton,
        AsyncPipe,
        FileUploadComponent,
        SingleImageUploadComponent,

        CloseOnScrollOverlayComponent,
        RepositionOverlayComponent,
        ImageComponent,
        MatIcon,
        DragAndDropSortingComponent,
        MatCard,
        MatCardHeader,
        MatCardSubtitle,
        CdkCopyToClipboard,
        MatIconButton,
        MatTooltip,
        CardComponent,
        EditableImageMainComponent,
        QrGeneratorComponent,
    ],
    templateUrl: './components-page.component.html',
    styleUrl: './components-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation, messageAppearAnimation, pageLoadAnimation],
})
export class ComponentsPageComponent {
    private readonly dialog = inject(MatDialog)

    private readonly destroyRef = inject(DestroyRef)
    private readonly storage = inject(StorageService)
    private readonly notificationService = inject(NotificationService)
    private readonly utilityService = inject(UtilityService)
    loadingButton = signal(false)
    loadingDownloadButton = signal(false)
    // Images Fields
    firebaseFileUrl = signal<string | null>(null)
    // Copy to Clipboard Fields
    copyToClipboardText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia eros eget ante suscipit, non sollicitudin urna elementum. Quisque scelerisque felis ac nisi convallis, in cursus purus suscipit. Curabitur ac suscipit neque, ac cursus lorem. Mauris condimentum justo at felis tincidunt maximus.

Sed dictum, tortor sed tincidunt tincidunt, magna ipsum facilisis lectus, at iaculis enim ipsum vel odio. Nulla a venenatis neque. Cras sagittis, lorem vitae lobortis dapibus, erat lectus viverra ipsum, eu rutrum nunc odio sit amet ligula. Ut quis enim at orci placerat fermentum. Integer consequat metus ac nibh sollicitudin, sit amet iaculis nulla ullamcorper.`
    // Drag-and-Drop Fields
    movies: Movie[] = [
        { id: 1, position: 1, name: 'Inception', releaseYear: 2010 },
        { id: 2, position: 2, name: 'The Matrix', releaseYear: 1999 },
        { id: 3, position: 3, name: 'Interstellar', releaseYear: 2014 },
        { id: 4, position: 4, name: 'The Dark Knight', releaseYear: 2008 },
        { id: 5, position: 5, name: 'Parasite', releaseYear: 2019 },
    ]
    dragAndDropElements: DragAndDropSortingItemWithText[] = []

    constructor() {

        // Images Code
        this.storage
            .download('placeholders/cat2.jpg')
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (file) => {
                    this.firebaseFileUrl.set(URL.createObjectURL(file))
                },
            })
        // Drag-and-Drop Code
        this.dragAndDropElements = this.movies.map((movie) => ({
            position: movie.position,
            id: movie.id,
            text: `${movie.name} (${movie.releaseYear})`,
        }))
    }

    // Copy to Clipboard Code
    copyToClipboard() {
        this.notificationService.notify('Content copied.')
    }

    // Drag-and-Drop Code
    elementsOrdered(event: DragAndDropSortingItem[]) {
        console.log(event)
    }

    // Loading Button Code
    startLoading() {
        this.loadingButton.set(true)
        setTimeout(() => {
            this.loadingButton.set(false)
        }, 2000)
    }

    // File Upload/Download Methods
    logFileUpload(files: File[]) {
        console.log(files)
    }

    logImageUpload(file: File | null) {
        console.log(file)
    }

    downloadFile() {
        this.loadingDownloadButton.set(true)
        this.storage
            .download('placeholders/cat2.jpg')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (file) => {
                    this.utilityService.downloadFile(URL.createObjectURL(file), 'cat.jpg')
                    this.loadingDownloadButton.set(false)
                    this.notificationService.notify(
                        'File downloaded successfully.',
                    )
                },
                error: () => {
                    this.loadingDownloadButton.set(false)
                },
            })
    }

    // Dialog Methods
    openDialog() {
        this.dialog.open(DialogComponent, {})
    }

    openScrollDialog() {
        this.dialog.open(ScrollDialogComponent, {})
    }

    openResponsiveDialog() {
        this.dialog.open(ResponsiveDialogComponent, {
            ...responsiveDialogConfig,
        })
    }

    openFullscreenDialog() {
        this.dialog.open(FullscreenDialogComponent, fullscreenDialogConfig)
    }
}
