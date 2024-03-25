import { Post } from "./Post"

export type UserDB={
    id?: number;
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
    favorites: Post[]
}