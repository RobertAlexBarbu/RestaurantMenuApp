export interface UpdateMenuItemDto {
  name: string;
  description: string;
  imageUrl?: string | null;
  price: number;
  weight: string;

  nutritionalValues: string;
  ingredients: string;
  allergens: string;

  menuCategoryId: number;
}
