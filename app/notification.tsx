import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";



export default function Notification() {
    const params = useLocalSearchParams()
  return (
    <View>
      <Text>Notification</Text>
      <Text>Title: {params.title}</Text>
      <Text>Body: {params.body}</Text>
    </View>
  );
}