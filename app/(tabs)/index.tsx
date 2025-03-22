import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Linking from 'expo-linking'
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { styles } from "@/styles/feed.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { STORIES } from "@/constants/mock-data";
import Story from "@/components/Story";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loader from "@/components/Loader";
import Post from "@/components/Post";

export default function Index() {
  const { signOut } = useAuth();

  const posts = useQuery(api.posts.getFeedPosts);

  if (posts === undefined) {
    return (
      <Loader />
    );
  }

  if (posts.length === 0) {
    return (
      <NoPostsFound />
    );
  }


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>getOut</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* Stories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesContainer}
        >
          {STORIES.map((story) => (
            <Story key={story.id} story={story} />
          ))}
        </ScrollView>

        {/* Posts */}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}

      </ScrollView>
    </View>
  );
}


const NoPostsFound = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: COLORS.primary, fontSize: 20 }}>No posts yet</Text>
    </View>
  );
};
