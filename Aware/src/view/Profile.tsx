import { useContext, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { UserContext } from "../Contexts/UserContect";
import SignUp from "./SignUp";
import styled from 'styled-components/native';
import { ThemeContext } from "../Contexts/ThemeContext";
import { dark, light } from "../constants/theme";


const Profile = ({ navigation }: any) => {
    //Get user context 
    const {user, setUser} = useContext(UserContext)
    const { theme, setTheme } = useContext(ThemeContext)

    //User useStates
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [avatar, setAvatar] = useState('')

    const updateUser = () => {
        setIsEditable(true)
    }

    const teste = () => {
        setIsEditable(false)
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
            value={user.name}
            />

            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={user.email}
            />

            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={user.password}
            />
            
            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={user.dateOfBirth}
            />

            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={user.state}
            />

            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={user.city}
            />

            <TextInput 
            style={styles.input}
            editable={isEditable}
            value={user.avatar}
            />

            <Button 
            title="Alterar dados"
            onPress={()=>updateUser()}
            />

            <TextInput
            value={user.name}

            />


        </View>
    )
    
}

export default Profile