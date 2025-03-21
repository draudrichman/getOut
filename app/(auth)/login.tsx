import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { useSSO } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function Login() {
    const { startSSOFlow } = useSSO();
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy: 'oauth_google' });
            if (setActive && createdSessionId) {
                setActive({ session: createdSessionId });
                router.replace('/(tabs)');
            }

        } catch (error) {
            console.log("OAuth Error", error);
        }
    }

    const handleAppleSignIn = async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy: 'oauth_apple' });
            if (setActive && createdSessionId) {
                setActive({ session: createdSessionId });
                router.replace('/(tabs)');
            }
        } catch (error) {
            console.log("OAuth Error", error);
        }
    }

    return (
        <View style={styles.container}>

            {/* Brand Section */}
            <View style={styles.brandSection}>
                <View style={styles.logoContainer}>
                    <Ionicons name="aperture" size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.appName}>GetOut</Text>
                <Text style={styles.tagline}>Less Swipe, More Life</Text>
            </View>

            {/* Illustration */}
            <View style={styles.illustrationContainer}>
                <Image
                    source={require('@/assets/images/auth-bg.png')}
                    style={styles.illustration}
                    resizeMode='cover'
                />
            </View>

            {/* Login Section */}
            <View style={styles.loginSection}>
                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleSignIn}
                    activeOpacity={0.9}
                >
                    <View style={styles.googleIconContainer}>
                        <Ionicons name="logo-google" size={20} color={COLORS.surface} />
                    </View>
                    <Text style={styles.googleButtonText}>
                        Continue with Google
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.appleButton}
                    onPress={handleAppleSignIn}
                    activeOpacity={0.9}
                >
                    <View style={styles.appleIconContainer}>
                        <Ionicons name="logo-apple" size={20} color={COLORS.surface} />
                    </View>
                    <Text style={styles.appleButtonText}>
                        Continue with Apple
                    </Text>
                </TouchableOpacity>
                <Text style={styles.termsText}>
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </Text>
            </View>

        </View>
    )
}