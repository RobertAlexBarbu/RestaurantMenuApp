import {ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, Renderer2, signal} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {MatIcon} from "@angular/material/icon";
import {ImageComponent} from "../../../../shared/components/image/image.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {StorageService} from "../../../../core/services/storage/storage.service";
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-item-details-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatButton,
        MatIcon,
        ImageComponent,
        DatePipe,
        CurrencyPipe
    ],
  templateUrl: './item-details-dialog.component.html',
  styleUrl: './item-details-dialog.component.scss',
    standalone: true
})
export class ItemDetailsDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ItemDetailsDialogComponent>)
    readonly data = inject<{item: MenuItemDto, category: MenuCategoryDto}>(MAT_DIALOG_DATA);
    item: MenuItemDto = this.data.item;
    category: MenuCategoryDto = this.data.category;
    firebaseFileUrl = signal<string | null>(null)
    private readonly storage = inject(StorageService)
    private readonly destroyRef = inject(DestroyRef)

    constructor(
        private renderer: Renderer2,
        private elRef: ElementRef,
        private cdr: ChangeDetectorRef,
    ) {
        const imgUrl = this.item.imageUrl
        console.log(imgUrl);
        if (imgUrl) {
            this.storage
                .download(imgUrl)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (file) => {
                        this.firebaseFileUrl.set(URL.createObjectURL(file))
                    },
                })
        }
    }

    onNoClick(): void {
        this.dialogRef.close()
    }
}
