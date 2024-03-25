import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, Button, TouchableOpacity } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginStackProps } from "../types/Navigation";
import SignUp from "./SignUp";
import { UserContext } from "../Contexts/UserContect";
<<<<<<< HEAD
import { User, UserDB } from "../types/User";
import axios from "axios";
=======
import { User } from "../types/User";
import { TouchableOpacity } from "react-native";

>>>>>>> refs/remotes/origin/main

const Login = ({ navigation }: any) => {

    //Setting default user for testing

    const { login, setUser } = useContext(UserContext)


    
    

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

    /*

    Não sei por que mas essa parte da dando como erro, dar uma olhdada depois. (Pedro)

    function errorLogin() {
        styles.input = {
            borderBottomColor: "#ff0000",
            borderBottomWidth: 1,
            marginBottom: 10,
            backgroundColor: "ffa07a",
        }
    }
    */

    const handleLogin = async () => {
        // if (!username || !password) {
        //     Alert.alert("Alerta!", "Preencha os dados corretamente", [
        //         { text: "Entendi!" }
        //     ])
        //     return;
        // } else {
        //     if (user.email === username && user.password === password) {
        //         const loginData = {
        //             username,
        //             password
        //         }
        //         storeData(loginData)
        //         navigation.navigate("Drawer")
        //     } else {
        //         Alert.alert("Alerta!", "Email ou senha incorreto", [
        //             { text: "Entendi!" }
        //         ])
        //         return
        //     }
        // }

        try{
            login(username, password)
        } catch (e) {
            console.log("Error:", e)
        }
        navigation.navigate("Drawer")
    }

    const setStateForUser = async () => {

        console.log("OI")
        try {
          const urlUser = `https://localhost:3000/user`
    
          const response = await axios.get<UserDB[]>(urlUser);
          response.data.forEach(element => {
            setUsername(element.name)
            console.log(element)
            console.log("oi")
          });
        } catch (err) {
          console.log("err:", err)
        }
    }
    
      useEffect(()=>{setStateForUser()}, [])

    return (

    <View style={styles.container}>
        
        <Text style={styles.awareText}>AWARE</Text>
        
        <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="E-mail"
            placeholderTextColor="#999"
        />
        <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            placeholderTextColor="#999"
        />
        <View style={{justifyContent:'space-between'}}>
       
       <TouchableOpacity
       onPress={handleLogin}
       style={styles.button}
       >
        <Text style={styles.logincolor}>
            Login
        </Text>
        
       </TouchableOpacity>

        <View style={styles.registerContainer}>
            <Text>Não tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.registerLink}> Registre-se </Text>
            </TouchableOpacity>
        </View>
        </View>
       
    </View>
);

}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative'
    },
    input: {
        height: 40,
        width: '80%',
        margin: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 3,
    },
    awareText: {
        fontSize: 46,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    registerContainer: {
        flexDirection: 'row',
        position:'absolute',
        bottom:-210,
        right:-34
    },
    registerLink: {
        color: 'blue',
    },
    button: {
        paddingVertical: 7,
        paddingHorizontal: 60,
        backgroundColor: "black",
        borderRadius: 3,
        color:"white"
    },
    logincolor: {
        color: "white"
    },
});
