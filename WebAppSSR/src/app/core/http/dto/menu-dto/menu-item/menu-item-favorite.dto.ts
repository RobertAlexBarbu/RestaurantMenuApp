export interface MenuItemDto {
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
    menuId: number;
    userId: number;
    favorite: false;
}
