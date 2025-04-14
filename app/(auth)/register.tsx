import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

// Imagens para escolha do avatar
const avatarOptions = [
  { id: "1", uri: require("../../assets/avatars/avatar01.png") },
  { id: "2", uri: require("../../assets/avatars/avatar02.png") },
  { id: "3", uri: require("../../assets/avatars/avatar03.png") },
  { id: "4", uri: require("../../assets/avatars/avatar04.png") },
  { id: "5", uri: require("../../assets/avatars/avatar05.png") },
  { id: "6", uri: require("../../assets/avatars/avatar06.png") },
];

// Opções de comida para a terceira etapa
const foodPreferences = [
  { id: "1", name: "Italiano", selected: false },
  { id: "2", name: "Japonês", selected: false },
  { id: "3", name: "Mexicano", selected: false },
  { id: "4", name: "Vegano", selected: false },
  { id: "5", name: "Fast Food", selected: false },
  { id: "6", name: "Churrasco", selected: false },
  { id: "7", name: "Doces", selected: false },
  { id: "8", name: "Saudável", selected: false },
];

export default function RegisterScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [foodPrefs, setFoodPrefs] = useState(foodPreferences);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Títulos para cada etapa
  const stepTitles = [
    "Escolha um avatar",
    "Como devemos te chamar?",
    "O que você gosta de comer?",
    "Finalize seu cadastro",
  ];

  // Manipulador para alternar a seleção de preferências alimentares
  const toggleFoodPreference = (id: any) => {
    setFoodPrefs(
      foodPrefs.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Função para verificar se o formulário atual está válido para avançar
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedAvatar !== null;
      case 1:
        return name.trim().length > 0;
      case 2:
        return foodPrefs.some((pref) => pref.selected);
      case 3:
        return (
          email.includes("@") &&
          password.length >= 6 &&
          password === confirmPassword
        );
      default:
        return false;
    }
  };

  // Avança para o próximo passo se possível
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      // Finalizar cadastro e ir para a tela principal
      // Aqui você implementaria a lógica de cadastro
      router.replace("/(tabs)/feed");
    }
  };

  // Voltar para o passo anterior ou para o login
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back(); // Volta para a tela de login
    }
  };

  // Componente para renderizar os indicadores de etapa
  const StepIndicator = () => (
    <View className="flex-row justify-center mt-4 mb-8">
      {[0, 1, 2, 3].map((step) => (
        <View
          key={step}
          className={`h-2 w-12 mx-1 rounded-full ${
            step === currentStep ? "bg-blue-500" : "bg-gray-300"
          }`}
        />
      ))}
    </View>
  );

  // Renderização do conteúdo baseado na etapa atual
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View className="flex-1 w-full">
            <Text className="text-lg text-gray-700 mb-4">
              Escolha uma imagem que te represente melhor:
            </Text>
            <FlatList
              data={avatarOptions}
              numColumns={3}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedAvatar(item.id)}
                  className={`p-2 m-2 rounded-lg ${
                    selectedAvatar === item.id
                      ? "bg-blue-100 border-2 border-blue-500"
                      : ""
                  }`}
                >
                  <Image
                    source={item.uri}
                    className="w-24 h-24 rounded-full"
                    style={{
                      width: 80,
                      height: 80,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </View>
        );
      case 1:
        return (
          <View className="flex-1 w-full">
            <Text className="text-lg text-gray-700 mb-4">
              Qual é o seu nome?
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-50 text-base mb-4"
            />
          </View>
        );
      case 2:
        return (
          <View className="flex-1 w-full">
            <Text className="text-lg text-gray-700 mb-4">
              Selecione suas preferências culinárias:
            </Text>
            <FlatList
              data={foodPrefs}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => toggleFoodPreference(item.id)}
                  className={`flex-row items-center p-3 m-2 rounded-lg border ${
                    item.selected
                      ? "bg-blue-100 border-blue-500"
                      : "border-gray-300"
                  }`}
                  style={{ width: "45%" }}
                >
                  <View
                    className={`w-5 h-5 rounded-full border border-blue-500 mr-2 ${
                      item.selected ? "bg-blue-500" : "bg-white"
                    }`}
                  >
                    {item.selected && (
                      <AntDesign
                        name="check"
                        size={16}
                        color="white"
                        style={{ alignSelf: "center" }}
                      />
                    )}
                  </View>
                  <Text className="text-base">{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        );
      case 3:
        return (
          <View className="flex-1 w-full">
            <Text className="text-lg text-gray-700 mb-4">
              Complete seu cadastro com e-mail e senha:
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="E-mail"
              keyboardType="email-address"
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-50 text-base mb-4"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              secureTextEntry
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-50 text-base mb-4"
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirme sua senha"
              secureTextEntry
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-50 text-base mb-4"
            />
            {password !== confirmPassword &&
              password.length > 0 &&
              confirmPassword.length > 0 && (
                <Text className="text-red-500 mb-2">
                  As senhas não coincidem
                </Text>
              )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-start items-center p-6 bg-white">
        {/* Cabeçalho com botão de voltar */}
        <View className="w-full flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={prevStep} className="p-2">
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-blue-600">
            {stepTitles[currentStep]}
          </Text>
          <View style={{ width: 30 }} /> {/* Espaço para balancear o layout */}
        </View>

        {/* Indicador de progresso */}
        <StepIndicator />

        {/* Conteúdo da etapa atual */}
        {renderStepContent()}

        {/* Botão de próximo/finalizar */}
        <View className="w-full mt-6 mb-4">
          <TouchableOpacity
            onPress={nextStep}
            disabled={!canProceed()}
            className={`w-full h-12 rounded-lg flex items-center justify-center ${
              canProceed() ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <Text className="text-white font-bold text-lg">
              {currentStep === 3 ? "Finalizar Cadastro" : "Continuar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
