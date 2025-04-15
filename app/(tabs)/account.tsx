import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';

export default function AccountScreen() {
  const [avatar] = React.useState(require('../../assets/images/default-avatar.png'));

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        {/* Avatar e botão de config */}
        <View className="items-center justify-center py-8 bg-white mb-4 relative">
          <Image
            source={avatar}
            className="w-32 h-32 rounded-full border-2 border-gray-200"
            style={{
                width: 150,
                height: 150,
              }}
          />
          <TouchableOpacity
            className="absolute top-4 right-4 bg-gray-800 p-2 rounded-full"
            onPress={() => router.push('/settings')}
          >
            <FontAwesome5 name="cog" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View className="bg-white rounded-lg mx-4 p-4 mb-4">
          <Text className="text-gray-500 mb-1">Nome</Text>
          <Text className="text-lg font-medium mb-4">Fulano de Tal</Text>
          <Text className="text-gray-500 mb-1">Bio</Text>
          <Text className="text-base">Amante da boa comida 🍝🍣🍕</Text>
        </View>
      </ScrollView>
    </View>
  );
}
