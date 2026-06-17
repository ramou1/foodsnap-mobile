import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock data for testing
import { USER } from "@/mocks/user";
import { RESTAURANTS } from "@/mocks/restaurants";
import { Restaurant } from "@/types/restaurant";
import { User } from "@/types/user";

// Define types for search items and history
interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Location {
  id: string;
  name: string;
  region: string;
  type: "location";
}

type SearchItem =
  | Location
  | (Restaurant & { type: "restaurant" })
  | (User & { type: "user" });

interface HistoryItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
  type: "restaurant" | "user" | "location";
}

const SEARCH_HISTORY_KEY = "foodsnap_search_history";

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "locations" | "restaurants" | "users"
  >("locations");
  const [searchHistory, setSearchHistory] = useState<HistoryItem[]>([]);
  const [searchResults, setSearchResults] = useState<{
    locations: Location[];
    restaurants: (Restaurant & { type: "restaurant" })[];
    users: (User & { type: "user" })[];
  }>({
    locations: [],
    restaurants: [],
    users: [],
  });

  // Screen dimensions for responsive UI
  const screenWidth = Dimensions.get("window").width;
  const imageSize = screenWidth / 4 - 12;

  // Load search history on component mount
  useEffect(() => {
    loadSearchHistory();
  }, []);

  // Load search history from AsyncStorage
  const loadSearchHistory = async () => {
    try {
      const historyData = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
      if (historyData) {
        setSearchHistory(JSON.parse(historyData));
      }
    } catch (error) {
      console.error("Error loading search history:", error);
    }
  };

  // Save search history to AsyncStorage
  const saveSearchHistory = async (item: SearchItem) => {
    try {
      // Only save users and restaurants to history
      if (item.type !== "location") {
        // Create new history item
        const newHistoryItem: HistoryItem = {
          id: item.id || "",
          name: item.username,
          image:
            "avatar" in item
              ? item.avatar
              : "image" in item
              ? item.image
              : require("@/assets/images/default-avatar.png"),
          type: item.type,
        };

        // Filter out the same item if it exists
        const filteredHistory = searchHistory.filter(
          (h) => !(h.id === item.id && h.type === item.type)
        );

        // Add new item to the beginning and keep only 5 most recent
        const newHistory = [newHistoryItem, ...filteredHistory].slice(0, 5);

        setSearchHistory(newHistory);
        await AsyncStorage.setItem(
          SEARCH_HISTORY_KEY,
          JSON.stringify(newHistory)
        );
      }
    } catch (error) {
      console.error("Error saving search history:", error);
    }
  };

  // Handle search
  useEffect(() => {
    if (searchText.length > 0) {
      // In a real app, these would be API calls
      // Mock search functionality
      const locationsResults = searchLocations(searchText);
      const restaurantsResults = searchRestaurants(searchText);
      const usersResults = searchUsers(searchText);

      setSearchResults({
        locations: locationsResults,
        restaurants: restaurantsResults,
        users: usersResults,
      });
    } else {
      setSearchResults({
        locations: [],
        restaurants: [],
        users: [],
      });
    }
  }, [searchText]);

  // Mock search functions
  const searchLocations = (query: string): Location[] => {
    const mockLocations: Location[] = [
      {
        id: "loc1",
        name: "New York City",
        region: "NY, USA",
        type: "location",
      },
      { id: "loc2", name: "Los Angeles", region: "CA, USA", type: "location" },
      { id: "loc3", name: "Miami", region: "FL, USA", type: "location" },
      { id: "loc4", name: "Paris", region: "France", type: "location" },
      { id: "loc5", name: "Tokyo", region: "Japan", type: "location" },
    ];

    return mockLocations.filter((loc) =>
      loc.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const searchRestaurants = (
    query: string
  ): (Restaurant & { type: "restaurant" })[] => {
    return RESTAURANTS.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query.toLowerCase())
    ).map((restaurant) => ({ ...restaurant, type: "restaurant" as const }));
  };

  const searchUsers = (query: string): (User & { type: "user" })[] => {
    // In real app this would search all users
    const mockUsers = [
      USER,
      { ...USER, id: "user2", username: "foodie_chef", name: "Chef Mike" },
    ];
    return mockUsers
      .filter(
        (user) =>
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.name?.toLowerCase().includes(query.toLowerCase())
      )
      .map((user) => ({ ...user, type: "user" as const }));
  };

  // Navigate to profile screens
  const handleItemPress = (item: SearchItem | HistoryItem) => {
    if ("type" in item) {
      saveSearchHistory(item as SearchItem);

      if (item.type === "user") {
        router.push({
          pathname: "/users/[id]",
          params: { id: item.id },
        });
        onClose();
      } else if (item.type === "restaurant") {
        router.push({
          pathname: "/restaurants/[id]",
          params: { id: item.id },
        });
        onClose();
      }
    }
    // No navigation for locations yet
  };

  // Render restaurant post thumbnail
  const renderPostThumbnail = (post: any) => {
    return (
      <Image
        source={post.image}
        style={{
          width: imageSize,
          height: imageSize,
          borderRadius: 4,
          marginRight: 4,
        }}
      />
    );
  };

  // Type guard for determining item type
  const isRestaurantOrUser = (
    item: SearchItem
  ): item is
    | (Restaurant & { type: "restaurant" })
    | (User & { type: "user" }) => {
    return item.type === "restaurant" || item.type === "user";
  };

  // Render search result item
  const renderSearchItem = ({ item }: { item: SearchItem }) => {
    if (item.type === "location") {
      return (
        <TouchableOpacity
          className="flex-row items-center py-3 px-4 border-b border-gray-200"
          onPress={() => handleItemPress(item)}
        >
          <View className="bg-gray-200 rounded-full p-2 mr-3">
            <FontAwesome5 name="map-marker-alt" size={16} color="#666" />
          </View>
          <View>
            <Text className="font-medium">{item.name}</Text>
            <Text className="text-sm text-gray-500">{item.region}</Text>
          </View>
        </TouchableOpacity>
      );
    } else if (isRestaurantOrUser(item)) {
      // Sample posts to display - make sure to check if postsList exists
      const samplePosts =
        "postsList" in item && item.postsList ? item.postsList.slice(0, 3) : [];

      return (
        <TouchableOpacity
          className="flex-row py-3 px-4 border-b border-gray-200"
          onPress={() => handleItemPress(item)}
        >
          <Image
            source={item.avatar}
            className="rounded-full"
            style={{ width: 40, height: 40 }}
          />
          <View className="flex-1 ml-3">
            <Text className="font-medium">{item.username}</Text>
            <Text className="text-sm text-gray-500 mb-2">
              {item.type === "restaurant" ? "Restaurant" : "User"}
            </Text>

            {samplePosts.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {samplePosts.map((post: any, index: any) => (
                  <View key={post.id || index}>
                    {renderPostThumbnail(post)}
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  // Render search history item
  const renderHistoryItem = ({ item }: { item: HistoryItem }) => {
    return (
      <TouchableOpacity
        className="flex-row items-center py-3 px-4 border-b border-gray-200"
        onPress={() => handleItemPress(item)}
      >
        <Image
          source={item.image}
          className="rounded-full"
          style={{ width: 40, height: 40 }}
        />
        <View className="flex-1 ml-3">
          <Text className="font-medium">{item.name}</Text>
          <Text className="text-sm text-gray-500">
            {item.type === "restaurant" ? "Restaurant" : "User"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            const newHistory = searchHistory.filter((h) => h.id !== item.id);
            setSearchHistory(newHistory);
            AsyncStorage.setItem(
              SEARCH_HISTORY_KEY,
              JSON.stringify(newHistory)
            );
          }}
          className="p-2"
        >
          <FontAwesome name="times" size={16} color="#666" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
          <TouchableOpacity onPress={onClose} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-md px-3 py-2">
            <Ionicons name="search" size={18} color="gray" className="mr-2" />
            <TextInput
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
              className="flex-1 ml-2"
              autoFocus
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Ionicons name="close-circle" size={18} color="gray" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Tabs de pesquisa*/}
        <View className="flex-row border-b border-gray-200">
          <TouchableOpacity
            className={`flex-1 py-3 ${
              activeTab === "locations" ? "border-b-2 border-black" : ""
            }`}
            onPress={() => setActiveTab("locations")}
          >
            <Text
              className={`text-center ${
                activeTab === "locations" ? "font-bold" : ""
              }`}
            >
              locations
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 ${
              activeTab === "restaurants" ? "border-b-2 border-black" : ""
            }`}
            onPress={() => setActiveTab("restaurants")}
          >
            <Text
              className={`text-center ${
                activeTab === "restaurants" ? "font-bold" : ""
              }`}
            >
              restaurants
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 ${
              activeTab === "users" ? "border-b-2 border-black" : ""
            }`}
            onPress={() => setActiveTab("users")}
          >
            <Text
              className={`text-center ${
                activeTab === "users" ? "font-bold" : ""
              }`}
            >
              users
            </Text>
          </TouchableOpacity>
        </View>

        {/* Results */}
        {searchText.length > 0 ? (
          <FlatList
            data={searchResults[activeTab]}
            renderItem={renderSearchItem}
            keyExtractor={(item) => `${item.type}-${item.id}`}
            ListEmptyComponent={
              <View className="p-4 items-center justify-center">
                <Text className="text-gray-500">no results found :(</Text>
              </View>
            }
          />
        ) : (
          <>
            {/* Recent searches */}
            <View className="px-4 py-3">
              <Text className="font-bold text-lg">recent searches</Text>
            </View>
            <FlatList
              data={searchHistory}
              renderItem={renderHistoryItem}
              keyExtractor={(item) => `history-${item.type}-${item.id}`}
              ListEmptyComponent={
                <View className="p-4 items-center justify-center">
                  <Text className="text-gray-500">no recent searches :(</Text>
                </View>
              }
            />
          </>
        )}
      </View>
    </Modal>
  );
};

export default SearchModal;
