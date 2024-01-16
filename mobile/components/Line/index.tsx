import { Dimensions, View } from "react-native";

export default function Line() {
    return (
        <View style={{ height: 1, width: Dimensions.get('screen').width, backgroundColor: 'white' }} />
    )
}