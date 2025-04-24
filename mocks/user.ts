import { User } from "@/types/post";

export const USER: User = {
    id: 'i3j21',
    username: 'maria_cozinha',
    name: 'Maria Cozinha',
    bio: 'Amo cozinhar e compartilhar receitas deliciosas! 🍝🍣🍕',
    avatar: require('../assets/images/default-avatar.png'),
    posts: 6,
    followers: 230,
    following: 200,
    isFollowing: false,
    isMe: true,
    postsList: [
        {
            id: '1',
            image: require('../assets/images/food01.jpg'),
            isFavorite: true,
            user: {
                id: 'i3j21',
                username: 'maria_cozinha',
                avatar: require('../assets/images/default-avatar.png'),
            },
            timestamp: '2025-04-09T14:30:00',
            likes: 124,
            comments: 18,
            description: 'Filé a milanesa com risoto.',
        },
        {
            id: '2',
            image: require('../assets/images/food02.jpg'),
            isFavorite: false,
            user: {
                id: '73j22',
                username: 'health_food',
                avatar: require('../assets/images/default-avatar.png'),
            },
            timestamp: '2025-04-10T08:15:00',
            likes: 87,
            comments: 9,
            description:
                'ovo mexido torradinha com tomate e café preto',
        },
        {
            id: '3',
            image: require('../assets/images/food03.jpg'),
            isFavorite: false,
            user: {
                id: 'i3j23',
                username: 'chef_carlos',
                avatar: require('../assets/images/default-avatar.png'),
            },
            timestamp: '2025-04-09T20:45:00',
            likes: 210,
            comments: 32,
        },
        {
            id: '4',
            image: require('../assets/images/food04.jpg'),
            isFavorite: true,
            user: {
                id: 'i3j24',
                username: 'fit_meals',
                avatar: require('../assets/images/default-avatar.png'),
            },
            timestamp: '2025-04-08T12:20:00',
            likes: 65,
            comments: 7,
            description:
                'Salada mediterrânea com folhas frescas, tomate cereja, pepino, azeitonas e queijo feta. Perfeito para um almoço leve!',
        },
        {
            id: '5',
            image: require('../assets/images/food05.jpg'),
            isFavorite: false,
            user: {
                id: 'i3j25',
                username: 'vegan_delights',
                avatar: require('../assets/images/default-avatar.png'),
            },
            timestamp: '2025-04-07T18:00:00',
            likes: 95,
            comments: 12,
        },
        {
            id: '6',
            image: require('../assets/images/food06.jpg'),
            isFavorite: true,
            user: {
                id: 'i3j26',
                username: 'sweet_tooth',
                avatar: require('../assets/images/default-avatar.png'),
            },
            timestamp: '2025-04-06T10:30:00',
            likes: 150,
            comments: 20,
        }
    ],
    highlights: [
        {
            id: "1",
            title: "Massas",
            image: require("../assets/images/default-image.jpg"),
        },
        {
            id: "2",
            title: "Doces",
            image: require("../assets/images/default-image.jpg"),
        },
        {
            id: "3",
            title: "Asiática",
            image: require("../assets/images/default-image.jpg"),
        },
        {
            id: "4",
            title: "BBQ",
            image: require("../assets/images/default-image.jpg"),
        },
    ]
};
