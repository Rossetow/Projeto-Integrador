import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserDB } from "../types/User";
import { Post } from "../types/Post";
import { db } from "../db";
import { collection, addDoc, getDoc, deleteDoc, doc, getFirestore, } from "firebase/firestore";
import { getDatabase, ref, child, get, set } from "firebase/database";



type UserContextProps = {
    token: string;
    setToken: (token: string) => void;
    getToken: () => void;
    userDB: UserDB | null;
    setUserDB: (user: UserDB) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    login: (email: string) => Promise<boolean>;
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

    const login = async (email: string) => {
        try {
            const dbRef = ref(getDatabase());
            console.log(email);
            
            get(child(dbRef, `users/${email}`)).then((snapshot) => {
                if (snapshot.exists()) {

                    const newUserDB:UserDB = {
                        name: snapshot.val().name,
                        email: snapshot.val().email,
                        password: snapshot.val().password,
                        city: snapshot.val().city,
                        state: snapshot.val().state,
                        dateOfBirth: snapshot.val().dateOfBirth,
                        avatar: snapshot.val().avatar,
                    }

                    console.log(newUserDB)

                    setUserDB(newUserDB)
                    console.log(userDB)

                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        } catch (e) {
            console.log("Error:",e);   
        }

        
        setToken("a")
        storeToken("a")
        if (userDB)
            return true

        return false

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
    //                 city: userDB!.city,
    //                 avatar: userDB!.avatar,
    //                 favorites: posts
    //             }
    //             setUser(userAdd);
    //         })
    //     } catch (e) {

    //     }
    // }

    const signUp = async (user: UserDB) => {
    
        try {
            const db = getDatabase();
            set(ref(db, 'users/' + user.email), {
              name: user.name,
              email: user.email,
              password : user.password,
              dateOfBirth: user.dateOfBirth,
              city: user.city,
              state: user.state,
              avatar: user.avatar
            });
        } catch (e) {
            console.log("Error:", e);    
        }
          
    }

    const logout = async () => {
        await AsyncStorage.removeItem("@token");
        await AsyncStorage.removeItem("@user");
        setToken("");
        setUser(null);
        setUserDB(null);
    };

    const updateUser = async(user: UserDB) => {
        try {
            const db = getDatabase();
            set(ref(db, 'users/' + user.email), {
              name: user.name,
              email: user.email,
              password : user.password,
              dateOfBirth: user.dateOfBirth,
              city: user.city,
              state: user.state,
              avatar: user.avatar
            });
        } catch (e) {
            console.log("Error:", e);    
        }
    }

    const deleteUser = async(email: string) => {
        const dbFire = getFirestore()
        deleteDoc(doc(dbFire, 'users', email))
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