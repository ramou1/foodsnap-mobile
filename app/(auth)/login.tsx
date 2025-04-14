import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-6 bg-white">
      {/* <Image source={require('../assets/icon.png')} className="w-24 h-24 mb-8" /> */}
      <Text className="text-3xl font-bold text-blue-600 mb-8">Bem-vindo</Text>
      
      <View className="w-full space-y-4">
        <View className="w-full">
          <TextInput 
            placeholder="E-mail" 
            className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-50 text-base"
            keyboardType="email-address"
          />
        </View>
        
        <View className="w-full">
          <TextInput 
            placeholder="Senha" 
            className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-50 text-base"
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity 
          onPress={() => router.replace('/(tabs)/feed')}
          className="w-full h-12 bg-blue-500 rounded-lg flex items-center justify-center mt-4"
        >
          <Text className="text-white font-bold text-lg">Entrar</Text>
        </TouchableOpacity>
      </View>
      
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600 text-base">Não tem uma conta? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text className="text-blue-500 font-bold text-base">Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}