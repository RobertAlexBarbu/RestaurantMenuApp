export interface MenuStyleDto {
    id: number;
    menuId: number;
    userId: number;
    imageUrl?: string | null;

    themeColor: string;
    themeCss: string;
    font: string;
    fontCss: string;
    style: string;
}