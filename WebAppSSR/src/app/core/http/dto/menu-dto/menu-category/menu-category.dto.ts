export interface MenuCategoryDto {
  id: number;
  createdAt: Date;
  position: number;
  menuType: string; // "drinks" or "food"
  name: string;
  description: string;
  isVisible: boolean;
  userId: number;
  menuId: number;
}
