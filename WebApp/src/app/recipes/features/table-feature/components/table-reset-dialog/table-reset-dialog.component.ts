import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'

import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { MatButton } from '@angular/material/button'
import { NotificationService } from '../../../../../core/services/notification/notification.service'
import { AppStore } from '../../../../../core/stores/app.store'
import { ElementService } from '../../../../../core/http/services/element-services/element/element.service'
import { ElementOverviewService } from '../../../../../core/http/services/element-services/element-overview/element-overview.service'
import { TableFeatureStore } from '../../../../stores/table-feature.store'

@Component({
    selector: 'app-table-reset-dialog',
    imports: [MatDialogContent, MatDialogTitle, MatDialogActions, MatButton],
    templateUrl: './table-reset-dialog.component.html',
    styleUrl: './table-reset-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TableResetDialogComponent {
    private readonly elementService = inject(ElementService)
    private readonly elementOverviewService = inject(ElementOverviewService)
    private readonly tableFeatureStore = inject(TableFeatureStore)
    private readonly destroyRef = inject(DestroyRef)
    private readonly notificationService = inject(NotificationService)
    private readonly dialogRef = inject(MatDialogRef<TableResetDialogComponent>)
    private readonly appStore = inject(AppStore)
    spinner = signal(false)
    resetDataSpinner = signal(false)

    onNoClick(): void {
        this.dialogRef.close()
    }

    resetData() {
        this.resetDataSpinner.set(true)
        // Reset data using elementService
        this.elementOverviewService
            .resetElementsAndCategories()
            .pipe(
                takeUntilDestroyed(this.destroyRef), // Ensure cleanup when the component is destroyed
            )
            .subscribe({
                next: (data) => {
                    this.tableFeatureStore.initialize(data)
                    this.resetDataSpinner.set(false) // Stop the spinner after the data has been initialized
                    this.dialogRef.close()
                    this.notificationService.notify('Data reset successfully.')
                },
            })
    }
}
