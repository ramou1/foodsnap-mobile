import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/icon.png')} style={styles.logo} /> */}
      <Text className="text-red-500 text-bold text-3xl mb-4">Bem-vindo</Text>
      <TextInput placeholder="E-mail" style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry />
      <Button title="Entrar" onPress={() => router.replace('/(tabs)/feed')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
