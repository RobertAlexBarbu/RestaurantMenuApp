import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal, ViewContainerRef} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {MenuItemService} from "../../../../core/http/services/menu-services/menu-item/menu-item.service";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {ErrorService} from "../../../../core/services/error/error.service";
import {AppStore} from "../../../../core/stores/app.store";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CreateMenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/create-menu-item.dto";
import {map, of, switchMap, takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CategoryAddDialogComponent} from "../category-add-dialog/category-add-dialog.component";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {UpdateMenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/update-menu-item.dto";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {FormSectionComponent} from "../../../../shared/components/form-section/form-section.component";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {
    SingleImageUploadComponent
} from "../../../../shared/components/single-image-upload/single-image-upload.component";
import {
    ModalFormAutoFocusDirective
} from "../../../../shared/directives/modal-form-auto-focus/modal-form-auto-focus.directive";
import {StorageService} from "../../../../core/services/storage/storage.service";

@Component({
  selector: 'app-item-edit-dialog',
    imports: [
        MatFormField,
        CdkTextareaAutosize,
        FormSectionComponent,
        ReactiveFormsModule,
        MatInput,
        MatIcon,
        MatButton,
        MatOption,
        MatSelect,
        SingleImageUploadComponent,
        ModalFormAutoFocusDirective,
        MatDialogContent,
        MatDialogTitle,
        MatLabel,
        MatError,
        MatDialogActions,
    ],
  templateUrl: './item-edit-dialog.component.html',
  styleUrl: './item-edit-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ItemEditDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<ItemEditDialogComponent>)
    private readonly menuStoreService = inject(MenuStoreService);
    private readonly menuItemService = inject(MenuItemService)
    private readonly data = inject<{item: MenuItemDto}>(MAT_DIALOG_DATA);
    private readonly notificationService = inject(NotificationService)
    private readonly errorService = inject(ErrorService)
    private readonly dialog = inject(MatDialog)
    private readonly destroyRef = inject(DestroyRef)
    private readonly viewContainerRef = inject(ViewContainerRef)
    private readonly appStore = inject(AppStore)
    loading = signal(false)
    shake = signal(false)
    selectOptions = this.data.item.menuType === 'food' ? this.menuStoreService.foodCategories : this.menuStoreService.drinksCategories
    file = signal<File | null>(null);
    imageLoading = signal(true)
    private readonly storage = inject(StorageService)
    fileUpload = signal<File | null>(null);

    form = new FormGroup({
        name: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        price: new FormControl<number>(0, {
            validators: [Validators.required],
            nonNullable: true,
        }),
        menuCategoryId: new FormControl<number | null>(null, [Validators.required]),
        description: new FormControl<string>('', { nonNullable: true,}),

        nutritionalValues:  new FormControl<string>('', { nonNullable: true,}),
        ingredients:  new FormControl<string>('', { nonNullable: true,}),
        allergens: new FormControl<string>('', { nonNullable: true,}),

    })

    constructor() {
        this.form.patchValue(this.data.item)
        this.form.controls.menuCategoryId.setValue(this.data.item.menuCategoryId)
        if (this.data.item.imageUrl) {
            this.storage.download(this.data.item.imageUrl).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
                {
                    next: (val) => {
                        this.file.set( new File([val], 'image.png', { type: 'image/png' }))
                        this.imageLoading.set(false);
                    }
                }
            )
        } else {
            this.imageLoading.set(false);
        }
    }

    submit() {
        if (this.form.valid ) {
            this.loading.set(true)
            const updateItemDto: UpdateMenuItemDto = {
                ...this.form.getRawValue(),
                menuCategoryId: this.form.getRawValue().menuCategoryId!,
            }
            const fileUpload = this.fileUpload()
            console.log("HELLO!");
            console.log(fileUpload)
            console.log(this.file())
            if (fileUpload) {

                this.menuItemService.addImage(this.data.item, fileUpload, this.appStore.user())
                    .pipe(switchMap(url => {
                        this.menuStoreService.updateFoodItemById(this.data.item.id, {imageUrl: url})
                        return this.menuItemService.updateById(this.data.item.id, updateItemDto)
                    }),
                        takeUntilDestroyed(this.destroyRef)).subscribe({
                    next: (val) => {
                        this.menuStoreService.updateFoodItemById(this.data.item.id, updateItemDto)
                                    this.notificationService.notify(
                                        'Item updated successfully.',
                                    )
                                    this.loading.set(false)
                                    this.dialogRef.close()
                    }
                })

            } else if(fileUpload === null && this.data.item.imageUrl !== null){

                this.menuItemService.updateImageUrlById(this.data.item.id, {
                    imageUrl: null
                })
                    .pipe(switchMap(url => {
                            this.menuStoreService.updateFoodItemById(this.data.item.id, {imageUrl: null})
                            return this.menuItemService.updateById(this.data.item.id, updateItemDto)
                        }),
                        takeUntilDestroyed(this.destroyRef)).subscribe({
                    next: (val) => {
                        this.menuStoreService.updateFoodItemById(this.data.item.id, updateItemDto)
                        this.notificationService.notify(
                            'Item updated successfully.',
                        )
                        this.loading.set(false)
                        this.dialogRef.close()
   
                    }
                })
                return
            } else {

                return this.menuItemService.updateById(this.data.item.id, updateItemDto)
                    .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
                        next: (val) => {
                            this.menuStoreService.updateFoodItemById(this.data.item.id, updateItemDto)
                            this.notificationService.notify(
                                'Item updated successfully.',
                            )
                            this.loading.set(false)
                            this.dialogRef.close()
                        }
                    })
            }
            return
        } else {
            this.form.markAllAsTouched()
            return
        }
    }

    closeDialog() {
        this.dialogRef.close()
    }

    onUploadChange(file: File | null) {
        if (file == null) {
            this.file.set(null);
        }
        this.fileUpload.set(file);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CategoryAddDialogComponent, {
            autoFocus: false,
            viewContainerRef: this.viewContainerRef,
            data: {
                type: this.data.item.menuType
            }
        })
        dialogRef.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    if (result.data) {
                        this.form.controls.menuCategoryId.setValue(result.data.id)
                    }
                }
            },
        })
    }
}
