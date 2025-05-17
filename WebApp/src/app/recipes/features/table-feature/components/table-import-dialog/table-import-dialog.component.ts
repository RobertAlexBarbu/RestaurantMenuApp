import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    inject,
    signal,
    ViewContainerRef,
} from '@angular/core'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatDialog, MatDialogContent, MatDialogRef } from '@angular/material/dialog'
import { fadeInAnimation } from '../../../../../app.animations'
import { MatIcon } from '@angular/material/icon'
import { FileUploadComponent } from '../../../../../shared/components/file-upload/file-upload.component'
import {
    FullscreenDialogContentComponent,
} from '../../../../../shared/components/fullscreen-dialog-content/fullscreen-dialog-content.component'
import { MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper'

import { UtilityService } from '../../../../../core/services/utility/utility.service'
import { ImportElementCategoryDto } from '../../../../../core/http/dto/element-dto/element-category/import-element-category.dto'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs'
import { TableImportPreviewDialogComponent } from '../table-import-preview-dialog/table-import-preview-dialog.component'

import { ImportElementDto } from '../../../../../core/http/dto/element-dto/element/import-element.dto'
import { ElementCategoryService } from '../../../../../core/http/services/element-services/element-category/element-category.service'
import { ElementService } from '../../../../../core/http/services/element-services/element/element.service'
import { TableFeatureStore } from '../../../../stores/table-feature.store'
import { TableSpreadsheetService } from '../../services/table-spreadsheet/table-spreadsheet.service'
import { fullscreenDialogConfig, responsiveDialogConfig } from '../../../../../shared/configs/dialogs.config'

@Component({
    selector: 'app-table-import-dialog',
    standalone: true,
    imports: [
        MatButton,
        MatDialogContent,
        MatIcon,
        MatIconButton,
        FileUploadComponent,
        FullscreenDialogContentComponent,
        MatStepper,
        MatStep,
        MatStepLabel,
        MatStepperNext,
        MatStepperPrevious,

    ],
    templateUrl: './table-import-dialog.component.html',
    styleUrl: './table-import-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],
})
export class TableImportDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<TableImportDialogComponent>)
    private readonly dialog = inject(MatDialog)
    private readonly utilityService = inject(UtilityService)
    private readonly tableFeatureStore = inject(TableFeatureStore)
    private readonly spreadsheetService = inject(TableSpreadsheetService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly elementService = inject(ElementService)
    private readonly elementCategoryService = inject(ElementCategoryService)
    private readonly viewContainerRef = inject(ViewContainerRef)
    isMobile = this.utilityService.isMobile()
    file = signal<File | null>(null)
    elements = signal<ImportElementDto[]>([])
    categories = signal<ImportElementCategoryDto[]>([])
    fileUploaded = computed(() => !!this.file())
    importing = signal(false)

    closeDialog() {
        this.dialogRef.close()
    }

    downloadEmptyTemplate() {
        this.spreadsheetService.exportElementTable([], [])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe()
    }

    downloadPopulatedTemplate() {
        this.spreadsheetService.exportElementTable(this.tableFeatureStore.categories(), this.tableFeatureStore.elementsWithCategory())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe()
    }

    uploadChange(files: File[]) {
        if (files.length > 0) {
            this.spreadsheetService.importElementTable(files[0])
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (e) => {
                        this.elements.set(e.elements)
                        this.categories.set(e.categories)
                        this.file.set(files[0])
                    },
                })
        } else {
            this.file.set(null)
            this.elements.set([])
            this.categories.set([])
        }
    }

    import(stepper: MatStepper) {
        this.importing.set(true)
        this.elementCategoryService.replaceAll(this.categories())
            .pipe(
                switchMap(categories => {
                    console.log(categories)
                    this.tableFeatureStore.setCategories([])
                    this.tableFeatureStore.setElements([])
                    return this.elementService.replaceAll(this.elements().map(importElement => {
                        const category = categories.find(c => c.name === importElement.categoryName)
                        return {
                            ...importElement,
                            categoryId: category!.id,
                        }
                    }))
                }),
                takeUntilDestroyed(this.destroyRef),
            ).subscribe({
            next: (e) => {
                console.log(e)
                this.importing.set(false)
                this.tableFeatureStore.setElements([])
                this.tableFeatureStore.setInit(false);
                stepper.next()
            },
            error: () => {
                this.importing.set(false)
            },
        })

    }

    openPreviewDialog() {
        this.dialog.open(TableImportPreviewDialogComponent, {
            ...responsiveDialogConfig, data: {
                elements: this.elements(),
                categories: this.categories(),
            },
            viewContainerRef: this.viewContainerRef,
            width: "1000px",
            maxWidth: "1000px",
            height: "85dvh"
        })
    }
}
