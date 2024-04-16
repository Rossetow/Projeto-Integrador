import { useContext, useEffect, useState } from "react"
import { Text, TextInput, View, StyleSheet, Button } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { UserContext } from "../Contexts/UserContect";
import { TouchableOpacity } from "react-native";
import { UserDB } from "../types/User";
import axios from "axios";
import { StateDTO } from "../types/State";



const SignUp = ({ navigation }: any) => {

    //Getting data from the inputs

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [avatar, setAvatar] = useState('')

    //Date picker setters and getters declaration

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        setDateOfBirth(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`)
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

    //State and city pickers ussStates delcarations
    const [valueEstado, setValueEstado] = useState('');

    const [valueCidade, setValueCidade] = useState('');
    const [isFocus, setIsFocus] = useState(false);

    //Provisory State and city data declaration
    const [ dataDropdown, setDataDropdown ] = useState<StateDTO[]>([])
    const { signUp } = useContext(UserContext)
    const handleSignUp = () => {
        console.log("chegou aqui")
        const userAdd:UserDB = {name, email, password, dateOfBirth, state, avatar}
        signUp(
            userAdd
        )
        navigation.navigate("Login")
    }

    const getStates = async() => {
        const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        const response = await axios.get(url)

        const dataStates:StateDTO[] = [] 

        response.data.forEach((state: { nome: string; sigla: string; }) => {
            dataStates.push({
                label: state.nome,
                value: state.sigla
            })
        });
        setDataDropdown(dataStates)
    }
    useEffect(()=>{
                getStates()
            }, [])
    return (
        <View style={styles.container}>

            <Text style={styles.awareText}>AWARE</Text>

            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Username:"
                placeholderTextColor="#999"
            />

            <TextInput
                style={styles.input}
                onChangeText={setAvatar}
                value={avatar}
                placeholder="Link para foto:"
                placeholderTextColor="#999"
            />

            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="E-mail:"
                placeholderTextColor="#999"
            />

            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Senha:"
                placeholderTextColor="#999"
            />

            <View style={styles.buttondata}>
                <Button onPress={showDatepicker} title="Data de nascimento" color="black" />
                <Text style={styles.buttonText}>{dateOfBirth}</Text>
            </View>

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
                value={valueCidade}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValueEstado(item.value);
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

            <TouchableOpacity
                onPress={handleSignUp}
                style={styles.button}
            >
                <Text style={styles.salvarcolor}>
                    Sign Up
                </Text>

            </TouchableOpacity>

        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        height: 50,
        width: 220,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 15,
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
    input: {
        height: 40,
        width: '80%',
        margin: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 3,
    },

    //Mudançar e novas informações, logo a baixo (Pedro)

    awareText: {
        fontSize: 46,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        paddingVertical: 7,
        paddingHorizontal: 60,
        backgroundColor: "black",
        borderRadius: 3,
        marginTop: 20,
        color: "white", // Adicionando a cor branca para o texto
    },
    salvarcolor: {
        color: "white"
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

});

