import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import * as Linking from 'expo-linking'
import { useClerk } from "@clerk/clerk-expo";

export default function Index() {
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await signOut()
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {

      console.error(JSON.stringify(err, null, 2))
    }
  }
  return (
    <View className="flex-1 items-center justify-center">
      <Link href="/notifications">Notifications</Link>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
