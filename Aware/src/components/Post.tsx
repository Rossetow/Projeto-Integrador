import { View, Text, StyleSheet } from "react-native"
import styled from "styled-components";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { FC } from "react";
import { Post as PostData }  from "../types/Post";
    
interface Props {
    post: PostData,
}

const Post : FC<Props> = ({
    post
}) => {
    return(
        <View>
            <View>
            <Header
                avatar={post.avatar!}
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

const styles = StyleSheet.create({
    post:{
        margin: 20,
        backgroundColor: "#000",
        color: "#fff"
    }
}) 