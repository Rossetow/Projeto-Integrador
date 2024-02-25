import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, Button } from "react-native"

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () =>{
        if (username !== '' && password !== '') {
            Alert.alert("Alerta!", "Você está logado", [
                
            ])
        } else {
            Alert.alert("Alerta!", "Corrija as informações", [
                
            ])
        }
    }

    return(
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
        </View>

    )
}

export default Login;

const styles = StyleSheet.create({
    input:{
        backgroundColor: "rgba(0,0,0,0)",
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    container:{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        margin: 10
    }
})
