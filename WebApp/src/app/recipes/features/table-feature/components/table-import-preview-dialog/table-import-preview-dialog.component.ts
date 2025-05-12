import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import {
    TableImportPreviewCategoriesComponent,
} from '../table-import-preview-categories/table-import-preview-categories.component'
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs'
import {
    TableImportPreviewElementsComponent,
} from '../table-import-preview-elements/table-import-preview-elements.component'
import {
    FullscreenDialogContentComponent,
} from '../../../../../shared/components/fullscreen-dialog-content/fullscreen-dialog-content.component'

import { ImportElementCategoryDto } from '../../../../../core/http/dto/element-category/import-element-category.dto'
import { ImportElementDto } from '../../../../../core/http/dto/element/import-element.dto'
import { MatButton } from '@angular/material/button'
import { TablePageComponent } from '../table-page/table-page.component'
import { pageLoadAnimation } from '../../../../../app.animations'
import { ScrollService } from '../../../../../core/services/scroll/scroll.service'

@Component({
    selector: 'app-table-import-preview-dialog',
    imports: [
        MatTab,
        TableImportPreviewCategoriesComponent,
        TableImportPreviewElementsComponent,
        MatTabGroup,
        FullscreenDialogContentComponent,
        MatDialogTitle,
        MatButton,
        MatDialogActions,
        MatDialogContent,
        TablePageComponent,
    ],
    templateUrl: './table-import-preview-dialog.component.html',
    styleUrl: './table-import-preview-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        pageLoadAnimation
    ],
    standalone: true,
})
export class TableImportPreviewDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<TableImportPreviewDialogComponent>)
    readonly data = inject<{ elements: ImportElementDto[], categories: ImportElementCategoryDto[] }>(MAT_DIALOG_DATA)
    private readonly scrollService = inject(ScrollService);
    tabIndex = signal(0);

    closeDialog() {
        this.dialogRef.close()
    }
    
    tabClicked(event: MatTabChangeEvent) {
        this.scrollService.scrollDialogContentTop(false, 1);
        this.tabIndex.set(event.index);
    }
}
