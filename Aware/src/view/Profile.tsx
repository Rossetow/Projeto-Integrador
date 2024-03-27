import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { UserContext } from "../Contexts/UserContect";
import SignUp from "./SignUp";
import styled from 'styled-components/native';
import { ThemeContext } from "../Contexts/ThemeContext";
import { dark, light } from "../constants/theme";
import { TouchableOpacity } from "react-native";
import { StateDTO } from "../types/State";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from '@expo/vector-icons/AntDesign';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";


const Profile = ({ navigation }: any) => {
    //Get user context 
    const { userDB, setUser, updateUser, deleteUser } = useContext(UserContext)
    const { theme, setTheme } = useContext(ThemeContext)

    //User useStates
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [state, setState] = useState('')
    const [avatar, setAvatar] = useState('')

    //State and city pickers ussStates delcarations
    const [valueEstado, setValueEstado] = useState('');

    const [valueCidade, setValueCidade] = useState('');
    const [isFocus, setIsFocus] = useState(false);


    const [dataDropdown, setDataDropdown] = useState<StateDTO[]>([])


    const changeUser = () => {
        setIsEditable(true)
    }

    const teste = () => {
        setIsEditable(false)
    }

    const handleUpdateUser = async () => {
        const userUpdate = {
            name: name != '' ? name : userDB!.name,
            email: email != '' ? email : userDB!.email,
            password: password != '' ? password : userDB!.password,
            dateOfBirth: dateOfBirth != '' ? dateOfBirth : userDB!.dateOfBirth,
            state: state != '' ? state : userDB!.state,
            avatar: avatar != '' ? avatar : userDB!.avatar
        }

        updateUser(userUpdate)
        reset()
    }

    const reset = () => {
        setName("")
        setEmail("")
        setPassword("")
        setDateOfBirth("")
        setState("")
        setAvatar("")

        setIsEditable(false)
    }

    const handleDelete = async () => {
        navigation.navigate("Login")
        deleteUser(email)
    }

    const getStates = async () => {
        const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        const response = await axios.get(url)

        const dataStates: StateDTO[] = []

        response.data.forEach((state: { nome: string; sigla: string; }) => {
            dataStates.push({
                label: state.nome,
                value: state.sigla
            })
        });
        setDataDropdown(dataStates)
    }
    useEffect(() => {
        getStates()
    }, [])

    //Date picker setters and getters declaration

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        console.log(selectedDate);
        
        setShow(false);
        setDate(currentDate);
        setDateOfBirth(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`)
        console.log(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`);
        
        console.log(dateOfBirth);
        
    };

    const showMode = (currentMode: any) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };



    const [isEditable, setIsEditable] = useState(false)

    const styles = StyleSheet.create({
    input: {
        backgroundColor: isEditable ? "#fff" : "#a9a9a9",
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        marginBottom: 10,
        height: 40,
        width: '80%',
        margin: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 3,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: theme == "dark" ? dark.background : light.background
    },
    button: {
        paddingVertical: 7,
        paddingHorizontal: 60,
        backgroundColor: theme == "dark" ? light.background : dark.background,
        borderRadius: 3,
        color: theme == "dark" ? dark.background : light.background,
        marginTop: 19,
    },
    buttonSalvarAlteracoes: {
        paddingVertical: 7,
        paddingHorizontal: 47,
        backgroundColor: theme == "dark" ? light.background : dark.background,
        borderRadius: 3,
        color: theme == "dark" ? dark.background : light.background,
        marginTop: 19,
    },
    alterarcolor: {
        color: theme == "dark" ? dark.background : light.background
    },
    salvarcolor: {
        color: theme == "dark" ? dark.background : light.background
    },dropdown: {
        height: 50,
        width: 220,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 15,
        display: isEditable ? "flex" : "none"
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    buttondata: {
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        marginLeft: 10,
    },

    })

    return (
    <View style={styles.container}>

        <TextInput
            style={styles.input}
            editable={isEditable}
            value={userDB!.name}
            placeholder="Nome:"
        />

        <TextInput
            style={styles.input}
            editable={isEditable}
            value={email}
            placeholder={userDB?.email != "" ? userDB?.email : "E-mail:"}
            onChangeText={setEmail}
        />

        <TextInput
            style={styles.input}
            editable={isEditable}
            value={password}
            placeholder={userDB?.password != "" ? userDB?.password : "Senha:"}
            onChangeText={setPassword}
        />

        <TextInput
            style={styles.input}
            editable={false}
            value={dateOfBirth}
            placeholder={userDB?.dateOfBirth != "" ? userDB?.dateOfBirth : "Data do Aniversario:"}
            onChangeText={setDateOfBirth}
        />

            <View style={styles.buttondata}>
                <Button onPress={showDatepicker} title="Data de nascimento" color="black" />
                <Text style={styles.buttonText}>`{date.getDay()}/{date.getMonth()}/{date.getFullYear()}`</Text>
            </View>

        <TextInput
            style={styles.input}
            editable={false}
            value={state}
            placeholder={userDB?.state != "" ? userDB?.state : "Estado:"}

        />

        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataDropdown}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Estado:' : '...'}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setIsFocus(false);
                setState(item.label)
            }}
            renderLeftIcon={() => (
                <AntDesign
                    style={styles.icon}
                    color={isFocus ? 'blue' : 'black'}
                    name="Safety"
                    size={20}
                />
            )}
            
        />

        <TextInput
            style={styles.input}
            editable={isEditable}
            value={avatar}
            placeholder={userDB?.avatar != "" ? userDB?.email : "Avatar:"}
            onChangeText={setAvatar}
        />

        <TouchableOpacity
            onPress={() => changeUser()}
            style={styles.button}
        >
            <Text style={styles.alterarcolor}>
                Alterar Dados
            </Text>

        </TouchableOpacity>



        <TouchableOpacity
            onPress={handleUpdateUser}
            style={styles.buttonSalvarAlteracoes}
        >
            <Text style={styles.salvarcolor}>
                Salvar Alterações
            </Text>

        </TouchableOpacity>



        <TouchableOpacity
            onPress={handleDelete}
            style={styles.button}
        >
            <Text style={styles.salvarcolor}>
                Excluir conta
            </Text>

        </TouchableOpacity>

    </View>
)
    
}

export default Profile