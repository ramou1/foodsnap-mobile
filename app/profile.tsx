import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [avatar] = React.useState(require('../assets/images/default-avatar.png'));

  return (
    <View className="flex-1 bg-gray-100">

      <ScrollView className="flex-1">
        {/* Avatar Section */}
        <View className="items-center justify-center py-8 bg-white mb-4">
          <View className="relative ">
            <Image
              source={avatar}
              className="w-32 h-32 rounded-full border-2 border-gray-200"
              style={{
                width: 150,
                height: 150,
              }}
            />
            <TouchableOpacity 
              className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full"
            >
              <FontAwesome5 name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info */}
        <View className="bg-white rounded-lg mx-4 p-4 mb-4">
          <Text className="text-gray-500 mb-1">nome</Text>
          <Text className="text-lg font-medium mb-4">Fulano de Tal</Text>
          
          <Text className="text-gray-500 mb-1">email</Text>
          <Text className="text-lg font-medium mb-4">user@example.com</Text>
          
          <Text className="text-gray-500 mb-1">telefone</Text>
          <Text className="text-lg font-medium">(55) 98123-4567</Text>
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-between bg-white rounded-lg mx-4 p-4 mb-4">
          <View className="items-center">
            <Text className="text-2xl font-bold">42</Text>
            <Text className="text-gray-500">Posts</Text>
          </View>
          
          <View className="items-center">
            <Text className="text-2xl font-bold">156</Text>
            <Text className="text-gray-500">Followers</Text>
          </View>
          
          <View className="items-center">
            <Text className="text-2xl font-bold">98</Text>
            <Text className="text-gray-500">Following</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-4 mx-4 mb-8">
          <TouchableOpacity className="bg-orange-500 py-3 rounded-lg items-center mb-3">
            <Text className="text-white font-medium text-lg">Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-gray-200 py-3 rounded-lg items-center">
            <Text className="text-gray-800 font-medium text-lg">Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-red-500 py-3 rounded-lg items-center mt-3" onPress={() => router.push('/(auth)/login')}>
            <Text className="text-white font-medium text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}