import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal, ViewContainerRef} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ElementService} from "../../../../core/http/services/element-services/element/element.service";
import {TableFeatureStore} from "../../../../recipes/stores/table-feature.store";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {ErrorService} from "../../../../core/services/error/error.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CreateElementDto} from "../../../../core/http/dto/element-dto/element/create-element.dto";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
  TableAddCategoryDialogComponent
} from "../../../../recipes/features/table-feature/components/table-add-category-dialog/table-add-category-dialog.component";
import {MenuItemService} from "../../../../core/http/services/menu-services/menu-item/menu-item.service";
import {MenuFeatureStore} from "../../../../core/stores/menu-feature.store";
import {AddCategoryDialogComponent} from "../add-category-dialog/add-category-dialog.component";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {FormSectionComponent} from "../../../../shared/components/form-section/form-section.component";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {
  ModalFormAutoFocusDirective
} from "../../../../shared/directives/modal-form-auto-focus/modal-form-auto-focus.directive";
import {
  SingleImageUploadComponent
} from "../../../../shared/components/single-image-upload/single-image-upload.component";
import {CreateMenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/create-menu-item.dto";
import {AppStore} from "../../../../core/stores/app.store";

@Component({
  selector: 'app-add-item-dialog',
  imports: [
    CdkTextareaAutosize,
    FormSectionComponent,
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ModalFormAutoFocusDirective,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    SingleImageUploadComponent
  ],
  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AddItemDialogComponent {
  private readonly data = inject<{type: string}>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<AddItemDialogComponent>)
  private readonly menuItemService = inject(MenuItemService)
  private readonly menuFeatureStore = inject(MenuFeatureStore)
  private readonly notificationService = inject(NotificationService)
  private readonly errorService = inject(ErrorService)
  private readonly dialog = inject(MatDialog)
  private readonly appStore = inject(AppStore)
  private readonly destroyRef = inject(DestroyRef)
  private readonly viewContainerRef = inject(ViewContainerRef)
  loading = signal(false)
  shake = signal(false)
  file = signal<File | null>(null)
  selectOptions = this.data.type === 'food' ? this.menuFeatureStore.foodMenuCategories : this.menuFeatureStore.drinksMenuCategories
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number>(0 , [Validators.required]),
    categoryId: new FormControl<number | null>(null, [Validators.required]),
    weight: new FormControl<string>(''),
    description: new FormControl<string>(''),

    nutritionalValues: new FormControl<string>(''),
    ingredients: new FormControl<string>(''),
    allergens: new FormControl<string>(''),
  })

  uploadChange(file: File | null): void {
    this.file.set(file);
  }


  submit() {
    if (this.form.valid ) {
      this.loading.set(true)
      const createItemDto: CreateMenuItemDto = {
        menuType: this.data.type,
        name: this.form.getRawValue().name!,
        description : this.form.controls['description'].value!,
        price : this.form.controls['price'].value!,
        weight : this.form.controls['weight'].value!,
        nutritionalValues : this.form.controls['nutritionalValues'].value!,
        ingredients : this.form.controls['ingredients'].value!,
        allergens : this.form.controls['allergens'].value!,
        menuCategoryId: this.form.controls['categoryId'].value!,
        menuId: this.appStore.user.menu.id(),
        position: this.data.type === 'food' ? this.menuFeatureStore.foodMenuItems().length + 1 : this.menuFeatureStore.drinksMenuItems().length + 1,
      }
      this.menuItemService
        .create(createItemDto)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (data) => {
            if (this.data.type === 'food') {
              this.menuFeatureStore.addFoodMenuItem(data);
            } else {
              this.menuFeatureStore.addDrinksMenuItem(data);
            }

            this.notificationService.notify(
              'Item added successfully.',
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
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      autoFocus: false,
      viewContainerRef: this.viewContainerRef,
      data: this.data
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
