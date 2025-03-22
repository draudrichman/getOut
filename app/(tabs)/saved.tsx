import Loader from '@/components/Loader';
import { COLORS } from '@/constants/theme';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/feed.styles';
import { useQuery } from 'convex/react';
import { Image } from 'expo-image';
import { View, Text, ScrollView } from 'react-native'


export default function Saved() {
  const savedPosts = useQuery(api.saved.getSavedPosts);

  if (savedPosts === undefined) return <Loader />
  if (savedPosts?.length === 0) return <NoSavedPostsFound />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 8,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {savedPosts.map((post) => {
          if (!post) return null;
          return (
            <View key={post._id} style={{ width: "33.33%", padding: 1 }}>
              <Image
                source={post.imageUrl}
                style={{ width: "100%", aspectRatio: 1 }}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
              />
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

function NoSavedPostsFound() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <Text style={{ fontSize: 20, color: COLORS.white }}>
          No saved posts yet
        </Text>
      </View>
    </View>
  )
}
