import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatTab, MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";

import {ScrollService} from "../../../../core/services/scroll/scroll.service";
import {ImportMenuItemDto} from "../../services/menu-spreadsheet/menu-spreadsheet.service";
import {CreateMenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/create-menu-category.dto";
import {JsonPipe} from "@angular/common";
import {ImportItemsPreviewComponent} from "../import-items-preview/import-items-preview.component";
import {ImportCategoriesPreviewComponent} from "../import-categories-preview/import-categories-preview.component";

@Component({
  selector: 'app-import-preview-dialog',
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatTab,
        MatTabGroup,

        JsonPipe,
        ImportItemsPreviewComponent,
        ImportCategoriesPreviewComponent
    ],
  templateUrl: './import-preview-dialog.component.html',
  styleUrl: './import-preview-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ImportPreviewDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<ImportPreviewDialogComponent>)
    readonly data = inject<{ foodItems: ImportMenuItemDto[],
        drinksItems: ImportMenuItemDto[]
        foodCategories: CreateMenuCategoryDto[],
        drinksCategories: CreateMenuCategoryDto[],
    }>(MAT_DIALOG_DATA)
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
