import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserDB } from "../types/User";
import e from "express";
import { Post } from "../types/Post";

type UserContextProps = {
    token: string;
    setToken: (token: string) => void;
    getToken: () => void;
    userDB: UserDB | null;
    setUserDB: (user: UserDB) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
    signUp: (user: UserDB) => void;

};

type UserProviderProps = {
    children: ReactNode;
};

export const UserContext = createContext<UserContextProps>(
    {} as UserContextProps
);

export const UserContextProvider = ({ children }: UserProviderProps) => {
    const [token, setToken] = useState("");
    const [userDB, setUserDB] = useState<UserDB | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const storeToken = async (value: string) => {
        try {
            await AsyncStorage.setItem("@token", value);
        } catch (error) {
            console.log("Error:", e)
        }
    };

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem("@token");

            if (value !== null) {
                setToken(value);
            }
        } catch (error) {
            console.log("Error:", error)
        }
    };

    const storeUser = async (value: User) => {
        try {
            const jsonValue = JSON.stringify(value);

            await AsyncStorage.setItem("@user", jsonValue);
        } catch (error) {
            console.log("Error:", error)
        }
    };

    const login = async (username: string, password: string) => {
        try {

            try {
                const urlUser = `https://localhost:3000/user/${username}_${password}`

                const response = await axios.get<UserDB[]>(urlUser);
                response.data.forEach(element => {
                    setUserDB(element);
                });
            } catch (err) {
                console.log("err:", err)
            }

            try {
                const urlUser = `https://localhost:3000/integration/${userDB?.id}`
                const postIds: number[] = []
                const response = await axios.get<number[]>(urlUser);
                response.data.forEach(element => {
                    postIds.push(element)
                });

                setPostsForUser(postIds)
            } catch (err) {
                console.log("err:", err)
            }



        } catch (error) {
            console.log("Error:", error)
        }

        setToken("a")
        storeToken("a")
    };

    const setPostsForUser = async (postIds: number[]) => {
        try {
            postIds.forEach(async id => {
                const urlUser = `https://localhost:3000/posts/${id}`
                const posts: Post[] = []
                const response = await axios.get<Post[]>(urlUser);
                response.data.forEach(element => {
                    posts.push(element)
                });

                let userAdd: User = {
                    name: userDB!.name,
                    email: userDB!.email,
                    password: userDB!.password,
                    dateOfBirth: userDB!.dateOfBirth,
                    state: userDB!.state,
                    city: userDB!.city,
                    avatar: userDB!.avatar,
                    favorites: posts
                }
                setUser(userAdd);
            })
        } catch (e) {

        }
    }

    const signUp = async(user: UserDB) => {
        try {
            const urlUser = `https://localhost:3000/user/`

            const response = await axios.post(urlUser, user);
        } catch (err) {
            console.log("err:", err)
        }

    }

    const logout = async () => {
        await AsyncStorage.removeItem("@token");
        await AsyncStorage.removeItem("@user");
        setToken("");
        await AsyncStorage.removeItem("@cart");
        setUser(null);
        setUserDB(null);
    };



    return (
        <UserContext.Provider
            value={{
                token,
                setToken,
                getToken,
                user,
                userDB,
                setUser,
                setUserDB,
                login,
                logout,
                signUp
            }}
        >
            {children}
        </UserContext.Provider>
    );
};