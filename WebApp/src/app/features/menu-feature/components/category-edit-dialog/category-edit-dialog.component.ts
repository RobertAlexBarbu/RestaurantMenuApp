import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {ErrorService} from "../../../../core/services/error/error.service";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {AppStore} from "../../../../core/stores/app.store";
import {MenuCategoryService} from "../../../../core/http/services/menu-services/menu-category/menu-category.service";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-category-edit-dialog',
    imports: [
        MatFormField,
        ReactiveFormsModule,
        MatDialogContent,
        MatDialogTitle,
        CdkTextareaAutosize,
        MatInput,
        MatDialogActions,
        MatButton,
        MatLabel,
        MatError
    ],
  templateUrl: './category-edit-dialog.component.html',
  styleUrl: './category-edit-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class CategoryEditDialogComponent {
    private readonly destroyRef = inject(DestroyRef)
    private readonly errorService: ErrorService = inject(ErrorService)
    private readonly notificationService: NotificationService =
        inject(NotificationService)
    private readonly appStore = inject(AppStore)
    private readonly menuCategoryService = inject(MenuCategoryService)
    private readonly menuStoreService = inject(MenuStoreService)
    readonly dialogRef = inject(MatDialogRef<CategoryEditDialogComponent>)

    private readonly data = inject<{item: MenuCategoryDto}>(MAT_DIALOG_DATA);
    form = new FormGroup({
        name: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        description: new FormControl<string>('', {nonNullable: true})
    })
    loading = signal(false)

    onNoClick(): void {
        this.dialogRef.close()
    }
    constructor() {
        this.form.patchValue(this.data.item)
    }

    onSubmit(): void {
        if (!this.form.valid) {
            this.form.markAllAsTouched()
            return
        }
        this.loading.set(true)
        this.menuCategoryService
            .updateById(this.data.item.id, {
                name: this.form.controls.name.value,
                description: this.form.controls.description.value,

            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (e) => {
                    if (this.data.item.menuType === "food") {
                        this.menuStoreService.updateFoodItemById(this.data.item.id, {
                            name: this.form.controls.name.value,
                            description: this.form.controls.description.value,

                        });
                    } else {
                        this.menuStoreService.updateDrinksItemById(this.data.item.id, {
                            name: this.form.controls.name.value,
                            description: this.form.controls.description.value,

                        });
                    }
                    this.loading.set(false)
                    this.notificationService.notify(
                        'Category edited successfully.',
                    )
                    this.dialogRef.close({
                        data: e,
                    })
                },
                error: (err) => {
                    this.loading.set(false)
                    this.errorService.handleError(err)
                },
            })
    }
}
