import {ChangeDetectionStrategy, Component, DestroyRef, inject, input} from '@angular/core';
import {TableFeatureStore} from "../../../../recipes/stores/table-feature.store";
import {ElementService} from "../../../../core/http/services/element/element.service";
import {BehaviorSubject} from "rxjs";
import {ElementDetailDto} from "../../../../core/http/dto/element/element-detail.dto";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {MenuItemService} from "../../../../core/http/services/menu-services/menu-item/menu-item.service";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe} from "@angular/common";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-item-visibility-button',
    imports: [
        MatIcon,
        AsyncPipe,
        MatIconButton
    ],
  templateUrl: './item-visibility-button.component.html',
  styleUrl: './item-visibility-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ItemVisibilityButtonComponent {
    private readonly menuStoreService = inject(MenuStoreService);
    private readonly menuItemService = inject(MenuItemService);
    private readonly destroyRef = inject(DestroyRef)
    spinner$ = new BehaviorSubject<boolean>(false)
    readonly item = input.required<MenuItemDto>()

    toggleVisibility(isVisible: boolean): void {
        if (isVisible) {
            this.makeInvisible()
        } else {
            this.makeVisible()
        }
    }

    makeVisible() {
        this.spinner$.next(true)
        this.menuItemService
            .updateVisibilityById(this.item().id, {
                isVisible: true,
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.menuStoreService.updateFoodItemById(
                        this.item().id, { isVisible: true },
                    )
                    this.spinner$.next(false)
                },
            })
    }

    makeInvisible() {
        this.spinner$.next(true)
        this.menuItemService
            .updateVisibilityById(this.item().id, {
                isVisible: false,
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.menuStoreService.updateFoodItemById(
                        this.item().id, { isVisible: false },
                    )
                    this.spinner$.next(false)
                },
            })
    }
}
