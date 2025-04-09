import { Tabs, router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image, View, TouchableOpacity } from 'react-native';

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
            
            <TouchableOpacity onPress={() => router.push('/profile')}>
              <Image
                source={require('../../assets/images/default-avatar.png')}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: '#E0E0E0'
                }}
              />
            </TouchableOpacity>
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
        name="camera"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <View style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: '#222222',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <FontAwesome5 name="camera" size={size} color="#FFFFFF" />
            </View>
          ),
          tabBarItemStyle: {
            height: 62
          }
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            
            // adicionar a lógica de abrir a câmera/galeria no futuro
            console.log('Botão da câmera pressionado');
          },
        })}
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
    </Tabs>
  );
}