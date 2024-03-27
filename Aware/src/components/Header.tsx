import React, { FC, useContext } from "react";
import { View, Image } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { ThemeContext } from "../Contexts/ThemeContext";
import {dark, light} from "../constants/theme" 


const ContainerHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  margin: 0px 0px 0px 0px; /* Possibilidade de separar os post, dando melhor visão para tudo */
`;

const UserHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;




interface Props {
    avatar: string | null;
    username: string | null;
}

const Header: FC<Props> = ({avatar, username}) => {
  const { theme } = useContext(ThemeContext)
  const TextoFormatado = styled.Text`
  padding-left: 5px; 
  font-weight: bold; 
  font-size:15px;
  color: ${theme == "dark" ? light.background : dark.background};
`;


    return(
        <ContainerHeader>
            <UserHeader>
                <Image style={{height: 50, width:50,borderRadius:100}} source={{uri: avatar || 'https://www.petz.com.br/blog/wp-content/uploads/2022/06/animais-selvagens-3.jpg'}}/>
                <TextoFormatado>{username || `Unknown`}</TextoFormatado>
            </UserHeader>
            <View style={{justifyContent: "center"}}>
                <SimpleLineIcons name="user-follow" size={25} color={theme === "dark" ? dark.color : light.color}/>
            </View>
        </ContainerHeader>
    )
}

export default Header