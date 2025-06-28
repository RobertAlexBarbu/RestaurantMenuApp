import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal, ViewContainerRef} from '@angular/core';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {FormSectionComponent} from "../../../../shared/components/form-section/form-section.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {
    ModalFormAutoFocusDirective
} from "../../../../shared/directives/modal-form-auto-focus/modal-form-auto-focus.directive";

import {NotificationService} from "../../../../core/services/notification/notification.service";
import {ErrorService} from "../../../../core/services/error/error.service";

import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {MenuItemService} from "../../../../core/http/services/menu-services/menu-item/menu-item.service";
import {CreateMenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/create-menu-item.dto";
import {AppStore} from "../../../../core/stores/app.store";
import {CategoryAddDialogComponent} from "../category-add-dialog/category-add-dialog.component";
import {
    SingleImageUploadComponent
} from "../../../../shared/components/single-image-upload/single-image-upload.component";
import {map, of, switchMap} from "rxjs";

@Component({
  selector: 'app-item-add-dialog',
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
        SingleImageUploadComponent
    ],
  templateUrl: './item-add-dialog.component.html',
  styleUrl: './item-add-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ItemAddDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<ItemAddDialogComponent>)
    private readonly menuStoreService = inject(MenuStoreService);
    private readonly menuItemService = inject(MenuItemService)
    private readonly data = inject<{type: 'food' | 'drinks'}>(MAT_DIALOG_DATA);
    private readonly notificationService = inject(NotificationService)
    private readonly errorService = inject(ErrorService)
    private readonly dialog = inject(MatDialog)
    private readonly destroyRef = inject(DestroyRef)
    private readonly viewContainerRef = inject(ViewContainerRef)
    private readonly appStore = inject(AppStore)
    loading = signal(false)
    shake = signal(false)
    selectOptions = this.data.type === 'food' ? this.menuStoreService.foodCategories : this.menuStoreService.drinksCategories
    file = signal<File | null>(null);
    
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
    
    submit() {
        if (this.form.valid ) {
            this.loading.set(true)
            const createItemDto: CreateMenuItemDto = {
                ...this.form.getRawValue(),
                menuCategoryId: this.form.getRawValue().menuCategoryId!,
                menuType: this.data.type,
                position:this.data.type === 'food' ? this.menuStoreService.foodItems().filter(i => i.menuCategoryId === this.form.getRawValue().menuCategoryId!).length + 1 : this.menuStoreService.drinksItems().filter(i => i.menuCategoryId === this.form.getRawValue().menuCategoryId!).length + 1,
                imageUrl: null,
                menuId: this.appStore.user.menu.id()
     
            }
            
            this.menuItemService
                .create(createItemDto)
                .pipe(
                    switchMap(data => {
                        const file = this.file()
                        if(file == null) {
                            return of({imageUrl: null, item: data})
                        } else {
                            return this.menuItemService.addImage(data, file, this.appStore.user())
                                .pipe(map(data2 => {
                                    return {
                                        imageUrl: data2, 
                                        item: data
                                    }
                                }))
                        }
                    }),
                    takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (data) => {
                        if (this.data.type === 'food') {
                            this.menuStoreService.addFoodItem(data.item)
                        } else {
                            this.menuStoreService.addDrinksItem(data.item)
                        }
                        if (data.imageUrl != null) {
                            if (this.data.type === 'food') {
                                this.menuStoreService.updateFoodItemById(data.item.id, {
                                    imageUrl: data.imageUrl,
                                })
                            } else {
                                this.menuStoreService.updateDrinksItemById(data.item.id, {
                                    imageUrl: data.imageUrl,
                                })
                            } 
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
    
    onUploadChange(file: File | null) {
        this.file.set(file);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CategoryAddDialogComponent, {
            autoFocus: false,
            viewContainerRef: this.viewContainerRef,
            data: {
                type: this.data.type
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
