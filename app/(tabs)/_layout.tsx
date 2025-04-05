import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image, View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6347',
        tabBarInactiveTintColor: '#888888',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          textTransform: 'lowercase',
        },
        tabBarStyle: {
          height: 62,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          marginTop: 5,
        },
        headerShadowVisible: false,
        headerTitle: '',
        //headerStyle: {         
        //  backgroundColor: '#FF453F',        
        //}
        headerLeft: () => (
          <View style={{ marginLeft: 16 }}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: 120, height: 32, resizeMode: 'contain' }}
            />
          </View>
        ),
      }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="trend"
        options={{
          title: 'Discover',
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}