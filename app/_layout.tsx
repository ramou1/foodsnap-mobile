import React from 'react';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import "../global.css";

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          headerTitle: 'FoodSnap',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/create-post')}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="camera" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="posts/[id]"
        options={{
          headerTitle: 'Detalhes da Publicação',
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="create-post"
        options={{
          headerTitle: 'Nova Publicação',
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}