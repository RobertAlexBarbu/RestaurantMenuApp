import {MenuItemDto} from "../menu-item/menu-item.dto";
import {MenuCategoryDto} from "../menu-category/menu-category.dto";

export interface MenuItemAccessDetailDto {
    id: number;
    createdAt: string; // ISO date string (e.g., "2024-05-23T18:00:00Z")
    menuItemAccessType: 'favorite' | 'details'; // restrict to expected values
    menuId: number;
    menuCategoryId: number;
    menuItemId: number;
    menuItem: MenuItemDto, 
    menuCategory: MenuCategoryDto,
}