import {MenuItemDto} from "../menu-item/menu-item.dto";

export interface MenuCategoryDetailDto {
    id: number;
    createdAt: Date;
    position: number;
    menuType: string; // "drinks" or "food"
    name: string;
    description: string;
    isVisible: boolean;
    userId: number;
    items: MenuItemDto[],
    menuId: number;
}