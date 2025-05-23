export interface UpdateMenuItemDto {
  name: string;
  description: string;
  price: number;

  nutritionalValues: string;
  ingredients: string;
  allergens: string;

  menuCategoryId: number;
}
