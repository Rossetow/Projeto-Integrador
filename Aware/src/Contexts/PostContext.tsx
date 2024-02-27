import { ReactNode, createContext, useState } from "react";
import { Post } from "../types/Post";

type PostContextProps = {
    posts: Post[];
    setPost: (post: Post) => void;
};

type PostProviderProps = {
    children: ReactNode;
};

export const PostContext = createContext<PostContextProps>(
    {} as PostContextProps
);
 
export const PostContextProvider = ({ children }: PostProviderProps) => {
    
    const posts: Post[] = [];

    const setPost = (post: Post) => {
        posts.push(post)
    };

    
    return (
        <PostContext.Provider value={{posts, setPost}}>
            {children}
        </PostContext.Provider>
    )
}

