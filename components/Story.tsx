import { View, Text, TouchableOpacity, Image } from 'react-native'
import { styles } from '@/styles/feed.styles'

interface StoryProps {
    id: string;
    username: string;
    avatar: string;
    hasStory: boolean;
}

export default function Story({ story }: { story: StoryProps }) {
    return (
        <TouchableOpacity style={styles.storyWrapper}>
            <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
                <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
            </View>
            <Text style={styles.storyUsername}>{story.username}</Text>
        </TouchableOpacity>
    )
}