import { NavigationContainer } from "@react-navigation/native"
import { StackRoutes } from "./stack.routes"
import { useContext, useEffect } from "react";
import { Post } from "../types/Post";
import { PostContext } from "../Contexts/PostContext";
import { UserContext } from "../Contexts/UserContext";

const Routes = () => {
  let idPost: number = 0;

  const { arrayUsers } = useContext(UserContext)
  const { arrayPosts } = useContext(PostContext)

  useEffect(()=>{
    arrayUsers()
    arrayPosts()
  }, [])

  

  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )
}

export default Routes