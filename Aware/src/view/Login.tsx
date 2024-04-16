import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, Button, TouchableOpacity } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginStackProps } from "../types/Navigation";
import SignUp from "./SignUp";
import { UserContext } from "../Contexts/UserContect";
import { User, UserDB } from "../types/User";
import axios from "axios";
import { dbExport as db } from "../db";


const Login = ({ navigation }: any) => {

    //Setting default user for testing

    const { login, setUser } = useContext(UserContext)

console.log(db);


    db.transaction((tx)=> {
        tx.executeSql(`
          SELECT * FROM Users;
        `, [],
      (_, { rows: { _array }})=> {
        console.log(_array);
      })
      })
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

        console.log("oiii")
        
        if( await login(username, password)){
            navigation.navigate("Drawer")
        }
        
    }
    return (

    <View style={styles.container}>
        
        <Text style={styles.awareText}>AWARE</Text>
        
        <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
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
