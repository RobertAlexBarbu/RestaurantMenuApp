import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, ViewContainerRef } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatOption } from '@angular/material/autocomplete'
import { MatButton, MatIconButton } from '@angular/material/button'
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { MatSelect } from '@angular/material/select'
import {
    ModalFormAutoFocusDirective,
} from '../../../../../shared/directives/modal-form-auto-focus/modal-form-auto-focus.directive'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { FormButtonsComponent } from '../../../../../shared/components/form-buttons/form-buttons.component'
import { CardComponent } from '../../../../../shared/components/card/card.component'
import {
    FullscreenDialogContentComponent,
} from '../../../../../shared/components/fullscreen-dialog-content/fullscreen-dialog-content.component'

import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { TableAddCategoryDialogComponent } from '../table-add-category-dialog/table-add-category-dialog.component'
import { NotificationService } from '../../../../../core/services/notification/notification.service'
import { ElementDetailDto } from '../../../../../core/http/dto/element-dto/element/element-detail.dto'
import { ElementService } from '../../../../../core/http/services/element-services/element/element.service'

import { ErrorService } from '../../../../../core/services/error/error.service'
import { UpdateElementDto } from '../../../../../core/http/dto/element-dto/element/update-element.dto'
import { TableFeatureStore } from '../../../../stores/table-feature.store'
import { FormSectionComponent } from '../../../../../shared/components/form-section/form-section.component'


@Component({
    selector: 'app-table-edit-dialog',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        MatButton,
        MatDialogContent,
        MatError,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        ModalFormAutoFocusDirective,
        ReactiveFormsModule,
        CdkTextareaAutosize,
        FormButtonsComponent,
        CardComponent,
        FullscreenDialogContentComponent,
        MatDialogTitle,
        FormSectionComponent,
        MatDialogActions,
    ],
    templateUrl: './table-edit-dialog.component.html',
    styleUrl: './table-edit-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableEditDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<TableEditDialogComponent>)
    private readonly dialog = inject(MatDialog)
    private readonly elementService = inject(ElementService)
    private readonly tableFeatureStore = inject(TableFeatureStore)
    private readonly notificationService = inject(NotificationService)
    private readonly errorService = inject(ErrorService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly viewContainerRef = inject(ViewContainerRef)
    public readonly data = inject<{
        element: ElementDetailDto
    }>(MAT_DIALOG_DATA)
    loading = signal(false)
    shake = signal(false)
    form = new FormGroup({
        name: new FormControl<string>('', [Validators.required]),
        weight: new FormControl<number>(0),
        symbol: new FormControl<string>('', [Validators.required]),
        density: new FormControl<number>(0),
        meltingPoint: new FormControl<number>(0),
        boilingPoint: new FormControl<number>(0),
        atomicRadius: new FormControl<number>(0),
        categoryId: new FormControl<number | null>(null, [Validators.required]),
        description: new FormControl<string>(''),
    })
    selectOptions = this.tableFeatureStore.categories

    constructor() {
        this.form.patchValue(this.data.element)
        this.form.controls.categoryId.setValue(this.data.element.categoryId)
    }

    isUpdateElementDto = (
        value: typeof this.form.value,
    ): value is UpdateElementDto => {
        return value.categoryId != null
    }

    submit() {
        if (this.form.valid && this.isUpdateElementDto(this.form.value)) {
            this.loading.set(true)
            const updateElementDto: UpdateElementDto = this.form.value
            this.elementService
                .updateById(this.data.element.id, updateElementDto)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: () => {
                        this.tableFeatureStore.updateElementById(this.data.element.id, updateElementDto)
                        this.notificationService.notify(
                            'Element edited successfully.',
                        )
                        this.loading.set(false)
                        this.dialogRef.close()
                    },
                    error: (e) => {
                        this.errorService.handleError(e)
                        this.loading.set(false)
                    },
                })
        } else {
            this.form.markAllAsTouched()
            return
        }
    }

    closeDialog() {
        this.dialogRef.close()
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(TableAddCategoryDialogComponent, {
            autoFocus: false,
            viewContainerRef: this.viewContainerRef,
        })
        dialogRef.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    if (result.data) {
                        this.form.controls.categoryId.setValue(result.data.id)
                    }
                }
            },
        })
    }
}
