import { ReactNode, createContext, useState } from "react";
import { Post } from "../types/Post";
import { User } from "../types/User";

type UserContextProps = {
    user: User;
    setUser: (user: User) => void;
};

type UserProviderProps = {
    children: ReactNode;
};

export const UserContext = createContext<UserContextProps>(
    {} as UserContextProps
);

export const UserContextProvider = ({ children }: UserProviderProps) => {

    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: "",
        dateOfBirth: "",
        state: "",
        city: "",
        avatar: "",
    });
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

