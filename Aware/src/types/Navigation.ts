import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type StackParamList = {
    Login: undefined;
    Home: undefined;
    SignUp: undefined;
};

export type LoginStackProps = NativeStackScreenProps<StackParamList, "Login">;

export type HomeStackProps = NativeStackScreenProps<StackParamList, "Home">;

export type SignUpStackProps = NativeStackScreenProps<StackParamList, "SignUp">;