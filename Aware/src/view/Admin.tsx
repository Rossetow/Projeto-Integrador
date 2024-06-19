import { useContext, useState } from "react"
import { Pressable, SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { PostContext } from "../Contexts/PostContext"
import { UserContext } from "../Contexts/UserContext"

const Admin = ({navigation}: any) => {

    const [titulo, setTitulo] = useState("")

    const [conteudo, setConteudo] = useState("")

    const [imagem, setImagem] = useState("")

    const { criarPost } = useContext(PostContext)

    const limpar = () => {
        setTitulo("")
        setConteudo("")
        setImagem("")
    }

    const { user } = useContext(UserContext)
    const styles = StyleSheet.create({
        input: {
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
        button: {
            paddingVertical: 7,
            paddingHorizontal: 60,
            borderRadius: 3,
            marginTop: 19,
            backgroundColor: "#000",
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        },
        texto: {
            color: "white"
        }
        }
    )

    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Criar novo post
            </Text>
            <TextInput
            style={styles.input}
            value={titulo}
            placeholder={"Título"}
            onChangeText={setTitulo}
            >

            </TextInput>

            <TextInput
            style={styles.input}
            value={conteudo}
            placeholder={"Conteúdo"}
            onChangeText={setConteudo}
            >

            </TextInput>

            <TextInput
            style={styles.input}
            value={imagem}
            placeholder={"Imagem"}
            onChangeText={setImagem}
            >

            </TextInput>

            <TouchableOpacity
            onPress={() => {
                limpar()
                criarPost(titulo, conteudo, imagem, user!)
                navigation.goBack()
            }}
            style = { styles.button}

            >
               <Text style = { styles.texto }>
                Criar
               </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Admin