import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  ElementCategoryService
} from "../../../../core/http/services/element-services/element-category/element-category.service";
import {ErrorService} from "../../../../core/services/error/error.service";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {TableFeatureStore} from "../../../../recipes/stores/table-feature.store";
import {ElementCategoryDto} from "../../../../core/http/dto/element-dto/element-category/element-category.dto";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuCategoryService} from "../../../../core/http/services/menu-services/menu-category/menu-category.service";
import {AppStore} from "../../../../core/stores/app.store";
import {MenuFeatureStore} from "../../../../core/stores/menu-feature.store";

@Component({
  selector: 'app-add-category-dialog',
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AddCategoryDialogComponent {
  private readonly data = inject<{type: string}>(MAT_DIALOG_DATA);
  private readonly menuCategoryService = inject(MenuCategoryService);
  private readonly destroyRef = inject(DestroyRef)
  private readonly errorService: ErrorService = inject(ErrorService)
  private readonly appStore = inject(AppStore)
  private readonly notificationService: NotificationService =
    inject(NotificationService)
  private readonly menuFeatureStore = inject(MenuFeatureStore)
  readonly dialogRef = inject(MatDialogRef<AddCategoryDialogComponent>)
  form = new FormControl<string>('', {
    validators: [Validators.required],
    nonNullable: true,
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
        name: this.form.value,
        description: "",
        menuType: this.data.type,
        menuId: this.appStore.user.menu.id(),
        position: this.data.type === 'food' ? this.menuFeatureStore.foodMenuCategories().length + 1 : this.menuFeatureStore.drinksMenuCategories().length + 1
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (e) => {
          if(this.data.type === 'food') {
            this.menuFeatureStore.addFoodMenuCategory(e);
          } else {
            this.menuFeatureStore.addDrinksMenuCategory(e);
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
