import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes/Index';
import { PostContext, PostContextProvider } from './src/Contexts/PostContext';
import { useContext, useEffect } from 'react';
import { Post } from './src/types/Post';
import { UserContextProvider } from './src/Contexts/UserContext';
import { ThemeContextProvider } from './src/Contexts/ThemeContext';
import axios from 'axios';
import { getDatabase, ref, set, get, onValue, child } from "firebase/database";
import { iniciarAsync } from './src/db';

export default function App() {

 
  const teste = async() => {
    iniciarAsync()
    console.log("loop");
  }

  useEffect(() => {
    teste()

  }, [])



  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <PostContextProvider>
          <Routes />
        </PostContextProvider>
      </UserContextProvider>
    </ThemeContextProvider>

  );
}