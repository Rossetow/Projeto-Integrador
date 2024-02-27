import { View, Text } from "react-native"
import styled from "styled-components";
import StyleSheet from "styled-components/dist/sheet/Sheet"
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { FC } from "react";
import { Post as PostData }  from "../types/Post";



interface Props {
    post: PostData
}

const Post : FC<Props> = ({
    post
}) => {
    return(
        <View>
            <View>
                <Text>entrou</Text>
            <Header
                avatar={post.avatar!}
                username={post.username!}
                />

                <Content
                title={post.title!}
                image={post.image!}
                />

                <Footer
                post={post}
                />
            </View>
        </View>
    )
}


export default Post