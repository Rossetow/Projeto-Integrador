import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../view/Login"
import { StackParamList } from "../types/Navigation"
import SignUp from "../view/SignUp"
import Profile from "../view/Profile"
import { DrawerRoutes } from "./drawer.routes"
import Post from "../view/Post"
import EditarPost from "../view/EditarPost"
import PostEditando from "../view/PostEditando"

const Stack = createNativeStackNavigator<StackParamList>()

export const StackRoutes = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Login"
            component={Login}
            />

            <Stack.Screen
            name="SignUp"
            component={SignUp}
            />

            <Stack.Screen
            options={{headerShown: false}}
            name="Drawer"
            component = {DrawerRoutes}
            />
            <Stack.Screen
            options={{headerShown: false}}
            name="Profile"
            component = {Profile}
            />

            <Stack.Screen
            name="Post"
            component = {Post}
            />   

            <Stack.Screen
            name="EditarPost"
            component = {EditarPost}
            /> 

            <Stack.Screen
            name="PostEditando"
            component = {PostEditando}
            />          
        </Stack.Navigator>
    )
}