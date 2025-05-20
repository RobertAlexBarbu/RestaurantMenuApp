export interface UpdateMenuItemDto {
  name: string;
  description: string;
  imageUrl?: string | null;
  price: number;

  nutritionalValues: string;
  ingredients: string;
  allergens: string;

  menuCategoryId: number;
}
