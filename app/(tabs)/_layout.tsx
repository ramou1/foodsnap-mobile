import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6e11b0', 
        tabBarInactiveTintColor: '#6b7280',
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
              <FontAwesome5 name="bell" size={24} color="#6e11b0" />
            </TouchableOpacity>
          </View>
        ),
      }}>

      <Tabs.Screen
        name="feed"
        options={{
          title: 'feed',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trend"
        options={{
          title: 'trends',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="fire" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
