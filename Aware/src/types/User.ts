import { Post } from "./Post"

export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    dateOfBirth: string,
    state: string,
    avatar: string,
    favorites: Post[]
}