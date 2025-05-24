export interface MenuItemAccessDto {
    id: number;
    createdAt: string; // ISO date string (e.g., "2024-05-23T18:00:00Z")
    menuItemAccessType: 'favorite' | 'details'; // restrict to expected values
    menuId: number;
    menuCategoryId: number;
    menuItemId: number;
}