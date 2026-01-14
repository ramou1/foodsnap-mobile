// mocks/chat.ts

import { ImageSourcePropType } from "react-native";

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface ChatConversation {
  id: string;
  userId: string;
  username: string;
  name: string;
  avatar: ImageSourcePropType;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  messages: ChatMessage[];
}

export const CHAT_CONVERSATIONS: ChatConversation[] = [
  {
    id: "chat1",
    userId: "i3j23",
    username: "chef_carlos",
    name: "Carlos Chef",
    avatar: require("../assets/images/default-avatar.png"),
    lastMessage: "Obrigado pela dica da receita!",
    lastMessageTime: "2h",
    unreadCount: 2,
    messages: [
      {
        id: "msg1",
        text: "Olá! Adorei sua publicação sobre risoto!",
        timestamp: "2025-01-14T10:00:00",
        isMe: false,
      },
      {
        id: "msg2",
        text: "Oi! Fico feliz que tenha gostado! 😊",
        timestamp: "2025-01-14T10:05:00",
        isMe: true,
      },
      {
        id: "msg3",
        text: "Você tem alguma dica especial?",
        timestamp: "2025-01-14T10:06:00",
        isMe: false,
      },
      {
        id: "msg4",
        text: "O segredo está no caldo quente e mexer sempre!",
        timestamp: "2025-01-14T10:10:00",
        isMe: true,
      },
      {
        id: "msg5",
        text: "Obrigado pela dica da receita!",
        timestamp: "2025-01-14T16:00:00",
        isMe: false,
      },
    ],
  },
  {
    id: "chat2",
    userId: "i3j24",
    username: "fit_meals",
    name: "Fit Meals",
    avatar: require("../assets/images/default-avatar.png"),
    lastMessage: "Combinado! Nos vemos lá!",
    lastMessageTime: "5h",
    messages: [
      {
        id: "msg1",
        text: "Oi! Vi que você esteve no restaurante Delicious Bites",
        timestamp: "2025-01-14T08:00:00",
        isMe: false,
      },
      {
        id: "msg2",
        text: "Sim! A comida estava incrível!",
        timestamp: "2025-01-14T08:05:00",
        isMe: true,
      },
      {
        id: "msg3",
        text: "Você recomenda? Estou pensando em ir lá hoje",
        timestamp: "2025-01-14T08:10:00",
        isMe: false,
      },
      {
        id: "msg4",
        text: "Super recomendo! O hambúrguer é perfeito",
        timestamp: "2025-01-14T08:15:00",
        isMe: true,
      },
      {
        id: "msg5",
        text: "Combinado! Nos vemos lá!",
        timestamp: "2025-01-14T13:00:00",
        isMe: false,
      },
    ],
  },
  {
    id: "chat3",
    userId: "user2",
    username: "foodie_chef",
    name: "Chef Mike",
    avatar: require("../assets/images/default-avatar.png"),
    lastMessage: "Vou tentar essa receita hoje mesmo!",
    lastMessageTime: "1d",
    messages: [
      {
        id: "msg1",
        text: "Olá! Parabéns pelo conteúdo!",
        timestamp: "2025-01-13T14:00:00",
        isMe: false,
      },
      {
        id: "msg2",
        text: "Obrigado! 😊",
        timestamp: "2025-01-13T14:05:00",
        isMe: true,
      },
      {
        id: "msg3",
        text: "Sua última receita de massa ficou incrível!",
        timestamp: "2025-01-13T14:10:00",
        isMe: false,
      },
      {
        id: "msg4",
        text: "Que bom que gostou! Fico feliz",
        timestamp: "2025-01-13T14:15:00",
        isMe: true,
      },
      {
        id: "msg5",
        text: "Vou tentar essa receita hoje mesmo!",
        timestamp: "2025-01-13T18:00:00",
        isMe: false,
      },
    ],
  },
  {
    id: "chat4",
    userId: "i3j25",
    username: "sweet_confections",
    name: "Sweet Confections",
    avatar: require("../assets/images/default-avatar.png"),
    lastMessage: "Perfeito! Aguardo o resultado 🍰",
    lastMessageTime: "2d",
    messages: [
      {
        id: "msg1",
        text: "Seus doces são incríveis!",
        timestamp: "2025-01-12T10:00:00",
        isMe: true,
      },
      {
        id: "msg2",
        text: "Obrigada! Que bom que gostou!",
        timestamp: "2025-01-12T10:05:00",
        isMe: false,
      },
      {
        id: "msg3",
        text: "Você poderia compartilhar a receita do bolo?",
        timestamp: "2025-01-12T10:10:00",
        isMe: true,
      },
      {
        id: "msg4",
        text: "Claro! Vou postar hoje mesmo",
        timestamp: "2025-01-12T10:15:00",
        isMe: false,
      },
      {
        id: "msg5",
        text: "Perfeito! Aguardo o resultado 🍰",
        timestamp: "2025-01-12T14:00:00",
        isMe: true,
      },
    ],
  },
];