export interface CreateMenuItemAccessDto {

    menuItemAccessType: 'favorite' | 'details'; // restrict to expected values
    menuId: number;
    menuCategoryId: number;
    menuItemId: number;
}