import { SafeAreaView, Text, View, ScrollView} from "react-native";
import { Post as tipoPost } from "../types/Post"
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";
import { PostStackProps } from "../types/Navigation";

const Post = ({ navigation, route }: PostStackProps, post: tipoPost) => {

    const postagem = route.params as tipoPost


    return (
        <View style={{ flex: 1 }} >
            <ScrollView>
                <View>
                    <Header
                        avatar={postagem.avatar!}
                    />

                    <Content
                        title={postagem.title!}
                        image={postagem.image!}
                    />

                    <Footer
                        post={postagem}
                    />
                </View>
                <Text>{postagem.conteudo}</Text>
            </ScrollView>
        </View>
    )
}

export default Post;