# FoodSnap Mobile

Este é o repositório do aplicativo mobile FoodSnap, desenvolvido com React Native v0.76.8, Expo v~52.0.42 e Native Wind. Essa aplicação permitirá aos usuários postar fotos apenas de comidas afim de explorar novos sabores, conhecer novos pratos e compartilhar experiências gastronômicas.

## Estrutura do Projeto

- **`app/`**: Contém os componentes principais e as telas do aplicativo.
  - **`index.tsx`**: Ponto de entrada que redireciona para a tela de login.
  - **`login.tsx`**: Tela de login com formulário de autenticação.
  - **`_layout.tsx`**: Configuração das rotas principais utilizando `expo-router`.
  - **`(tabs)/`**: Diretório contendo as telas acessíveis através da navegação por abas.
    - **`_layout.tsx`**: Configuração das rotas de navegação por abas.
    - **`home.tsx`**: Tela principal exibindo o feed de postagens.
    - **`profile.tsx`**: Tela de perfil do usuário.
    - **`settings.tsx`**: Tela de configurações do aplicativo.
    - **`trend.tsx`**: Tela exibindo as tendências atuais.

## Dependências Principais

- **`expo`**: Framework para desenvolvimento de aplicações React Native.
- **`expo-router`**: Gerenciador de rotas para aplicações Expo.
- **`react-native`**: Biblioteca principal para desenvolvimento móvel com React.
- **`@expo/vector-icons`**: Conjunto de ícones vetoriais para uso no aplicativo.
- **`react-native-reanimated`**: Biblioteca para animações fluidas e performáticas.
- **`react-native-screens`**: Gerenciamento eficiente de telas e navegação.

## Como Executar o Projeto

1. **Instale as dependências**: Execute `npm install` para instalar todas as dependências necessárias.

2. **Inicie o servidor de desenvolvimento**: Utilize `npm start` para iniciar o servidor.

3. **Execute no dispositivo ou emulador**:
   - Para Android: Execute `npm run android`.
   - Para iOS: Execute `npm run ios`.
   - Para Web: Execute `npm run web`.