export interface CreateMenuItemDto {
  menuType: string; // "drinks" or "food"
  name: string;
  description: string;
  imageUrl?: string | null;
  price: number;

  nutritionalValues: string;
  ingredients: string;
  allergens: string;

  position: number;
  menuCategoryId: number;
  menuId: number;
}
