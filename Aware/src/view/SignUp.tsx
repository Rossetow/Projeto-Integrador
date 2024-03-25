import { useContext, useState } from "react"
import { Text, TextInput, View, StyleSheet, Button } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { UserContext } from "../Contexts/UserContect";


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

    const [date, setDate] = useState(new Date(1598051730000));
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
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    const { signUp } = useContext(UserContext)
    const saveUser = () => {
        console.log("chegou aqui")
        const userAdd = {name, email, password, dateOfBirth, state, city, avatar}
        signUp(
            userAdd
        )
    }


    return (
        <View>
            <Text>Bem-vind@!</Text>
            <Text>Qual seu nome?</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text>E-mail</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />
            <Text>Senha</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                
            />
            <Text>Data de nascimento</Text>

            <Button onPress={showDatepicker} title="Data de nascimento" />
            <Text>
                {dateOfBirth}
            </Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={valueEstado}
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
            <Text>
                Cidade
            </Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={valueCidade}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValueCidade(item.value);
                    setIsFocus(false);
                    setCity(item.label)
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

            <Text>Link para o avatar (Provisório)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setAvatar}
                value={avatar}
            />

            <Button
                title="Salvar"
                onPress={saveUser}
            />

        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
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
        backgroundColor: "rgba(0,0,0,0)",
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        marginBottom: 20,
    }
});
