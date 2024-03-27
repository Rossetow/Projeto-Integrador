import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserDB } from "../types/User";
import { Post } from "../types/Post";
import { db } from "../db";
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

    const login = async (username: string) => {
        
            const dbRef = ref(getDatabase());
            console.log('username',username);
            
        const response = get(child(dbRef, `users/${username}`)).then((snapshot) => {
                if (snapshot.exists()) {

                    const newUserDB:UserDB = {
                        name: snapshot.val().name,
                        email: snapshot.val().email,
                        password: snapshot.val().password,
                        state: snapshot.val().state,
                        dateOfBirth: snapshot.val().dateOfBirth,
                        avatar: snapshot.val().avatar,
                    }

                   

                    setUserDB(newUserDB)
                    console.log(userDB)
                    setToken("a")
                    storeToken("a")
                    console.log('user', userDB)
                    return true;
                } else {

                    Alert.alert('Erro', 'Não foi possível logar', [
                        {text: 'OK'},
                      ]);
                    console.log("No data available");
                    return false
                }
            }).catch((error) => {
                console.error(error);
                return false
            });
return response
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
        try {
            const db = getDatabase();
            set(ref(db, 'users/' + user.name), {
              name: user.name,
              email: user.email,
              password : user.password,
              dateOfBirth: user.dateOfBirth,
              state: user.state,
              avatar: user.avatar
            });
        } catch (e) {
            Alert.alert('Erro', 'Não foi possivel cadastrar a conta', [
                {text: 'OK'},
              ]);
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
            console.log(user)
            const db = getDatabase();
            set(ref(db, 'users/' + user.name), {
              name: user.name,
              email: user.email,
              password : user.password,
              dateOfBirth: user.dateOfBirth,
              state: user.state,
              avatar: user.avatar
            });
            setUserDB(user)
        } catch (e) {
            Alert.alert('Erro', 'Não foi possível sair', [
                {text: 'OK'},
              ]);
        
            console.log("Error:", e);    
        }
    }

    const deleteUser = async(email: string) => {
        try {
            console.log(user)
            const db = getDatabase();
            set(ref(db, 'users/' + email), null);
            setUserDB(user)
            logout()
        } catch (e) {
            Alert.alert('Erro', 'Não foi possivel excluir a conta', [
                {text: 'OK'},
              ]);
            console.log("Error:", e);    
        }
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