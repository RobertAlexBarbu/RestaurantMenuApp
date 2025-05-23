import {MenuCategoryDto} from "../menu-category/menu-category.dto";

export interface MenuItemDetailDto {
    id: number;
    createdAt: Date;
    menuType: string; // "drinks" or "food"
    name: string;
    description: string;
    imageUrl?: string | null;
    price: number;
    weight: string;
    isVisible: boolean;

    nutritionalValues: string;
    ingredients: string;
    allergens: string;

    position: number;
    menuCategoryId: number;
    category: MenuCategoryDto;
    menuId: number;
    userId: number;
}
