import { ReactNode, createContext, useState } from "react";
import { Post } from "../types/Post";
import { User } from "../types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { json } from "body-parser";

type PostContextProps = {
    posts: Post[];
    setPost: (post: Post) => void;
    criarPost: (titulo: string, conteudo: string, imagem: string, user: User) => void;
    arrayPosts: () => void;
    editarPost: (post:Post) => void;
    excluirPost: (post:Post) => void
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


    const arrayPosts = async() => {
        const jsonPosts = await AsyncStorage.getItem("posts")

        const arrayPosts = JSON.parse(jsonPosts!).posts

        console.log(jsonPosts)

        arrayPosts.forEach((post:Post)=>{
            console.log(post);


            
            setPost(post)
        })
    }

    const setAsyncPost = async(posts: Post[]) =>{
        AsyncStorage.setItem("posts", JSON.stringify({posts: posts}))
    }


    const criarPost = (titulo: string, conteudo: string, imagem: string, user: User) => {

        const id = posts[posts.length-1].idPost + 1

        let postagem: Post = {
            idPost: id,
            title: titulo,
            conteudo: conteudo,
            avatar: user.avatar,
            image: imagem,
            likes: 0,
            comments: []
        }
        let postsAtualizados = [...posts, postagem]

        setPost(postagem)


        setAsyncPost(postsAtualizados)

        console.log(posts)
    }

    const editarPost = async(post:Post) => {
        if(!post) {return}

        console.log(post);
        

        const idPost = posts.findIndex(postAchar => postAchar.idPost === post.idPost)

        console.log(idPost);
        

        if(idPost<0) { return }

        let postsAtualizados:Post[] = [...posts]

        postsAtualizados[idPost] = post

        console.log(postsAtualizados)

        postsAtualizados.forEach((post)=>{
            console.log(post);
            
            setPost(post)
        })

        await setAsyncPost(postsAtualizados)
    }

    const excluirPost = async(post:Post) => {
        const postsAtualizados = posts.filter(postAchar => postAchar.idPost !== post.idPost)

        console.log(postsAtualizados);
        

        postsAtualizados.forEach((post)=>{
            setPost(post)
        })
        setAsyncPost(postsAtualizados)
    }

    return (
        <PostContext.Provider value={{ posts, setPost, criarPost, arrayPosts, editarPost, excluirPost }}>
            {children}
        </PostContext.Provider>
    )
}

