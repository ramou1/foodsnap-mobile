import { Tabs } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        backgroundColor="#fff" // Cor de fundo da status bar (Android)
        barStyle="dark-content"   // Estilo dos elementos da status bar (iOS e Android) - opções: 'dark-content', 'light-content'
        translucent={false}       // Se true, permite que a status bar seja sobreposta pelo conteúdo (Android)
      />
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#c',
          tabBarInactiveTintColor: '#9c96ad',
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 60,
            elevation: 0,       // Remove shadow on Android
            shadowOpacity: 0,   // Remove shadow on iOS
            borderTopWidth: 0.5,
            borderTopColor: '#e5e7eb',
          },
          tabBarLabelStyle: {
            fontSize: 11,
            paddingBottom: 4,
          },
          tabBarItemStyle: {
            marginTop: 5,
          },
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerStyle: {
            height: 0, 
          },
          headerStatusBarHeight: 30, 
          headerShadowVisible: false,
          
        }}>
        <Tabs.Screen
          name="feed"
          options={{
            title: 'feed',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="home" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="trend"
          options={{
            title: 'trends',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="fire" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: '',
            tabBarIcon: () => (
              <View style={{
                backgroundColor: '#6e11b0',
                borderRadius: 30,
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 25,
              }}>
                <Ionicons name="add" size={32} color="#fff" />
              </View>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              router.push('/posts/create-post');
            },
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'chat',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="comment-dots" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'profile',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" size={22} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}