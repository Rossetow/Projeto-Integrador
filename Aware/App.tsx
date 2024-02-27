import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes/Index';
import { PostContext, PostContextProvider } from './src/Contexts/PostContext';
import { useContext } from 'react';
import { Post } from './src/types/Post';
import { UserContextProvider } from './src/Contexts/UserContect';

export interface PostData {
  idPost: string;
  username?: string | null;
  title?: string | null;
  avatar?: string | null;
  image?: string | null;
  likes: number | undefined;
  retweet: number | undefined;
  comments: number | undefined;
}








export default function App() {

  return (
    <UserContextProvider>
      <PostContextProvider>
        <Routes />
      </PostContextProvider>
    </UserContextProvider>

  );
}