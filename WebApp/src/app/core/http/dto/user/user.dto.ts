import {MenuDto} from "../menu-dto/menu/menu.dto";

export interface UserDto {
    id: number
    firebaseId: string
    createdAt: Date
    role: string

    setupComplete: boolean
    email: string | null
    googleEmail: string | null
    username: string
    firstName: string
    lastName: string
    emailNotifications: boolean
    imageUrl: string | null
    menu: MenuDto


}
