import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, ViewContainerRef } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { MatOption } from '@angular/material/core'
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
import { ElementService } from '../../../../../core/http/services/element-services/element/element.service'
import { NotificationService } from '../../../../../core/services/notification/notification.service'
import { ErrorService } from '../../../../../core/services/error/error.service'
import { CreateElementDto } from '../../../../../core/http/dto/element-dto/element/create-element.dto'
import { TableFeatureStore } from '../../../../stores/table-feature.store'
import { FormSectionComponent } from '../../../../../shared/components/form-section/form-section.component'


@Component({
    selector: 'app-table-add-dialog',
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
        MatDialogActions,
        FormSectionComponent,
    ],
    templateUrl: './table-add-dialog.component.html',
    styleUrl: './table-add-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableAddDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<TableAddDialogComponent>)
    private readonly elementService = inject(ElementService)
    private readonly tableFeatureStore = inject(TableFeatureStore)
    private readonly notificationService = inject(NotificationService)
    private readonly errorService = inject(ErrorService)
    private readonly dialog = inject(MatDialog)
    private readonly destroyRef = inject(DestroyRef)
    private readonly viewContainerRef = inject(ViewContainerRef)
    loading = signal(false)
    shake = signal(false)
    selectOptions = this.tableFeatureStore.categories
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

    isCreateElementDto = (
        value: typeof this.form.value,
    ): value is CreateElementDto => {
        return value.categoryId != null
    }

    submit() {
        if (this.form.valid && this.isCreateElementDto(this.form.value)) {
            this.loading.set(true)
            const createElementDto: CreateElementDto = this.form.value
            createElementDto.position = this.tableFeatureStore.elements().length + 1
            this.elementService
                .create(createElementDto)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (data) => {
                        this.tableFeatureStore.addElement(data)
                        this.notificationService.notify(
                            'Element added successfully.',
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
