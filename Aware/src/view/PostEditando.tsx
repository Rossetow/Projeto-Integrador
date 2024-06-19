import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageComponent } from "react-native";
import { Post as PostData } from "../types/Post";
import React, { FC, useContext, useState } from "react";
import { PostContext } from "../Contexts/PostContext";
import { UserContext } from "../Contexts/UserContext";
import { PostEditandoStackProps } from "../types/Navigation";

interface Props {
    post: PostData,
}

const PostEditando = ({ navigation, route }: PostEditandoStackProps, post: PostData) => {

    const postagem = route.params as PostData

    const [titulo, setTitulo] = useState(postagem.title!)

    const [conteudo, setConteudo] = useState(postagem.conteudo!)

    const [imagem, setImagem] = useState(postagem.image!)

    const { editarPost, excluirPost } = useContext(PostContext)

    const handleEditar = async () => {
        const postEditado:PostData = {
            ...postagem,
            title: titulo,
            conteudo,
            image: imagem
        }

        await editarPost(postEditado);
    }

    const handleDeletar = async() => {
        await excluirPost(postagem)
    }

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
                handleEditar()
                navigation.goBack()
            }}
            style = { styles.button}

            >
               <Text style = { styles.texto }>
                    Salvar
               </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => {
                limpar()
                handleDeletar()
                navigation.goBack()
            }}
            style = { styles.button}

            >
               <Text style = { styles.texto }>
                    Deletar
               </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )


}


export default PostEditando