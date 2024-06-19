import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {Post} from "./Post"

    export type StackParamList = {
        Login: undefined;
        SignUp: undefined;
        Profile: undefined;
        Drawer: undefined;
        Post: Post;
        Favoritos: undefined;
        Admin: undefined;
        EditarPost: undefined;
        PostEditando: Post;
    };

export type LoginStackProps = NativeStackScreenProps<StackParamList, "Login">;

export type SignUpStackProps = NativeStackScreenProps<StackParamList, "SignUp">;

export type ProfiletackProps = NativeStackScreenProps<StackParamList, "Profile">;

export type PostStackProps = NativeStackScreenProps<StackParamList, "Post">;

export type FavoritosStackProps = NativeStackScreenProps<StackParamList, "Favoritos">;

export type AdminStackProps = NativeStackScreenProps<StackParamList, "Admin">;

export type EditarPostStackProps = NativeStackScreenProps<StackParamList, "EditarPost">;

export type PostEditandoStackProps = NativeStackScreenProps<StackParamList, "PostEditando">;
