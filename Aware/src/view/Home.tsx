import { useContext, useState } from "react"
import { FlatList, SafeAreaView, Text, StyleSheet, Switch } from "react-native"
import { PostContext } from "../Contexts/PostContext"
import Post from "../components/Post"
import { ThemeContext } from "../Contexts/ThemeContext"
import { dark, light } from "../constants/theme"
import { UserContext } from "../Contexts/UserContect"
import { User } from "../types/User"

const Home = ({ navigation }: any) => {

  
  //Getting contexts
  const { posts } = useContext(PostContext)
  const { theme, setTheme } = useContext(ThemeContext)

  //Setting useStates
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)

    setTheme(isEnabled ? "light" : "dark")

  };

  //Setting color theme
  const styles = StyleSheet.create({
    container: {
      backgroundColor: isEnabled ? dark.background : light.background,
    }
  })

  
  return (
    <SafeAreaView style={styles.container}>
      
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <FlatList
        data={ posts }
        renderItem={({ item }) => (
          <Post
            post={item}
          />
        )}
        keyExtractor={(item) => item.idPost}
      />

    </SafeAreaView>
  )
}

export default Home