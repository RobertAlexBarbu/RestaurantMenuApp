import {computed, Injectable, signal} from '@angular/core';
import {MenuItemDto} from "../../http/dto/menu-dto/menu-item/menu-item.dto";
import {MenuCategoryDto} from "../../http/dto/menu-dto/menu-category/menu-category.dto";
import {MenuDetailsDto} from "../../http/dto/menu-dto/menu-details/menu-details.dto";
import {MenuDataDto} from "../../http/dto/menu-dto/menu/menu-data.dto";
import {MenuDto} from "../../http/dto/menu-dto/menu/menu.dto";

export interface MenuFeatureStoreState {
    foodItems: MenuItemDto[];
    drinksItems: MenuItemDto[];
    foodCategories: MenuCategoryDto[];
    drinksCategories: MenuCategoryDto[];
    menuDetails: MenuDetailsDto
    favoritesIds: number[];
    menu: MenuDto
    init: boolean;
    url: string
}

export const initialState: MenuFeatureStoreState = {
    foodItems: [],
    foodCategories: [],
    drinksCategories: [],
    drinksItems: [],
    menuDetails: {
        id: -1,
        menuId: -1,
        userId: -1,

        wifiNetworkName: "",
        wifiPassword: "",
        wifiNetworkVisible: false,

        phoneNumber: "",
        email: "",
        contactInformationVisibile: false,

        monFriOpen: "",
        monFriClose: "",
        weekendOpen: "",
        weekendClose: "",
        openingHoursVisible: false,

        street: "",
        city: "",
        state: "",
        zipCode: "",
        addressVisible: false,
    },
    menu: {
        id: -1,
        createdAt: new Date(), 
        name:'',     url: '' ,    imageUrl: null  ,   userId: -1 }
    ,
    init: false,
    url: '',
    favoritesIds: []

};

const sortByCategoryElementPosition = (categories: MenuCategoryDto[]) => {
    const categoryPositionMap = new Map<number, number>(
        categories.map((c) => [c.id, c.position]),
    );
    return (a: MenuItemDto, b: MenuItemDto) => {
        const catPosA = categoryPositionMap.get(a.menuCategoryId) ?? 0;
        const catPosB = categoryPositionMap.get(b.menuCategoryId) ?? 0;

        if (catPosA !== catPosB) {
            return catPosA - catPosB; // Sort first by category position
        }

        return a.position - b.position; // Then sort by item position inside category
    };
};

@Injectable({
    providedIn: 'root'
})
export class MenuStoreService {
    private readonly state = signal<MenuFeatureStoreState>(initialState);

    // State signals
    readonly foodItems = computed(() => this.state().foodItems);
    readonly favoritesIds = computed(() => this.state().favoritesIds);
    readonly drinksItems = computed(() => this.state().drinksItems);
    readonly foodCategories = computed(() => this.state().foodCategories.sort((a, b) => a.position - b.position));
    readonly drinksCategories = computed(() => this.state().drinksCategories.sort((a, b) => a.position - b.position));
    readonly menuDetails = computed(() => this.state().menuDetails);
    readonly menu = computed(() => this.state().menu);

    readonly isInitialized = computed(() => this.state().init);
    readonly url = computed(() => this.state().url);

    // Computed signals
    readonly foodCategoryMap = computed(() =>
        new Map(this.foodCategories().map(c => [c.id, c]))
    );
    readonly drinksCategoryMap = computed(() =>
        new Map(this.drinksCategories().map(c => [c.id, c]))
    );
    
    readonly foodItemsWithCategory = computed(() =>
        this.foodItems().map(item => ({
            ...item,
            category: this.foodCategoryMap().get(item.menuCategoryId)!
        })).sort(sortByCategoryElementPosition(this.foodCategories()))
    );
    readonly favoritesSet = computed(() => new Set(this.state().favoritesIds));
    readonly foodCategoriesWithItems = computed(() => {
        // Get categories sorted by position
        const sortedCategories = this.foodCategories().filter(c => c.isVisible);

        // Get items with their category info (already sorted by category position then item position)
        const itemsWithCategory = this.foodItemsWithCategory().filter(c => c.isVisible);

        // Group items by category
        const itemsByCategory = new Map<number, typeof itemsWithCategory>();
        itemsWithCategory.forEach(item => {
            if (!itemsByCategory.has(item.menuCategoryId)) {
                itemsByCategory.set(item.menuCategoryId, []);
            }
            itemsByCategory.get(item.menuCategoryId)?.push(item);
        });

        // Create the final structure with categories and their items
        return sortedCategories.map(category => ({
            ...category,
            items: itemsByCategory.get(category.id) || []
        }));
    });

    readonly favoriteItemsWithCategory = computed(() => {
        const foodItemsMap = new Map(this.foodItemsWithCategory().map(item => [item.id, item]));
        const drinksItemsMap = new Map(this.drinksItemsWithCategory().map(item => [item.id, item]));

        return this.favoritesIds().map(id =>
            foodItemsMap.get(id) || drinksItemsMap.get(id)
        ).filter(Boolean); // remove undefined if any ID not found
    });

    // Similarly for drinks if needed
    readonly drinksCategoriesWithItems = computed(() => {
        const sortedCategories = this.drinksCategories().filter(c => c.isVisible);
        const itemsWithCategory = this.drinksItemsWithCategory().filter(c => c.isVisible);
        

        const itemsByCategory = new Map<number, typeof itemsWithCategory>();
        itemsWithCategory.forEach(item => {
            if (!itemsByCategory.has(item.menuCategoryId)) {
                itemsByCategory.set(item.menuCategoryId, []);
            }
            itemsByCategory.get(item.menuCategoryId)?.push(item);
        });

        return sortedCategories.map(category => ({
            ...category,
            items: itemsByCategory.get(category.id) || []
        }));
    });

    readonly drinksItemsWithCategory = computed(() =>
        this.drinksItems().map(item => ({
            ...item,
            category: this.drinksCategoryMap().get(item.menuCategoryId)!
        })).sort(sortByCategoryElementPosition(this.drinksCategories()))
    );
    
    setMenuData(menuDataDto: MenuDataDto) {
        this.state.update(current => ({...current,
                    foodItems: [...menuDataDto.foodMenuItems],
                    foodCategories: [...menuDataDto.foodMenuCategories],
                    drinksItems: [...menuDataDto.drinksMenuItems],
                    drinksCategories: [...menuDataDto.drinksMenuCategories],
                    menuDetails: menuDataDto.menuDetails,
        }))
    }
    
    setUrl(url: string) {
        this.state.update(current => ({...current,url}));
    }
    
    setMenu(menu: MenuDto) {
        this.state.update(current => ({...current,
            menu: menu
        }))
    }

    addIdToFavorites(id: number): void {
        this.state.update(current => ({
            ...current,
            favoritesIds: [...current.favoritesIds, id]
        }));
    }

    removeIdFromFavorites(id: number): void {
        this.state.update(current => ({
            ...current,
            favoritesIds: current.favoritesIds.filter(favId => favId !== id)
        }));
    }

    setInit(init: boolean): void {
        this.state.update(current => ({ ...current, init }));
    }

    resetInit(): void {
        this.state.set(initialState);
    }
    
    
    
    
    
    

    // Food methods
    addFoodItem(item: MenuItemDto): void {
        this.state.update(current => ({
            ...current,
            foodItems: [...current.foodItems, item]
        }));
    }
    


    updateFoodItemById(itemId: number, updateItem: Partial<MenuItemDto>): void {
        this.state.update(current => ({
            ...current,
            foodItems: current.foodItems.map(item =>
                item.id === itemId ? { ...item, ...updateItem } : item
            )
        }));
    }

    updateFoodCategoryById(categoryId: number, updateCategory: Partial<MenuCategoryDto>): void {
        this.state.update(current => ({
            ...current,
            foodCategories: current.foodCategories.map(category =>
                category.id === categoryId ? { ...category, ...updateCategory } : category
            )
        }));
    }

    deleteFoodItemById(itemId: number): void {
        this.state.update(current => {
            const itemToDelete = current.foodItems.find(item => item.id === itemId);
            if (!itemToDelete) return current;

            let index = 0;
            const newFoodItems = current.foodItems
                .filter(item => item.id !== itemId)
                .map(item => {
                    if (item.menuCategoryId === itemToDelete.menuCategoryId) {
                        index++;
                        return { ...item, position: index };
                    }
                    return item;
                });

            return {
                ...current,
                foodItems: newFoodItems.sort(sortByCategoryElementPosition(current.foodCategories))
            };
        });
    }

    deleteFoodCategoryById(categoryId: number): void {
        this.state.update(current => {
            const newFoodCategories = current.foodCategories
                .filter(category => category.id !== categoryId)
                .map((category, index) => ({ ...category, position: index + 1 }));

            const newFoodItems = current.foodItems
                .filter(item => item.menuCategoryId !== categoryId)
                .sort(sortByCategoryElementPosition(newFoodCategories));

            return {
                ...current,
                foodCategories: newFoodCategories,
                foodItems: newFoodItems
            };
        });
    }

    // Drinks methods (mirroring food methods)
    addDrinksItem(item: MenuItemDto): void {
        this.state.update(current => ({
            ...current,
            drinksItems: [...current.drinksItems, item]
        }));
    }



    addDrinksCategory(category: MenuCategoryDto): void {
        this.state.update(current => ({
            ...current,
            drinksCategories: [...current.drinksCategories, category]
        }));
    }



    updateDrinksItemById(itemId: number, updateItem: Partial<MenuItemDto>): void {
        this.state.update(current => ({
            ...current,
            drinksItems: current.drinksItems.map(item =>
                item.id === itemId ? { ...item, ...updateItem } : item
            )
        }));
    }

    updateDrinksCategoryById(categoryId: number, updateCategory: Partial<MenuCategoryDto>): void {
        this.state.update(current => ({
            ...current,
            drinksCategories: current.drinksCategories.map(category =>
                category.id === categoryId ? { ...category, ...updateCategory } : category
            )
        }));
    }

    deleteDrinksItemById(itemId: number): void {
        this.state.update(current => {
            const itemToDelete = current.drinksItems.find(item => item.id === itemId);
            if (!itemToDelete) return current;

            let index = 0;
            const newDrinksItems = current.drinksItems
                .filter(item => item.id !== itemId)
                .map(item => {
                    if (item.menuCategoryId === itemToDelete.menuCategoryId) {
                        index++;
                        return { ...item, position: index };
                    }
                    return item;
                });

            return {
                ...current,
                drinksItems: newDrinksItems.sort(sortByCategoryElementPosition(current.drinksCategories))
            };
        });
    }

    deleteDrinksCategoryById(categoryId: number): void {
        this.state.update(current => {
            const newDrinksCategories = current.drinksCategories
                .filter(category => category.id !== categoryId)
                .map((category, index) => ({ ...category, position: index + 1 }));

            const newDrinksItems = current.drinksItems
                .filter(item => item.menuCategoryId !== categoryId)
                .sort(sortByCategoryElementPosition(newDrinksCategories));

            return {
                ...current,
                drinksCategories: newDrinksCategories,
                drinksItems: newDrinksItems
            };
        });
    }
}