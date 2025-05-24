import {MenuStyleDto} from "../menu-style/menu-style.dto";

export interface MenuDetailDto {
    id: number
    createdAt: Date
    name: string
    url: string
    imageUrl: string | null
    userId: number
    menuStyle: MenuStyleDto
}
