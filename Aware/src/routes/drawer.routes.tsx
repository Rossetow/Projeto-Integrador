import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackRoutes } from "./stack.routes";
import { MaterialIcons } from "@expo/vector-icons";
import Profile from "../view/Profile";
import Home from "../view/Home";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { dark, light } from "../constants/theme";

const Drawer = createDrawerNavigator();

export const DrawerRoutes = () => {
    const { theme } = useContext(ThemeContext)
    return(
        <Drawer.Navigator
        screenOptions={{
            headerTitle: "",
            drawerStyle: {
                backgroundColor: theme==="dark" ? dark.background : light.background,
            },
            drawerLabelStyle: {
                color: theme==="dark" ? dark.color : light.color
            },
            headerStyle: {
              backgroundColor: "#03045e",
            },
            headerTintColor: "#fff",
          }}>
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
