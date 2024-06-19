import { User } from "./User";

export interface Comment {
    user: User;
    content: string;
    likes: number;
}