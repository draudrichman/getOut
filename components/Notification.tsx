import { COLORS } from '@/constants/theme';
import { styles } from '@/styles/notifications.styles';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { Id } from '@/convex/_generated/dataModel';

interface NotificationProps {
    notification: {
        _id: Id<"notifications">;
        _creationTime: number;
        type: "follow" | "like" | "comment";
        sender: {
            _id: Id<"users">;
            username: string;
            image?: string;
        };
        post?: {
            _id: Id<"posts">;
            imageUrl: string;
        } | null;
        comment?: string;
    };
}

export default function Notification({ notification }: NotificationProps) {
    return (
        <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
                <Link href={`/notifications`} asChild>
                    <TouchableOpacity style={styles.avatarContainer}>
                        <Image
                            source={notification.sender.image}
                            style={styles.avatar}
                            contentFit="cover"
                            transition={200}
                        />
                        <View style={styles.iconBadge}>
                            {notification.type === "like" ? (
                                <Ionicons name="heart" size={14} color={COLORS.primary} />
                            ) : notification.type === "follow" ? (
                                <Ionicons name="person-add" size={14} color={"#8B5Cf6"} />
                            ) : (
                                <Ionicons name="chatbox" size={14} color={"#3B82F6"} />
                            )}
                        </View>
                    </TouchableOpacity>
                </Link>

                <View style={styles.notificationInfo}>
                    <Link href={`/notifications`} asChild>
                        <TouchableOpacity>
                            <Text style={styles.username}>
                                {notification.sender.username}
                            </Text>
                        </TouchableOpacity>
                    </Link>

                    <Text style={styles.action}>
                        {notification.type === "like" ? "liked your post" :
                            notification.type === "follow" ? "started following you" :
                                `commented: ${notification.comment}`}
                    </Text>
                    <Text style={styles.timeAgo}>
                        {formatDistanceToNow(notification._creationTime, { addSuffix: true })}
                    </Text>
                </View>
            </View>

            {notification.post && (
                <Link href={`/notifications`} asChild>
                    <TouchableOpacity>
                        <Image
                            source={notification.post.imageUrl}
                            style={styles.postImage}
                            contentFit="cover"
                            transition={200}
                        />
                    </TouchableOpacity>
                </Link>
            )}
        </View>
    )
}
