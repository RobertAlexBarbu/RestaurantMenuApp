export interface CreateMenuCategoryDto {
    menuType: string;  // more flexible approach
    name: string;
    description: string;
    position: number;
    menuId: number;
}