import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes/Index';
import { PostContext, PostContextProvider } from './src/Contexts/PostContext';
import { useContext, useEffect } from 'react';
import { Post } from './src/types/Post';
import { UserContextProvider } from './src/Contexts/UserContect';
import { ThemeContextProvider } from './src/Contexts/ThemeContext';
import axios from 'axios';
import { UserDB } from './src/types/User';
import { startDB } from './src/db';

export default function App() {

  useEffect(()=>{
    startDB()
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