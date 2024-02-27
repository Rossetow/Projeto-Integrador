import { useContext } from "react"
import { FlatList, Text, View } from "react-native"
import { PostContext } from "../Contexts/PostContext"
import Post from "../components/Post"

const Home = ({ navigation }: any) => {
  const { posts } = useContext(PostContext)
  return (
    <View>
      <Text>Hello</Text>
      <FlatList
        data={ posts }
        renderItem={({ item }) => (
          <Post
            post={item}
          />
        )}
        keyExtractor={(item) => item.idPost}
      />
    </View>
  )
}

export default Home