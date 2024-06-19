import { ReactNode, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User} from "../types/User";
import { Post } from "../types/Post";


type UserContextProps = {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<User | boolean>;
    logout: () => void;
    signUp: (user: User) => void;
    usuarios: User[];
    setUsuarios:(usuarios: User[]) => void;
    arrayUsers: () => void,
    editarConta: (user:User) => void;
    excluirConta: (email:string) => void;
    criarConta: (user:User) => void;
    addFavorito: (post:Post) => void;
};

type UserProviderProps = {
    children: ReactNode;
};

export const UserContext = createContext<UserContextProps>(
    {} as UserContextProps
);

export const UserContextProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [usuarios, setUsuarios] = useState <User[]>([])

    const arrayUsers = async() =>{
        const usuariosJson = await AsyncStorage.getItem("usuarios")

        if(usuariosJson){
            const arrayUsuarios = JSON.parse(usuariosJson).usuarios
            await setUsuarios(arrayUsuarios)
        }
        return
        
    }

    const setAsyncArray = async(array:User[]) => {
        AsyncStorage.setItem("usuarios", JSON.stringify({usuarios: array}))
    }

    const login = async (email: string, password: string) => {

        console.log("usuarios");
        

        console.log(usuarios)


        
        const achaUser = usuarios.find((user)=>
             user.email ===email && user.password === password
    )
        console.log("acha user");
        
        console.log(achaUser)

        if(achaUser){
            await setUser(achaUser)

            console.log("Usererrer");
            
            console.log(user)
            console.log(user)
            return true
        } 


        return false;
    };


    const signUp = async (user: User) => {
        if(user){
            let arrayAtualizada = usuarios

            arrayAtualizada.push(user)

            setAsyncArray(arrayAtualizada)
            return true
        } else {
            return false
        }
        
    }

    const logout = async () => {
        await AsyncStorage.removeItem("@token");
        await AsyncStorage.removeItem("@user");
        setUser(null);
    };

    const excluirConta = async(email:string) => {

        console.log(email)

        const usuariosAtualizado = usuarios.filter(user => user.email !== email)

        console.log(usuariosAtualizado);
        

        setUsuarios(usuariosAtualizado)
        setAsyncArray(usuariosAtualizado)
        logout()
    }

    const editarConta = async(userAtualizado:User) => {
        const userAtualizar = usuarios.find(user => user.id === userAtualizado.id)

        console.log(userAtualizado)
        
        console.log(userAtualizar)

        if(!userAtualizar){
            return
        }
            const index = usuarios.findIndex((user)=>{
                return user.email === userAtualizar.email
            })

        let usuariosAtualizado = usuarios

        console.log(index)

        usuariosAtualizado[index] = userAtualizado;

        setUsuarios(usuariosAtualizado)
        setAsyncArray(usuariosAtualizado)
        setUser(userAtualizado)

        console.log(user)

    }

    const criarConta = (user:User) => {

        if(!user) {return}
         
        let usuariosAtualizado = usuarios;

        const ultimoUsuario = usuariosAtualizado[usuariosAtualizado.length-1]

        usuariosAtualizado.push({
            ...user,
            id: ultimoUsuario.id + 1
        })

        setUsuarios(usuariosAtualizado)
        setAsyncArray(usuariosAtualizado)
    }

    const addFavorito = async(post:Post) => {
        let userAtualizado:User = user!

        if(user?.favorites.find(favoritos => favoritos.idPost === post.idPost)) { return }

        userAtualizado?.favorites.push(post)

        console.log(user?.favorites
        )

        await editarConta(userAtualizado)

        console.log(user?.favorites)
    }

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                signUp,
                usuarios,
                setUsuarios,
                arrayUsers,
                excluirConta,
                editarConta,
                criarConta,
                addFavorito
            }}
        >
            {children}
        </UserContext.Provider>
    );
};