import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.grey,
                tabBarStyle: {
                    backgroundColor: COLORS.background,
                    borderTopWidth: 0,
                    position: 'absolute',
                    elevation: 0,
                    height: 40,
                    paddingBottom: 8,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="bookmark-outline" size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name="create"
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="add-circle" size={size} color={COLORS.primary} />
                    )
                }}
            />

            <Tabs.Screen
                name="notifications"
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="heart-outline" size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="person-circle-outline" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}