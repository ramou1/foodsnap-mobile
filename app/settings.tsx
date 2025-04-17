import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { router } from "expo-router";

export default function SettingsScreen() {
  const [avatar] = useState(require("../assets/images/default-avatar.png"));

  // Estados para os campos do formulário
  const [name, setName] = useState("Fulano de Tal");
  const [username, setUsername] = useState("foodlover_123");
  const [bio, setBio] = useState("Amante da boa comida 🍝🍣🍕");
  const [gender, setGender] = useState("Masculino");
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("(55) 98123-4567");

  // Função para lidar com o envio do formulário
  const handleSave = () => {
    // Aqui você implementaria a lógica de salvamento dos dados
    Alert.alert("Sucesso", "Informações salvas com sucesso!");
  };

  // Função para fazer logout
  const handleLogout = () => {
    Alert.alert("Logout", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sim, sair",
        onPress: () => router.push("/(auth)/login"),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <View className="items-center justify-center py-8 bg-white mb-4">
          <View className="relative">
            <Image
              source={avatar}
              className="w-32 h-32 rounded-full border-2 border-gray-200"
              style={{
                width: 150,
                height: 150,
              }}
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full">
              <FontAwesome5 name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white rounded-lg mx-4 p-4 mb-4">
          {/* Campo Nome */}
          <Text className="text-gray-500 mb-1">Nome</Text>
          <TextInput
            className="text-lg font-medium mb-4 border-2 border-gray-100 rounded-md p-2"
            value={name}
            onChangeText={setName}
            placeholder="Seu nome completo"
          />

          {/* Campo Usuário */}
          <Text className="text-gray-500 mb-1">Usuário</Text>
          <TextInput
            className="text-lg font-medium mb-4 border-2 border-gray-100 rounded-md p-2"
            value={username}
            onChangeText={setUsername}
            placeholder="Seu nome de usuário"
            autoCapitalize="none"
          />

          {/* Campo Bio */}
          <Text className="text-gray-500 mb-1">Bio</Text>
          <TextInput
            className="text-lg font-medium mb-4 border-2 border-gray-100 rounded-md p-2"
            value={bio}
            onChangeText={setBio}
            placeholder="Conte algo sobre você"
            multiline
            numberOfLines={3}
          />

          {/* Campo Email  */}
          <Text className="text-gray-500 mb-1">Email</Text>
          <TextInput
            className="text-lg font-medium mb-4 border-2 border-gray-100 rounded-md p-2"
            value={email}
            onChangeText={setEmail}
            placeholder="Seu email"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Campo Telefone */}
          <Text className="text-gray-500 mb-1">Telefone</Text>
          <TextInput
            className="text-lg font-medium mb-4 border-2 border-gray-100 rounded-md p-2"
            value={phone}
            onChangeText={setPhone}
            placeholder="Seu telefone"
            autoCapitalize="none"
            keyboardType="phone-pad"
          />
        </View>

        <View className="mt-4 mx-4 mb-8">
          <TouchableOpacity
            className="bg-orange-500 py-3 rounded-lg items-center mb-3"
            onPress={handleSave}
          >
            <Text className="text-white font-medium text-lg">update</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-500 py-3 rounded-lg items-center"
            onPress={handleLogout}
          >
            <Text className="text-white font-medium text-lg">logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
