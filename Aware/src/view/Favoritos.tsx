import { useContext, useEffect, useState } from "react"
import { FlatList, SafeAreaView, Text, StyleSheet, Switch, Pressable } from "react-native"
import { UserContext } from "../Contexts/UserContext"
import Post from "../components/Post"

const Favoritos = ({navigation}: any) => {

  const { user } = useContext(UserContext)

  

    return (
        <SafeAreaView>
      

      <FlatList
        data={ user?.favorites }
        renderItem={({ item }) => (
          <Pressable
          onPress={() => navigation.navigate("Post", item)}>
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

export default Favoritos;