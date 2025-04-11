import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import "../global.css";

export default function RootLayout() {
  const router = useRouter();
  
  const [fontsLoaded] = useFonts({
    'Rubik': require('../assets/fonts/Rubik/Rubik-Regular.ttf'),
    'Rubik-Medium': require('../assets/fonts/Rubik/Rubik-Medium.ttf'),
    'Rubik-Bold': require('../assets/fonts/Rubik/Rubik-Bold.ttf'),
    // Adicione outras variantes conforme necessário
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          headerTitle: 'FoodSnap',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Rubik-Bold',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/posts/create-post')}
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
          headerTitle: 'detalhes da publicação',
          presentation: 'card',
          animation: 'slide_from_right',
          headerTitleStyle: {
            fontFamily: 'Rubik-Medium',
          },
        }}
      />
      <Stack.Screen
        name="create-post"
        options={{
          headerTitle: 'nova publicação',
          presentation: 'modal',
          animation: 'slide_from_bottom',
          headerTitleStyle: {
            fontFamily: 'Rubik-Medium',
          },
        }}
      />
    </Stack>
  );
}