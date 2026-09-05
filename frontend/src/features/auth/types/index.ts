export type UserType = {
    _id: string,
    name: string,
    email: string,
    avatar?: string
}
export type AuthResponse = {
    user: UserType,
    message: string
}

export type UserState = {
    userData: UserType | null;
}