import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    inject,
    signal,
    ViewContainerRef
} from '@angular/core';
import {FileUploadComponent} from "../../../../shared/components/file-upload/file-upload.component";
import {
    FullscreenDialogContentComponent
} from "../../../../shared/components/fullscreen-dialog-content/fullscreen-dialog-content.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UtilityService} from "../../../../core/services/utility/utility.service";
import {TableFeatureStore} from "../../../../recipes/stores/table-feature.store";
import {
    TableSpreadsheetService
} from "../../../../recipes/features/table-feature/services/table-spreadsheet/table-spreadsheet.service";
import {ElementService} from "../../../../core/http/services/element/element.service";
import {ElementCategoryService} from "../../../../core/http/services/element-category/element-category.service";
import {ImportElementDto} from "../../../../core/http/dto/element/import-element.dto";
import {ImportElementCategoryDto} from "../../../../core/http/dto/element-category/import-element-category.dto";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {switchMap} from "rxjs";
import {
    TableImportPreviewDialogComponent
} from "../../../../recipes/features/table-feature/components/table-import-preview-dialog/table-import-preview-dialog.component";
import {responsiveDialogConfig} from "../../../../shared/configs/dialogs.config";
import {ImportMenuItemDto, MenuSpreadsheetService} from "../../services/menu-spreadsheet/menu-spreadsheet.service";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {MenuItemService} from "../../../../core/http/services/menu-services/menu-item/menu-item.service";
import {MenuCategoryService} from "../../../../core/http/services/menu-services/menu-category/menu-category.service";
import {AppStore} from "../../../../core/stores/app.store";
import {CreateMenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/create-menu-category.dto";
import {ImportPreviewDialogComponent} from "../import-preview-dialog/import-preview-dialog.component";

@Component({
  selector: 'app-import-dialog',
    imports: [
        FileUploadComponent,
        FullscreenDialogContentComponent,
        MatButton,
        MatIcon,
        MatStep,
        MatStepLabel,
        MatStepper,
        MatStepperNext,
        MatStepperPrevious
    ],
  templateUrl: './import-dialog.component.html',
  styleUrl: './import-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ImportDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<ImportDialogComponent>)
    private readonly dialog = inject(MatDialog)
    private readonly utilityService = inject(UtilityService)

    private readonly spreadsheetService = inject(MenuSpreadsheetService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly menuStoreService = inject(MenuStoreService)
    private readonly menuItemService = inject(MenuItemService)
    private readonly menuCategoryService = inject(MenuCategoryService)
    private readonly viewContainerRef = inject(ViewContainerRef)
    private readonly appStore = inject(AppStore)
    isMobile = this.utilityService.isMobile()
    file = signal<File | null>(null)
    items = signal<ImportMenuItemDto[]>([])
    categories = signal<CreateMenuCategoryDto[]>([])
    fileUploaded = computed(() => !!this.file())
    importing = signal(false)

    closeDialog() {
        this.dialogRef.close()
    }

    downloadEmptyTemplate() {
        this.spreadsheetService.exportMenuTable([], [], [], [], 'Template')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe()
    }

    downloadPopulatedTemplate() {
        this.spreadsheetService.exportMenuTable(this.menuStoreService.foodCategories(), this.menuStoreService.foodItemsWithCategory(),
            this.menuStoreService.drinksCategories(), this.menuStoreService.drinksItemsWithCategory())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe()
    }

    uploadChange(files: File[]) {
        if (files.length > 0) {
            this.spreadsheetService.importItemsTable(files[0], this.appStore.user.menu.id())
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (e) => {
                        console.log(e);
                        this.items.set(e.items)
                        this.categories.set(e.categories)
                        this.file.set(files[0])
                    },
                })
        } else {
            this.file.set(null)
            this.items.set([])
            this.categories.set([])
        }
    }

    import(stepper: MatStepper) {
        this.importing.set(true)
        // this.elementCategoryService.replaceAll(this.categories())
        //     .pipe(
        //         switchMap(categories => {
        //             console.log(categories)
        //             this.tableFeatureStore.setCategories([])
        //             this.tableFeatureStore.setElements([])
        //             return this.elementService.replaceAll(this.elements().map(importElement => {
        //                 const category = categories.find(c => c.name === importElement.categoryName)
        //                 return {
        //                     ...importElement,
        //                     categoryId: category!.id,
        //                 }
        //             }))
        //         }),
        //         takeUntilDestroyed(this.destroyRef),
        //     ).subscribe({
        //     next: (e) => {
        //         console.log(e)
        //         this.importing.set(false)
        //         this.tableFeatureStore.setElements([])
        //         this.tableFeatureStore.setInit(false);
        //         stepper.next()
        //     },
        //     error: () => {
        //         this.importing.set(false)
        //     },
        // })

    }

    openPreviewDialog() {
        this.dialog.open(ImportPreviewDialogComponent, {
            ...responsiveDialogConfig, data: {
                foodItems: this.items().filter(i => i.menuType === 'food'),
                drinksItems: this.items().filter(i => i.menuType === 'drinks'),
                foodCategories: this.categories().filter(i => i.menuType === 'food'),
                drinksCategories: this.categories().filter(i => i.menuType === 'drinks'),
            },
            viewContainerRef: this.viewContainerRef,
            width: "1000px",
            maxWidth: "1000px",
            height: "85dvh"
        })
    }
}

