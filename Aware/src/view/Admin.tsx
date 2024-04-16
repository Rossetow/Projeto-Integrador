import { useContext } from "react"
import { FlatList, View } from "react-native"

const Admin = () => {

    const { getUsers } = useContext(UserContext)

    return (
        <View> 
            <FlatList

                data={}
            
            />

        </View>
    )
}