import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FC, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { ThemeContext } from '../Contexts/ThemeContext';
import { dark, light } from "../constants/theme"
import { Post } from '../types/Post';


interface Props {
    post: Post
}

const Footer: FC<Props> = ({ post }) => {
    const [, setForceRender] = useState(false);
    const { theme } = useContext(ThemeContext)

    const ContainerAcao = styled.Pressable`
    display: flex;
    flex-direction: row;
    align-items: center;
    `

    const ContainerFooter = styled.View`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    background-color: ${theme === "dark" ? dark.background : light.background};
    `
    const ValuesFooter = styled.Text`
    color: ${theme === "dark" ? dark.color : light.color};
    `

    // function like(postId: string) {
    //     const postFind = post.find((item) => item.idPost === postId)
    //     if (postFind) {
    //         postFind.likes! ++
    //         setForceRender(prev => !prev)
    //     }
    // }


    //Set styles 

    const styles = StyleSheet.create({

    })

    console.log(theme, "theme")

    return (

        <ContainerFooter>
            <ContainerAcao>
                <FontAwesome style={{ marginRight: 5 }} name="comment" size={22} color={theme === "dark" ? dark.color : light.color} />
                <ValuesFooter>{post.comments}</ValuesFooter>
            </ContainerAcao>
            <ContainerAcao>
                <Entypo style={{ marginRight: 5 }} name="retweet" size={22} color={theme === "dark" ? dark.color : light.color} />
                <ValuesFooter>{post.retweet}</ValuesFooter>
            </ContainerAcao>
            {/* <ContainerAcao onPress={() => like(post.idPost)}>
                <AntDesign style={{ marginRight: 5 }} name="heart" size={24} color="#CBCCFF" />
                <Text>{post.likes}</Text>
            </ContainerAcao> */}
        </ContainerFooter>
    )
}

export default Footer