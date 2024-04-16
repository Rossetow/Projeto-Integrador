import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserDB } from "../types/User";
import { Post } from "../types/Post";
import { dbExport as db } from "../db";
import { collection, addDoc, getDoc, deleteDoc, doc, getFirestore, } from "firebase/firestore";
import { getDatabase, ref, child, get, set } from "firebase/database";
import Toast from "react-native-root-toast";
import { Alert } from "react-native";

type UserContextProps = {
    token: string;
    setToken: (token: string) => void;
    getToken: () => void;
    userDB: UserDB | null;
    setUserDB: (user: UserDB) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    signUp: (user: UserDB) => void;
    updateUser: (user: UserDB) => void;
    deleteUser: (email:string) => void;
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
            console.log("Error:", error)
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

    const setUserForApp = async(email:string, password: string) => {
        db.transaction((tx) => {
            tx.executeSql(`
                SELECT * FROM Users;
            `, [],
        (_, { rows: { _array }}) => {

            console.log(_array)

            const userAdd: UserDB = {
                name: _array[0].name,
                email: _array[0].email,
                password: _array[0].password,
                dateOfBirth: _array[0].dateOfBirth,
                state: _array[0].state,
                avatar: _array[0].avatar,
            }       
            
            console.log("esse é o user add:",userAdd)    
            setUserDB(userAdd)
        })
        })
    }

    const login = async (email: string, password: string) => {
        

        setUserForApp(email, password)
        

        console.log(userDB);


        return true;
    };

    // const setPostsForUser = async (postIds: number[]) => {
    //     try {
    //         postIds.forEach(async id => {
    //             const urlUser = `https://localhost:3000/posts/${id}`
    //             const posts: Post[] = []
    //             const response = await axios.get<Post[]>(urlUser);
    //             response.data.forEach(element => {
    //                 posts.push(element)
    //             });

    //             let userAdd: User = {
    //                 name: userDB!.name,
    //                 email: userDB!.email,
    //                 password: userDB!.password,
    //                 dateOfBirth: userDB!.dateOfBirth,
    //                 state: userDB!.state,
    //                 avatar: userDB!.avatar,
    //                 favorites: posts
    //             }
    //             setUser(userAdd);
    //         })
    //     } catch (e) {

    //     }
    // }

    const signUp = async (user: UserDB) => {
        console.log("user",user)
        db.transaction(tx => {
            tx.executeSql(
                `
                    INSERT INTO TABLE Users (name, email, password, dateOfBirth, state, avatar) VALUES (?, ?, ? ,?, ?, ?);
                `,
                [user.name, user.email, user.password, user.dateOfBirth, user.state, user.avatar]
            )
        })
          
    }

    const logout = async () => {
        await AsyncStorage.removeItem("@token");
        await AsyncStorage.removeItem("@user");
        setToken("");
        setUser(null);
        setUserDB(null);
    };

    const updateUser = async(user: UserDB) => {
        
    }

    const deleteUser = async(username: string) => {
        
    }

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
                signUp,
                updateUser,
                deleteUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};