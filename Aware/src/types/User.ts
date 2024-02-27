export interface BasicUser{
    id: number
}

export interface UserDB extends BasicUser{
    name: string
    email: string,
    password: string,
    dateOfBirth: string,
    state: string,
    city: string,
    avatar: string,
}

export type User = {
    name: string
    email: string,
    password: string,
    dateOfBirth: string,
    state: string,
    city: string,
    avatar: string,
}