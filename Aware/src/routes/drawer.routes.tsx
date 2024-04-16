import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackRoutes } from "./stack.routes";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Profile from "../view/Profile";
import Home from "../view/Home";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { dark, light } from "../constants/theme";
import { BackHandler, View } from "react-native";

const Drawer = createDrawerNavigator();

export const DrawerRoutes = () => {
const MenuIcon = (nav: any) => {
    return (
        <View style={{marginLeft: 20}}>
            <FontAwesome5  name="bars" onPress={nav.toggleDrawer} size={25} color={theme==="dark" ? dark.color : light.color} />
        </View>
    )
}


    const { theme } = useContext(ThemeContext)
    return(
        <Drawer.Navigator
        screenOptions={({ navigation }) => ({
        //     headerTitle: "",
        //     drawerStyle: {
        //         backgroundColor: theme==="dark" ? dark.background : light.background,
        //     },
        //     drawerLabelStyle: {
        //         color: theme==="dark" ? dark.color : light.color
        //     },
        //     headerLeft: () => (
        //        MenuIcon(navigation)
        //         ),
           
        //     headerStyle: {
        //       backgroundColor: theme==="dark" ? light.color : dark.color,
            
        //     },
        //     headerTintColor: theme==="dark" ? dark.color : light.color,
        //   
    })}>
            <Drawer.Screen
            name="Initial"
            component={Home}
            options={{
                drawerIcon: () => (
                    <MaterialIcons name="home" size={30} color={theme==="dark" ? dark.color : light.color} />
                )
            }}
            />
            <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
                drawerIcon: () => (
                    <MaterialIcons name="person" size={30} color={theme==="dark" ? dark.color : light.color} />
                )
            }}
            />
        </Drawer.Navigator>
    )
}
