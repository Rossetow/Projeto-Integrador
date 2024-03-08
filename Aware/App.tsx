import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes/Index';
import { PostContext, PostContextProvider } from './src/Contexts/PostContext';
import { useContext } from 'react';
import { Post } from './src/types/Post';
import { UserContextProvider } from './src/Contexts/UserContect';
import { ThemeContextProvider } from './src/Contexts/ThemeContext';

export default function App() {

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