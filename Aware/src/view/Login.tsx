import { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, Button } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginStackProps } from "../types/Navigation";
import SignUp from "./SignUp";
import { UserContext } from "../Contexts/UserContect";

const Login = ({ navigation }: any) => {

    const { user } = useContext(UserContext)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const storeData = async (value: any) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem("login", jsonValue);
        } catch (e) {
            Alert.alert("Alerta!", "Algo deu errado /n Código do erro: " + e, [{ text: "Ok" }])
            console.log("Error: " + e)
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("login");
            return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch (e) {
            Alert.alert("Alerta!", "Algo deu errado! /n Código do erro: " + e, [{ text: "Ok" }])
            console.log("Erro: " + e)
        }
    }

    function errorLogin() {
        styles.input = {
            borderBottomColor: "#ff0000",
            borderBottomWidth: 1,
            marginBottom: 10,
            backgroundColor: "ffa07a",
        }
    }

    const login = async () => {
        if (!username || !password) {
            Alert.alert("Alerta!", "Preencha os dados corretamente", [
                { text: "Entendi!" }
            ])
            return;
        } else {
            if (user.email === username && user.password === password) {
                const loginData = {
                    username,
                    password
                }
                storeData(loginData)
                navigation.navigate("Home")
            } else {
                Alert.alert("Alerta!", "Email ou senha incorreto", [
                    { text: "Entendi!" }
                ])
                return
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text>
                Username
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
            />
            <Text>
                Password
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />
            <Button
                onPress={login}
                title="Login"
                color="#841584"
            />
            <Button
                onPress={() => navigation.navigate("SignUp")}
                title="Cadastre-se"
            />
        </View>

    )
}

export default Login;

const styles = StyleSheet.create({
    input: {
        backgroundColor: "rgba(0,0,0,0)",
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        margin: 10
    }
})
