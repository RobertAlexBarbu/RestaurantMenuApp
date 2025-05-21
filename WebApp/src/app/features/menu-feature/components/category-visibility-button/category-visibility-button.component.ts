import {ChangeDetectionStrategy, Component, DestroyRef, inject, input} from '@angular/core';
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {MenuItemService} from "../../../../core/http/services/menu-services/menu-item/menu-item.service";
import {BehaviorSubject} from "rxjs";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuCategoryService} from "../../../../core/http/services/menu-services/menu-category/menu-category.service";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {AsyncPipe} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-category-visibility-button',
    imports: [
        AsyncPipe,
        MatIconButton,
        MatIcon
    ],
  templateUrl: './category-visibility-button.component.html',
  styleUrl: './category-visibility-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class CategoryVisibilityButtonComponent {
    private readonly menuStoreService = inject(MenuStoreService);
    private readonly menuCategoryService = inject(MenuCategoryService);
    private readonly destroyRef = inject(DestroyRef)
    spinner$ = new BehaviorSubject<boolean>(false)
    readonly cat = input.required<MenuCategoryDto>()

    toggleVisibility(isVisible: boolean): void {
        if (isVisible) {
            this.makeInvisible()
        } else {
            this.makeVisible()
        }
    }

    makeVisible() {
        this.spinner$.next(true)
        this.menuCategoryService
            .updateVisibilityById(this.cat().id, {
                isVisible: true,
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    if (this.cat().menuType == 'food') {
                        this.menuStoreService.updateFoodCategoryById(
                            this.cat().id, { isVisible: true },
                        )
                    } else {
                        this.menuStoreService.updateDrinksCategoryById(
                            this.cat().id, { isVisible: true },
                        )
                    }

                    this.spinner$.next(false)
                },
            })
    }

    makeInvisible() {
        this.spinner$.next(true)
        this.menuCategoryService
            .updateVisibilityById(this.cat().id, {
                isVisible: false,
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    if (this.cat().menuType == 'food') {
                        this.menuStoreService.updateFoodCategoryById(
                            this.cat().id, { isVisible: false },
                        )
                    } else {
                        this.menuStoreService.updateDrinksCategoryById(
                            this.cat().id, { isVisible: false },
                        )
                    }
                    this.spinner$.next(false)
                },
            })
    }
}
