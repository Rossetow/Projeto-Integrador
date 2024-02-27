import { FC } from "react";
import { Text, View, Image } from "react-native";
import styled from "styled-components/native";

interface Props {
    title: string|null;
    image: string|null;
}

const ContainerContent = styled.View`   
width: 100%;
`

const Imagem = styled.Image`
width: 100%;
height: 200px;
`

const Texto = styled.Text`
font-size: 15px;
color: white;
margin-bottom: 5px;
`

const Content: FC<Props> = ({title, image}) => {
    return(
        <ContainerContent>
            <Texto>
                {title}
            </Texto>
            <Imagem source={{uri: image||'https://www.petz.com.br/blog/wp-content/uploads/2022/06/animais-selvagens-3.jpg'}}/>
        </ContainerContent>
    )
}

export default Content