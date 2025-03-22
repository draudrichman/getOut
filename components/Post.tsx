import { styles } from '@/styles/feed.styles';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { Id } from '@/convex/_generated/dataModel';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface PostProps {
    _id: Id<"posts">;
    imageUrl: string;
    caption?: string;
    likes: number;
    comments: number;
    _creationTime: number;
    isLiked: boolean;
    isSaved: boolean;
    author: {
        _id: string;
        username: string;
        image?: string;
    };
}

export default function Post({ post }: { post: PostProps }) {

    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likesCount, setLikesCount] = useState(post.likes);

    const toggleLike = useMutation(api.posts.toggleLike);

    const handleLike = async () => {
        try {
            const newIsLiked = await toggleLike({ postId: post._id });
            setIsLiked(newIsLiked);
            setLikesCount((prev) => (newIsLiked ? prev + 1 : prev - 1));
        } catch (error) {
            console.error("Error toggling like", error);
        }
    }

    return (
        <View style={styles.post}>
            {/* Post Header */}
            <View style={styles.postHeader}>
                <Link href={"/(tabs)/profile"}>
                    <TouchableOpacity style={styles.postHeaderLeft}>
                        <Image
                            source={post.author.image}
                            style={styles.postAvatar}
                            contentFit="cover"
                            transition={200}
                            cachePolicy="memory-disk"
                        />
                        <Text style={styles.postUsername}>{post.author.username}</Text>
                    </TouchableOpacity>
                </Link>

                {/* <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={20} color={COLORS.white} />
                </TouchableOpacity> */}

                <TouchableOpacity>
                    <Ionicons name="trash-outline" size={20} color={"hotpink"} />
                </TouchableOpacity>
            </View>

            {/* Post Image */}
            <Image
                source={post.imageUrl}
                style={styles.postImage}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
            />

            {/* Post Actions */}
            <View style={styles.postActions}>
                <View style={styles.postActionsLeft}>
                    <TouchableOpacity onPress={handleLike}>
                        <Ionicons
                            name={isLiked ? "heart" : "heart-outline"}
                            size={24}
                            color={isLiked ? "hotpink" : COLORS.white}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons name="chatbubble-outline" size={22} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <Ionicons name="bookmark-outline" size={22} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            {/* Post Info */}
            <View style={styles.postInfo}>
                <Text style={styles.likesText}>
                    {likesCount > 0 ? `${likesCount.toLocaleString()} likes` : "No likes yet"}
                </Text>
                {post.caption && (
                    <View style={styles.captionContainer}>
                        <Text style={styles.captionUsername}>{post.author.username}</Text>
                        <Text style={styles.captionText}>{post.caption}</Text>
                    </View>
                )}

                <TouchableOpacity>
                    <Text style={styles.commentsText}>View all {post.comments} comments</Text>
                </TouchableOpacity>

                <Text style={styles.timeAgo}>{post._creationTime}</Text>
            </View>
        </View>
    )
}