import {computed, Injectable, signal} from '@angular/core';
import {PositionDto} from "../../../../core/http/dto/other/position.dto";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {MenuDataDto} from "../../../../core/http/dto/menu-dto/menu/menu-data.dto";

export interface MenuFeatureStoreState {
    foodItems: MenuItemDto[];
    drinksItems: MenuItemDto[];
    foodCategories: MenuCategoryDto[];
    drinksCategories: MenuCategoryDto[];
    init: boolean;
}

export const initialState: MenuFeatureStoreState = {
    foodItems: [],
    foodCategories: [],
    drinksCategories: [],
    drinksItems: [],
    init: false
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

@Injectable()
export class MenuStoreService {
    private readonly state = signal<MenuFeatureStoreState>(initialState);

    // State signals
    readonly foodItems = computed(() => this.state().foodItems);
    readonly drinksItems = computed(() => this.state().drinksItems);
    readonly foodCategories = computed(() => this.state().foodCategories);
    readonly drinksCategories = computed(() => this.state().drinksCategories);
    readonly isInitialized = computed(() => this.state().init);

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
        }))
    );

    readonly drinksItemsWithCategory = computed(() =>
        this.drinksItems().map(item => ({
            ...item,
            category: this.drinksCategoryMap().get(item.menuCategoryId)!
        }))
    );

    // Methods
    initialize(menuDataDto: MenuDataDto): void {
        this.state.set({
            foodItems: [...menuDataDto.foodMenuItems],
            foodCategories: [...menuDataDto.foodMenuCategories],
            drinksItems: [...menuDataDto.drinksMenuItems],
            drinksCategories: [...menuDataDto.drinksMenuCategories],
            init: true
        });
    }

    setInit(init: boolean): void {
        this.state.update(current => ({ ...current, init }));
    }

    // Food methods
    addFoodItem(item: MenuItemDto): void {
        this.state.update(current => ({
            ...current,
            foodItems: [...current.foodItems, item]
        }));
    }

    addFoodCategory(category: MenuCategoryDto): void {
        this.state.update(current => ({
            ...current,
            foodCategories: [...current.foodCategories, category]
        }));
    }

    updateFoodItemPositions(categoryId: number, positions: PositionDto[]): void {
        this.state.update(current => {
            const positionMap = new Map(positions.map(p => [p.id, p.position]));
            const newFoodItems = current.foodItems
                .map(item =>
                    item.menuCategoryId === categoryId
                        ? { ...item, position: positionMap.get(item.id) ?? item.position }
                        : item
                )
                .sort(sortByCategoryElementPosition(current.foodCategories));

            return { ...current, foodItems: newFoodItems };
        });
    }

    updateFoodCategoryPositions(positions: PositionDto[]): void {
        this.state.update(current => {
            const positionMap = new Map(positions.map(p => [p.id, p.position]));
            const newFoodCategories = current.foodCategories
                .map(category => ({
                    ...category,
                    position: positionMap.get(category.id) ?? category.position
                }))
                .sort((a, b) => a.position - b.position);

            const newFoodItems = [...current.foodItems]
                .sort(sortByCategoryElementPosition(newFoodCategories));

            return {
                ...current,
                foodCategories: newFoodCategories,
                foodItems: newFoodItems
            };
        });
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

    updateDrinksItemPositions(categoryId: number, positions: PositionDto[]): void {
        this.state.update(current => {
            const positionMap = new Map(positions.map(p => [p.id, p.position]));
            const newDrinksItems = current.drinksItems
                .map(item =>
                    item.menuCategoryId === categoryId
                        ? { ...item, position: positionMap.get(item.id) ?? item.position }
                        : item
                )
                .sort(sortByCategoryElementPosition(current.drinksCategories));

            return { ...current, drinksItems: newDrinksItems };
        });
    }

    updateDrinksCategoryPositions(positions: PositionDto[]): void {
        this.state.update(current => {
            const positionMap = new Map(positions.map(p => [p.id, p.position]));
            const newDrinksCategories = current.drinksCategories
                .map(category => ({
                    ...category,
                    position: positionMap.get(category.id) ?? category.position
                }))
                .sort((a, b) => a.position - b.position);

            const newDrinksItems = [...current.drinksItems]
                .sort(sortByCategoryElementPosition(newDrinksCategories));

            return {
                ...current,
                drinksCategories: newDrinksCategories,
                drinksItems: newDrinksItems
            };
        });
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