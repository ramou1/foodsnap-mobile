# FoodSnap Mobile

Aplicativo mobile de rede social gastronômica. O FoodSnap permite que usuários compartilhem fotos e vídeos de comidas, descubram tendências culinárias, explorem restaurantes e interajam com outros amantes da boa comida.

> **Status atual:** protótipo funcional com dados mockados. A autenticação, persistência de perfil/posts e integração com backend ainda não estão implementadas. O único dado persistido localmente é o histórico de buscas (via AsyncStorage).

## Stack

| Tecnologia | Versão |
|---|---|
| React Native | 0.81.5 |
| Expo | ~54.0 |
| Expo Router | ~6.0 |
| React | 19.1.0 |
| TypeScript | ~5.9 |
| NativeWind | ^4 |
| Tailwind CSS | ^3.4 |

Outras bibliotecas relevantes: `expo-av` (vídeo), `expo-image-picker` (galeria), `date-fns`, `react-native-reanimated`, `@react-native-async-storage/async-storage`.

A Nova Arquitetura do React Native está habilitada (`newArchEnabled: true`).

## Funcionalidades

### Implementadas

- **Autenticação (UI)** — telas de login e cadastro em 4 etapas (avatar, nome, preferências alimentares, credenciais)
- **Feed** — grade estilo masonry com imagens e vídeos, repost, abas "para você" / "seguindo" e busca de usuários/restaurantes
- **Detalhe do post** — visualização completa com curtidas, repost e comentários
- **Criação de post** — seleção de imagem da galeria com legenda
- **Tendências** — cards de pratos em alta com favoritos
- **Perfil** — bio, destaques (highlights) e grade de publicações
- **Chat** — lista de conversas e chat individual com dados mockados
- **Restaurantes** — perfil de restaurante com publicações e busca
- **Configurações** — edição de perfil (UI) e logout

## Estrutura do Projeto

```
app/
├── index.tsx                 # Redireciona para /(auth)/login
├── _layout.tsx               # Layout raiz (Stack, fontes, NativeWind)
├── settings.tsx              # Configurações do usuário
├── (auth)/
│   ├── login.tsx
│   └── register.tsx          # Cadastro em etapas
├── (tabs)/
│   ├── feed.tsx              # Feed principal
│   ├── trend.tsx             # Tendências culinárias
│   ├── create.tsx            # Redireciona para criação de post
│   ├── chat.tsx              # Lista de conversas
│   └── profile.tsx           # Perfil do usuário
├── posts/
│   ├── [id].tsx              # Detalhe de publicação
│   └── create-post.tsx       # Nova publicação (modal)
├── chat/
│   └── [id].tsx              # Chat individual
├── users/
│   └── [id].tsx              # Perfil de outro usuário
└── restaurants/
    └── [id].tsx              # Perfil de restaurante

components/
├── ui/                       # Componentes de design system (Button, FormInput, etc.)
├── SearchModal.tsx
├── VideoPlayer.tsx
├── UserProfile.tsx
└── RestaurantProfile.tsx

types/                        # Post, User, Restaurant, Location
mocks/                        # Dados estáticos para desenvolvimento
hooks/                        # useCustomFonts
constants/                    # Tema e cores
assets/                       # Imagens, vídeos, fontes e avatares
```

A navegação é gerenciada pelo [Expo Router](https://docs.expo.dev/router/introduction/) com rotas tipadas (`experiments.typedRoutes`).

## Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (incluído via `npx expo`)
- Para iOS: macOS com Xcode
- Para Android: Android Studio com emulador configurado

## Como Executar

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start

# Executar em plataforma específica
npm run android   # Android
npm run ios       # iOS
npm run web       # Web
```

Ao abrir o app, o fluxo inicia na tela de login. Use qualquer credencial para avançar — a validação é apenas visual.

## Como Testar

### No navegador (mais rápido)

```bash
npm run web
```

Abra **http://localhost:8081** no navegador.

Funciona bem para navegar pelas telas e validar o layout, mas **câmera, galeria e alguns gestos nativos não funcionam no browser**.

### No celular (recomendado)

Para testar a experiência real do app, use o **[Expo Go](https://expo.dev/go)** — app gratuito disponível na App Store (iOS) e Play Store (Android).

1. Certifique-se de que o celular e o computador estão na **mesma rede Wi-Fi**
2. No projeto, execute:
   ```bash
   npm start
   ```
3. Abra o **Expo Go** no celular
4. Escaneie o **QR code** exibido no terminal

**Alternativa:** no terminal do Expo, pressione `i` para abrir no simulador iOS ou `a` para o emulador Android (requer Xcode ou Android Studio instalado).

### Comparação dos métodos

| Método | Precisa instalar? | Melhor para |
|---|---|---|
| Navegador (`npm run web`) | Não | Ver layout e navegação rapidamente |
| Expo Go no celular | Sim (app gratuito) | Testar como app real (galeria, gestos, scroll) |
| Simulador iOS / Android | Xcode / Android Studio | Desenvolvimento sem celular físico |

Para uma rede social de fotos e vídeos de comida, o **Expo Go no celular** é a melhor opção. O navegador serve para validar o visual com mais agilidade.

## Testes

```bash
npm test
```

Utiliza Jest com o preset `jest-expo`.

## Dados e Backend

O app consome dados locais definidos em `mocks/` (`posts.ts`, `user.ts`, `restaurants.ts`, `trends.ts`, `locations.ts`, `chat.ts`). Não há variáveis de ambiente nem chamadas a API externa neste momento.

| Dado | Mecanismo |
|---|---|
| Histórico de buscas | `AsyncStorage` |
| Posts, perfil, sessão | Apenas em memória / mocks |

## Estilização

O projeto usa [NativeWind](https://www.nativewind.dev/) v4 (Tailwind CSS para React Native). A fonte padrão é a família **Rubik**, carregada em `hooks/useCustomFonts.ts`.

**Cores principais:**

| Token | Valor | Uso |
|---|---|---|
| `brand` | `#6e11b0` | Cor principal, botões, tab ativa |
| `accent` | `#FF6B35` | Destaques gastronômicos |
| `like` | `#FF4D67` | Curtidas |
| `background` | `#F8F7FA` | Fundo das telas |

Componentes reutilizáveis do design system ficam em `components/ui/`.
