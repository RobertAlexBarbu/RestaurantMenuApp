import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'
import { AsyncPipe } from '@angular/common'

import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NotificationService } from '../../../../../core/services/notification/notification.service'
import { ElementDetailDto } from '../../../../../core/http/dto/element/element-detail.dto'
import { ElementService } from '../../../../../core/http/services/element/element.service'
import { TableFeatureStore } from '../../../../stores/table-feature.store'


@Component({
    selector: 'app-table-delete-dialog',
    standalone: true,
    imports: [
        MatButton,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,

        AsyncPipe,
    ],
    templateUrl: './table-delete-dialog.component.html',
    styleUrl: './table-delete-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDeleteDialogComponent {
    private readonly elementService = inject(ElementService)
    private readonly basicFeatureStore = inject(TableFeatureStore)
    private readonly destroyRef = inject(DestroyRef)
    private readonly notificationService = inject(NotificationService)
    private readonly dialogRef = inject(
        MatDialogRef<TableDeleteDialogComponent>,
    )
    public readonly data = inject<ElementDetailDto>(MAT_DIALOG_DATA)
    spinner = signal(false)

    onNoClick(): void {
        this.dialogRef.close()
    }

    onDelete(elementId: number): void {
        this.spinner.set(true)
        this.elementService
            .deleteById(elementId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.basicFeatureStore.deleteElementById(elementId)
                    this.spinner.set(false)
                    this.notificationService.notify(
                        'Element deleted successfully.',
                    )
                    this.dialogRef.close()
                },
            })
    }
}
