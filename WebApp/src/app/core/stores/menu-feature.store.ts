import {MenuCategoryDto} from "../http/dto/menu-dto/menu-category/menu-category.dto";
import {MenuDetailsDto} from "../http/dto/menu-dto/menu-details/menu-details.dto";
import {MenuItemDto} from "../http/dto/menu-dto/menu-item/menu-item.dto";
import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed} from "@angular/core";
import {MenuDataDto} from "../http/dto/menu-dto/menu/menu-data.dto";
import {UpdateMenuItemDto} from "../http/dto/menu-dto/menu-item/update-menu-item.dto";
import {UpdateMenuItemImageUrlDto} from "../http/dto/menu-dto/menu-item/update-menu-item-image-url.dto";
import {UpdateMenuItemPriceDto} from "../http/dto/menu-dto/menu-item/update-menu-item-price.dto";
import {UpdateMenuItemVisibilityDto} from "../http/dto/menu-dto/menu-item/update-menu-item-visiblity.dto";
import {UpdateMenuCategoryDto} from "../http/dto/menu-dto/menu-category/update-menu-category.dto";
import {UpdateMenuCategoryVisibilityDto} from "../http/dto/menu-dto/menu-category/update-menu-category-visibility.dto";


export interface MenuDataStore {
  menuDetails: MenuDetailsDto | null;
  foodMenuItems: MenuItemDto[];
  foodMenuCategories: MenuCategoryDto[];
  drinksMenuItems: MenuItemDto[];
  drinksMenuCategories: MenuCategoryDto[];
  init: boolean;
}

export const initialMenuDataState: MenuDataStore = {
  menuDetails: null,
  foodMenuItems: [],
  foodMenuCategories: [],
  drinksMenuItems: [],
  drinksMenuCategories: [],
  init: false,
};

// export const sortByCategoryElementPosition = <T extends { menuCategoryId: number; position: number }>(
//   items: T[],
//   categories: MenuCategoryDto[]
// ) => {
//   const categoryPositionMap = new Map<number, number>(
//     categories.map((c) => [c.id, c.position]),
//   );
//
//   return [...items].sort((a, b) => {
//     const catPosA = categoryPositionMap.get(a.menuCategoryId) ?? 0;
//     const catPosB = categoryPositionMap.get(b.menuCategoryId) ?? 0;
//
//     if (catPosA !== catPosB) {
//       return catPosA - catPosB; // Sort first by category position
//     }
//
//     return a.position - b.position; // Then sort by item position inside category
//   });
// };

export const MenuFeatureStore = signalStore(
  withState(initialMenuDataState),
  withComputed((store) => {
    console.log('computing Stuff')
    const foodCategoryMap = computed(() => {
      return new Map(store.foodMenuCategories().map((c) => [c.id, c]));
    });

    const drinksCategoryMap = computed(() => {
      return new Map(store.drinksMenuCategories().map((c) => [c.id, c]));
    });

    // const foodMenuItemsWithFoodMenuCategory = computed(() => {
    //   const categoryMap = foodCategoryMap();
    //   return sortByCategoryElementPosition(
    //     store.foodMenuItems().map((item) => ({
    //       ...item,
    //       category: categoryMap.get(item.menuCategoryId )!,
    //     })),
    //     store.foodMenuCategories()
    //   );
    // });

    // const drinksMenuItemsWithDrinksMenuCategory = computed(() => {
    //   const categoryMap = drinksCategoryMap();
    //   return sortByCategoryElementPosition(
    //     store.drinksMenuItems().map((item) => ({
    //       ...item,
    //       category: categoryMap.get(item.menuCategoryId)!,
    //     })),
    //     store.drinksMenuCategories()
    //   );
    // });

    return {
      foodCategoryMap,
      drinksCategoryMap,
    };
  }),
  withMethods((store) => ({
    initialize(value: MenuDataDto) {
      patchState(store, () => ({
        menuDetails: { ...value.menuDetails },
        foodMenuItems: [...value.foodMenuItems],
        foodMenuCategories: [...value.foodMenuCategories],
        drinksMenuItems: [...value.drinksMenuItems],
        drinksMenuCategories: [...value.drinksMenuCategories],
        init: true,
      }));
    },

    setInit(init: boolean) {
      patchState(store, () => ({
        init,
      }));
    },

    // Food Menu Items methods
    addFoodMenuItem(menuItemDto: MenuItemDto) {
      const newItem = menuItemDto;
      patchState(store, (state) => ({
        foodMenuItems: [...state.foodMenuItems, newItem],
      }));
    },

    updateFoodMenuItem(itemId: number, updateDto: UpdateMenuItemDto) {
      patchState(store, (state) => ({
        foodMenuItems: state.foodMenuItems.map((item) =>
          item.id === itemId ? { ...item, ...updateDto } : item,
        ),
      }));
    },

    updateFoodMenuItemImageUrl(itemId: number, updateDto: UpdateMenuItemImageUrlDto) {
      patchState(store, (state) => ({
        foodMenuItems: state.foodMenuItems.map((item) =>
          item.id === itemId ? { ...item, imageUrl: updateDto.imageUrl } : item,
        ),
      }));
    },

    updateFoodMenuItemPrice(itemId: number, updateDto: UpdateMenuItemPriceDto) {
      patchState(store, (state) => ({
        foodMenuItems: state.foodMenuItems.map((item) =>
          item.id === itemId ? { ...item, price: updateDto.price } : item,
        ),
      }));
    },

    updateFoodMenuItemVisibility(itemId: number, updateDto: UpdateMenuItemVisibilityDto) {
      patchState(store, (state) => ({
        foodMenuItems: state.foodMenuItems.map((item) =>
          item.id === itemId ? { ...item, isVisible: updateDto.isVisible } : item,
        ),
      }));
    },

    // updateFoodMenuItemsPositions(categoryId: number, positions: { id: number; position: number }[]) {
    //   const positionMap = new Map(positions.map((p) => [p.id, p.position]));
    //   patchState(store, (state) => ({
    //     foodMenuItems: sortByCategoryElementPosition(
    //       state.foodMenuItems.map((item) =>
    //         item.menuCategoryId === categoryId
    //           ? { ...item, position: positionMap.get(item.id) ?? item.position }
    //           : item,
    //       ),
    //       state.foodMenuCategories
    //     ),
    //   }));
    // },

    // deleteFoodMenuItemById(itemId: number) {
    //   patchState(store, (state) => {
    //     const itemToDelete = state.foodMenuItems.find((item) => item.id === itemId);
    //     if (!itemToDelete) return state;
    //
    //     let index = 0;
    //     const newItems = state.foodMenuItems
    //       .filter((item) => item.id !== itemId)
    //       .map((item) => {
    //         if (item.menuCategoryId === itemToDelete.menuCategoryId) {
    //           index++;
    //           return { ...item, position: index };
    //         }
    //         return item;
    //       });
    //
    //     return {
    //       foodMenuItems: sortByCategoryElementPosition(newItems, state.foodMenuCategories),
    //     };
    //   });
    // },

    // Drinks Menu Items methods (similar to food items)
    addDrinksMenuItem(menuItemDto: MenuItemDto) {
      const newItem = menuItemDto;
      patchState(store, (state) => ({
        drinksMenuItems: [...state.drinksMenuItems, newItem],
      }));
    },

    updateDrinksMenuItem(itemId: number, updateDto: UpdateMenuItemDto) {
      patchState(store, (state) => ({
        drinksMenuItems: state.drinksMenuItems.map((item) =>
          item.id === itemId ? { ...item, ...updateDto } : item,
        ),
      }));
    },

    updateDrinksMenuItemImageUrl(itemId: number, updateDto: UpdateMenuItemImageUrlDto) {
      patchState(store, (state) => ({
        drinksMenuItems: state.drinksMenuItems.map((item) =>
          item.id === itemId ? { ...item, imageUrl: updateDto.imageUrl } : item,
        ),
      }));
    },

    updateDrinksMenuItemPrice(itemId: number, updateDto: UpdateMenuItemPriceDto) {
      patchState(store, (state) => ({
        drinksMenuItems: state.drinksMenuItems.map((item) =>
          item.id === itemId ? { ...item, price: updateDto.price } : item,
        ),
      }));
    },

    updateDrinksMenuItemVisibility(itemId: number, updateDto: UpdateMenuItemVisibilityDto) {
      patchState(store, (state) => ({
        drinksMenuItems: state.drinksMenuItems.map((item) =>
          item.id === itemId ? { ...item, isVisible: updateDto.isVisible } : item,
        ),
      }));
    },

    // updateDrinksMenuItemsPositions(categoryId: number, positions: { id: number; position: number }[]) {
    //   const positionMap = new Map(positions.map((p) => [p.id, p.position]));
    //   patchState(store, (state) => ({
    //     drinksMenuItems: sortByCategoryElementPosition(
    //       state.drinksMenuItems.map((item) =>
    //         item.menuCategoryId === categoryId
    //           ? { ...item, position: positionMap.get(item.id) ?? item.position }
    //           : item,
    //       ),
    //       state.drinksMenuCategories
    //     ),
    //   }));
    // },

    // deleteDrinksMenuItemById(itemId: number) {
    //   patchState(store, (state) => {
    //     const itemToDelete = state.drinksMenuItems.find((item) => item.id === itemId);
    //     if (!itemToDelete) return state;
    //
    //     let index = 0;
    //     const newItems = state.drinksMenuItems
    //       .filter((item) => item.id !== itemId)
    //       .map((item) => {
    //         if (item.menuCategoryId === itemToDelete.menuCategoryId) {
    //           index++;
    //           return { ...item, position: index };
    //         }
    //         return item;
    //       });
    //
    //     return {
    //       drinksMenuItems: sortByCategoryElementPosition(newItems, state.drinksMenuCategories),
    //     };
    //   });
    // },

    // Food Menu Categories methods
    addFoodMenuCategory(categoryDto: MenuCategoryDto) {
      const newCategory = categoryDto;
      patchState(store, (state) => ({
        foodMenuCategories: [...state.foodMenuCategories, newCategory],
      }));
    },

    updateFoodMenuCategory(categoryId: number, updateDto: UpdateMenuCategoryDto) {
      patchState(store, (state) => ({
        foodMenuCategories: state.foodMenuCategories.map((category) =>
          category.id === categoryId ? { ...category, ...updateDto } : category,
        ),
      }));
    },

    updateFoodMenuCategoryVisibility(categoryId: number, updateDto: UpdateMenuCategoryVisibilityDto) {
      patchState(store, (state) => ({
        foodMenuCategories: state.foodMenuCategories.map((category) =>
          category.id === categoryId ? { ...category, isVisible: updateDto.isVisible } : category,
        ),
      }));
    },

    // updateFoodMenuCategoriesPositions(positions: { id: number; position: number }[]) {
    //   const positionMap = new Map(positions.map((p) => [p.id, p.position]));
    //   patchState(store, (state) => {
    //     const newCategories = state.foodMenuCategories
    //       .map((category) => ({
    //         ...category,
    //         position: positionMap.get(category.id) ?? category.position,
    //       }))
    //       .sort((a, b) => a.position - b.position);
    //
    //     return {
    //       foodMenuCategories: newCategories,
    //       foodMenuItems: sortByCategoryElementPosition(state.foodMenuItems, newCategories),
    //     };
    //   });
    // },

    // deleteFoodMenuCategoryById(categoryId: number) {
    //   patchState(store, (state) => {
    //     const newCategories = state.foodMenuCategories
    //       .filter((category) => category.id !== categoryId)
    //       .map((category, index) => ({ ...category, position: index + 1 }));
    //
    //     const newItems = state.foodMenuItems
    //       .filter((item) => item.menuCategoryId !== categoryId)
    //       .map((item, index) => ({ ...item, position: index + 1 }));
    //
    //     return {
    //       foodMenuCategories: newCategories,
    //       foodMenuItems: sortByCategoryElementPosition(newItems, newCategories),
    //     };
    //   });
    // },

    // Drinks Menu Categories methods (similar to food categories)
    addDrinksMenuCategory(categoryDto: MenuCategoryDto) {
      const newCategory = categoryDto;
      patchState(store, (state) => ({
        drinksMenuCategories: [...state.drinksMenuCategories, newCategory],
      }));
    },

    updateDrinksMenuCategory(categoryId: number, updateDto: UpdateMenuCategoryDto) {
      patchState(store, (state) => ({
        drinksMenuCategories: state.drinksMenuCategories.map((category) =>
          category.id === categoryId ? { ...category, ...updateDto } : category,
        ),
      }));
    },

    updateDrinksMenuCategoryVisibility(categoryId: number, updateDto: UpdateMenuCategoryVisibilityDto) {
      patchState(store, (state) => ({
        drinksMenuCategories: state.drinksMenuCategories.map((category) =>
          category.id === categoryId ? { ...category, isVisible: updateDto.isVisible } : category,
        ),
      }));
    },

    // updateDrinksMenuCategoriesPositions(positions: { id: number; position: number }[]) {
    //   const positionMap = new Map(positions.map((p) => [p.id, p.position]));
    //   patchState(store, (state) => {
    //     const newCategories = state.drinksMenuCategories
    //       .map((category) => ({
    //         ...category,
    //         position: positionMap.get(category.id) ?? category.position,
    //       }))
    //       .sort((a, b) => a.position - b.position);
    //
    //     return {
    //       drinksMenuCategories: newCategories,
    //       drinksMenuItems: sortByCategoryElementPosition(state.drinksMenuItems, newCategories),
    //     };
    //   });
    // },

    // deleteDrinksMenuCategoryById(categoryId: number) {
    //   patchState(store, (state) => {
    //     const newCategories = state.drinksMenuCategories
    //       .filter((category) => category.id !== categoryId)
    //       .map((category, index) => ({ ...category, position: index + 1 }));
    //
    //     const newItems = state.drinksMenuItems
    //       .filter((item) => item.menuCategoryId !== categoryId)
    //       .map((item, index) => ({ ...item, position: index + 1 }));
    //
    //     return {
    //       drinksMenuCategories: newCategories,
    //       drinksMenuItems: sortByCategoryElementPosition(newItems, newCategories),
    //     };
    //   });
    // },

    // Menu Details methods
    updateMenuDetails(updateDto: MenuDetailsDto) {
      patchState(store, () => ({
        menuDetails: { ...updateDto },
      }));
    },
  })),
);
