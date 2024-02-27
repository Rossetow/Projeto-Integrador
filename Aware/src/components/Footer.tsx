import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { PostData } from '../../App';
import { FC, useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

interface Props {
    post: PostData
}

const ContainerFooter = styled.View`
margin-top: 20px;
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-around;
`

const ContainerAcao = styled.Pressable`
display: flex;
flex-direction: row;
align-items: center;
`

const Footer: FC<Props> = ({ post }) => {
    const [, setForceRender] = useState(false);


    // function like(postId: string) {
    //     const postFind = post.find((item) => item.idPost === postId)
    //     if (postFind) {
    //         postFind.likes! ++
    //         setForceRender(prev => !prev)
    //     }
    // }

    return (
        <ContainerFooter>
            <ContainerAcao>
                <FontAwesome style={{ marginRight: 5 }} name="comment" size={22} color="#CBCCFF" />
                <Text>{post.comments}</Text>
            </ContainerAcao>
            <ContainerAcao>
                <Entypo style={{ marginRight: 5 }} name="retweet" size={22} color="#CBCCFF" />
                <Text>{post.retweet}</Text>
            </ContainerAcao>
            {/* <ContainerAcao onPress={() => like(post.idPost)}>
                <AntDesign style={{ marginRight: 5 }} name="heart" size={24} color="#CBCCFF" />
                <Text>{post.likes}</Text>
            </ContainerAcao> */}
        </ContainerFooter>
    )
}

export default Footer