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


}
