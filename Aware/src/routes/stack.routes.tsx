import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../view/Login"
import Home from "../view/Home"
import { StackParamList } from "../types/Navigation"
import SignUp from "../view/SignUp"

const Stack = createNativeStackNavigator<StackParamList>()

export const StackRoutes = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Login"
            component={Login}
            />


            <Stack.Screen
            name="Home"
            component = {Home}
            />

            <Stack.Screen
            name="SignUp"
            component={SignUp}
            />
            
        </Stack.Navigator>
    )
}