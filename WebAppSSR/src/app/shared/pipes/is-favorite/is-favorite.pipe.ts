import {inject, Pipe, PipeTransform} from '@angular/core';
import {MenuStoreService} from "../../../core/stores/menu-store/menu-store.service";

@Pipe({
    name: 'isFavorite',
    pure: false,
    standalone: true
})
export class IsFavoritePipe implements PipeTransform {
    private readonly menuStore = inject(MenuStoreService);

    transform(itemId: number): boolean {
        return this.menuStore.favoritesSet().has(itemId);
    }
}