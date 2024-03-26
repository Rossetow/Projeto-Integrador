import { useContext, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { UserContext } from "../Contexts/UserContect";
import SignUp from "./SignUp";
import styled from 'styled-components/native';
import { ThemeContext } from "../Contexts/ThemeContext";
import { dark, light } from "../constants/theme";


const Profile = ({ navigation }: any) => {
    //Get user context 
    const {userDB, setUser, updateUser, deleteUser} = useContext(UserContext)
    const { theme, setTheme } = useContext(ThemeContext)

    //User useStates
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [avatar, setAvatar] = useState('')

    const changeUser = () => {
        setIsEditable(true)
    }

    const teste = () => {
        setIsEditable(false)
    }

    const handleUpdateUser = async() => {
        const userUpdate = {
            name,
            email,
            password,
            dateOfBirth,
            state,
            city,
            avatar
        }

        updateUser(userUpdate)
    }

    const handleDelete = async() => {
        deleteUser(email)
    }

    const [isEditable, setIsEditable] = useState(false)

    const styles = StyleSheet.create({
        input: {
            backgroundColor: isEditable ? "#fff" : "#a9a9a9",
            borderBottomColor: "#000",
            borderBottomWidth: 1,
            marginBottom: 10,
        },
        container: {
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: theme == "dark" ? dark.background : light.background
        }
    })

    return (
        <View style={styles.container}>
            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={userDB!.name}
            />

            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={userDB!.email}
            />

            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={userDB!.password}
            />
            
            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={userDB!.dateOfBirth}
            />

            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={userDB!.state}
            />

            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={userDB!.city}
            />

            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={userDB!.avatar}
            />

            <Button 
            title="Alterar dados"
            onPress={()=>changeUser()}
            />

            <TextInput
            value={userDB!.name}

            />

            <Button
            title="salvar"
            onPress={handleUpdateUser}
            />

            <Button
            title="Excluir conta"
            onPress={handleDelete}
            />

        </View>
    )
    
}

export default Profile