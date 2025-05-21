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
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-category-add-advanced-dialog',
    imports: [
        MatLabel,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatDialogActions,
        MatButton,
        MatInput,
        ReactiveFormsModule,
        CdkTextareaAutosize,
        MatError
    ],
  templateUrl: './category-add-advanced-dialog.component.html',
  styleUrl: './category-add-advanced-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class CategoryAddAdvancedDialogComponent {
    private readonly destroyRef = inject(DestroyRef)
    private readonly errorService: ErrorService = inject(ErrorService)
    private readonly notificationService: NotificationService =
        inject(NotificationService)
    private readonly appStore = inject(AppStore)
    private readonly menuCategoryService = inject(MenuCategoryService)
    private readonly menuStoreService = inject(MenuStoreService)
    readonly dialogRef = inject(MatDialogRef<CategoryAddAdvancedDialogComponent>)
    readonly data = inject<{type: 'food' | 'drinks'}>(MAT_DIALOG_DATA)
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

    onSubmit(): void {
        if (!this.form.valid) {
            this.form.markAllAsTouched()
            return
        }
        this.loading.set(true)
        this.menuCategoryService
            .create({
                name: this.form.controls.name.value,
                menuId: this.appStore.user.menu.id(),
                menuType: this.data.type,
                description: this.form.controls.description.value,
                position: this.data.type==='food' ? this.menuStoreService.foodCategories().length + 1 : this.menuStoreService.drinksCategories().length + 1,
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (e) => {
                    if (this.data.type === "food") {
                        this.menuStoreService.addFoodCategory(e);
                    } else {
                        this.menuStoreService.addDrinksCategory(e);
                    }
                    this.loading.set(false)
                    this.notificationService.notify(
                        'Category added successfully.',
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
