import { useContext } from "react"
import { PostContext } from "../Contexts/PostContext"
import { FlatList, Pressable, SafeAreaView } from "react-native"
import PostEditando from "./PostEditando"
import Post from "../components/Post"

const EditarPost = ({navigation}:any) => {

const { posts } = useContext(PostContext)

    return(
        <SafeAreaView>
      

      <FlatList
        data={ posts }
        renderItem={({ item }) => (
          <Pressable
          onPress={() => navigation.navigate("PostEditando", item)}>
            <Post
              post={item}
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.idPost}
      />

    </SafeAreaView>
    )
}

export default EditarPost