import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1e40af', // azul
        tabBarInactiveTintColor: '#6b7280', // cinza
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#e5e7eb',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 4,
        }, 
        tabBarItemStyle: {
          marginTop: 5,
        },
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => (
          <View style={{ marginLeft: 16 }}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: 120, height: 32, resizeMode: 'contain' }}
            />
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
            <TouchableOpacity style={{ marginRight: 16 }}>
              <FontAwesome5 name="bell" size={24} color="#FF6347" />
            </TouchableOpacity>
          </View>
        ),
      }}>

      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trend"
        options={{
          title: 'Trend',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="fire" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Postar',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
