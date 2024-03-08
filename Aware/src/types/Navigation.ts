import { NativeStackScreenProps } from "@react-navigation/native-stack";

    export type StackParamList = {
        Login: undefined;
        SignUp: undefined;
        Profile: undefined;
        Drawer: undefined;
    };

export type LoginStackProps = NativeStackScreenProps<StackParamList, "Login">;

export type SignUpStackProps = NativeStackScreenProps<StackParamList, "SignUp">;

export type ProfiletackProps = NativeStackScreenProps<StackParamList, "Profile">;