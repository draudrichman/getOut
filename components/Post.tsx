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
import CommentsModal from './CommentsModal';
import { formatDistanceToNow } from 'date-fns';

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
    const [commentCount, setCommentCount] = useState(post.comments);
    const [showComments, setShowComments] = useState(false);
    const [isSaved, setIsSaved] = useState(post.isSaved);

    const toggleLike = useMutation(api.posts.toggleLike);
    const toggleSaved = useMutation(api.saved.toggleSaved);

    const handleLike = async () => {
        try {
            const newIsLiked = await toggleLike({ postId: post._id });
            setIsLiked(newIsLiked);
            setLikesCount((prev) => (newIsLiked ? prev + 1 : prev - 1));
        } catch (error) {
            console.error("Error toggling like", error);
        }
    }

    const handleSave = async () => {
        try {
            const newIsSaved = await toggleSaved({ postId: post._id });
            setIsSaved(newIsSaved);
        } catch (error) {
            console.error("Error toggling save", error);
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

                    <TouchableOpacity onPress={() => setShowComments(true)}>
                        <Ionicons name="chatbubble-outline" size={22} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleSave}>
                    <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={22} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            {/* Post Info */}
            <View style={styles.postInfo}>
                <Text style={styles.likesText}>
                    {likesCount === 0 ? "No likes yet" : likesCount === 1 ? "1 like" : `${likesCount.toLocaleString()} likes`}
                </Text>
                {post.caption && (
                    <View style={styles.captionContainer}>
                        <Text style={styles.captionUsername}>{post.author.username}</Text>
                        <Text style={styles.captionText}>{post.caption}</Text>
                    </View>
                )}

                {commentCount > 0 && (
                    <TouchableOpacity onPress={() => setShowComments(true)}>
                        <Text style={styles.commentsText}>View all {post.comments} comments</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.timeAgo}>
                    {formatDistanceToNow(post._creationTime, { addSuffix: true })}
                </Text>
            </View>

            <CommentsModal
                postId={post._id}
                visible={showComments}
                onClose={() => setShowComments(false)}
                onCommentAdded={() => {
                    setCommentCount((prev) => prev + 1);
                }}
            />
        </View>
    )
}