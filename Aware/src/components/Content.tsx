import { FC, useContext } from "react";
import { Text, View, Image } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { dark, light } from "../constants/theme"

interface Props {
    title: string | null;
    image: string | null;
}





const Content: FC<Props> = ({ title, image }) => {

    const { theme } = useContext(ThemeContext)

    const ContainerContent = styled.View`   
    width: 100%;
    `

    const Imagem = styled.Image`
    width: 100%;
    height: 200px;
    `

    const Texto = styled.Text`
    font-size: 15px;
    color: ${theme === "dark" ? dark.color : light.color};
    margin-bottom: 5px;
    `

    return (
        <ContainerContent>
            <Texto>
                {title}
            </Texto>
            <Imagem source={{ uri: image || 'https://www.petz.com.br/blog/wp-content/uploads/2022/06/animais-selvagens-3.jpg' }} />
        </ContainerContent>
    )
}

export default Content