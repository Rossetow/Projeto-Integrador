import { NavigationContainer } from "@react-navigation/native"
import { StackRoutes } from "./stack.routes"
import { useContext, useEffect } from "react";
import { Post } from "../types/Post";
import { PostContext } from "../Contexts/PostContext";
import { DrawerRoutes } from "./drawer.routes"
import { UserContext } from "../Contexts/UserContect";
import { User } from "../types/User";
import axios from "axios";
import { dbExport as db, createDatabase } from "../db";

const Routes = () => {
  let idPost: number = 0;


  createDatabase()

  db.transaction((tx)=>{
    tx.executeSql(`
      INSERT INTO Users (name, email, password, date_of_birth, state, avatar) VALUES (?, ?, ?, ?, ?, ?);
    `, ["admin", "admin@admin","admin", "00/00/0000", "XX", "https://source.unsplash.com/random"]
  )
  })

  db.transaction((tx)=> {
    tx.executeSql(`
      SELECT * FROM Users;
    `, [],
  (_, { rows: { _array }})=> {
    console.log(_array);
  })
  })

  //Provisory posts

  const dataPost: Post[] = [
    {
      idPost: (++idPost).toString(),
      username: 'Exemplo1',
      title: `Titulo1`,
      avatar: 'https://source.unsplash.com/random',
      image: `https://source.unsplash.com/random`,
      likes: 157,
      comments: [],

    }, {
      idPost: (++idPost).toString(),
      username: 'Exemplo2',
      title: `Titulo2`,
      avatar: `https://source.unsplash.com/random`,
      image: `https://source.unsplash.com/random`,
      likes: 6,
      comments: [],

    },
    {
      idPost: (++idPost).toString(),
      username: 'Exemplo3',
      title: `Titulo3`,
      avatar: 'https://source.unsplash.com/random',
      image: `https://source.unsplash.com/random`,
      likes: 1,
      comments: [],
    },
    {
      idPost: (++idPost).toString(),
      username: 'Exemplo4',
      title: `Titulo4`,
      avatar: 'https://source.unsplash.com/random',
      image: `https://source.unsplash.com/random`,
      likes: 5,
      comments: [],
    }
  ]

  const { setPost, posts } = useContext(PostContext)
  dataPost.forEach(post => {
    setPost(post)
  });

  const test = async() => {
    try {
      const urlUser = `https://localhost:3000/user/thairon@gmail.com`

      const response = await axios.get(urlUser);
      console.log(response.data)
    } catch (err) {
      console.log("err:", err)
    }
}
  

useEffect(()=> {
  
})

  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )
}

export default Routes