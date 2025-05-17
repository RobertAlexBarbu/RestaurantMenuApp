import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core'
import {
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import { MatIcon } from '@angular/material/icon'
import { AsyncPipe } from '@angular/common'
import { MatButton, MatIconButton } from '@angular/material/button'
import {
    DragAndDropSortingComponent,
} from '../../../../../shared/components/drag-and-drop-sorting/drag-and-drop-sorting.component'
import { InfoTextComponent } from '../../../../../shared/components/info-text/info-text.component'
import { CardComponent } from '../../../../../shared/components/card/card.component'
import {
    FullscreenDialogContentComponent,
} from '../../../../../shared/components/fullscreen-dialog-content/fullscreen-dialog-content.component'
import { UtilityService } from '../../../../../core/services/utility/utility.service'
import { ErrorService } from '../../../../../core/services/error/error.service'
import { NotificationService } from '../../../../../core/services/notification/notification.service'
import { DragAndDropSortingItemWithText } from '../../../../../core/stores/drag-and-drop-sorting.store'
import { PositionDto } from '../../../../../core/http/dto/other/position.dto'
import { BehaviorSubject } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ElementService } from '../../../../../core/http/services/element/element.service'
import { TableFeatureStore } from '../../../../stores/table-feature.store'


@Component({
    selector: 'app-table-order-dialog',
    imports: [
        MatIcon,
        MatDialogContent,
        MatIconButton,
        MatButton,
        DragAndDropSortingComponent,
        InfoTextComponent,
        AsyncPipe,
        CardComponent,
        FullscreenDialogContentComponent,
        MatDialogTitle,
        MatDialogActions,
    ],
    standalone: true,
    templateUrl: './table-order-dialog.component.html',
    styleUrl: './table-order-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOrderDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<TableOrderDialogComponent>)
    private readonly utilityService = inject(UtilityService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly tableFeatureStore = inject(TableFeatureStore)
    private readonly elementService = inject(ElementService)
    private readonly errorService = inject(ErrorService)
    private readonly notificationService = inject(NotificationService)
    dragAndDropElements: DragAndDropSortingItemWithText[] = []
    isMobile = this.utilityService.isMobile()
    positions: PositionDto[] = []
    loading$ = new BehaviorSubject<boolean>(false)

    constructor() {
        this.dragAndDropElements = this.tableFeatureStore.elementsWithCategory().map((element) => ({
            position: element.position,
            id: element.id,
            text: `${element.name} (${element.category.name})`,
        }))
    }

    updatePositions(positions: PositionDto[]) {
        this.positions = positions
    }

    save() {
        this.loading$.next(true)
        this.elementService
            .updatePositions(this.positions)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.loading$.next(false)
                    this.notificationService.notify(
                        'Elements ordered with success',
                    )
                    this.tableFeatureStore.updateElementPositions(
                        this.positions,
                    )
                    this.dialogRef.close()
                },
                error: (err) => {
                    this.loading$.next(false)
                    this.errorService.handleError(err)
                    this.dialogRef.close()
                },
            })
    }

    closeDialog() {
        this.dialogRef.close()
    }
}
