import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-6 bg-gray-50">
      <View className="w-full max-w-sm">
        {/* Logo */}
        <View className="items-center mb-8">
          <View className="bg-blue-500 w-24 h-24 rounded-full items-center justify-center mb-4">
            <FontAwesome name="user" size={50} color="white" />
          </View>
          <Text className="text-3xl font-bold text-gray-800">Bem-vindo</Text>
          <Text className="text-gray-500 text-center mt-2">Faça login para continuar</Text>
        </View>
        
        {/* Form */}
        <View className="space-y-4 w-full">
          <View className="bg-white rounded-xl shadow-sm">
            <TextInput 
              placeholder="E-mail" 
              className="h-14 px-4 rounded-xl border border-gray-200"
              keyboardType="email-address"
            />
          </View>
          
          <View className="bg-white rounded-xl shadow-sm">
            <TextInput 
              placeholder="Senha" 
              className="h-14 px-4 rounded-xl border border-gray-200"
              secureTextEntry
            />
          </View>
          
          <TouchableOpacity 
            className="bg-blue-500 h-14 rounded-xl items-center justify-center shadow-md"
            onPress={() => router.replace('/(tabs)/feed')}
          >
            <Text className="text-white font-bold text-lg">Entrar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-4">
            <Text className="text-blue-500">Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
        
        {/* Register option */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Não tem uma conta? </Text>
          <TouchableOpacity>
            <Text className="text-blue-500 font-semibold">Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}