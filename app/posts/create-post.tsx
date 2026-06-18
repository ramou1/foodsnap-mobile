import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { POSTS } from "@/mocks/posts";
import { Post } from "@/types/post";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { useTranslation } from "@/hooks/useTranslation";

export default function CreatePostScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(t("common.ok"), t("createPost.permissionDenied"));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!image) {
      Alert.alert(t("common.ok"), t("createPost.selectImage"));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newPost: Partial<Post> = {
        id: (POSTS.length + 1).toString(),
        caption,
        image: { uri: image },
      };
      void newPost;
      setLoading(false);
      Alert.alert(t("createPost.published"), t("createPost.publishedMsg"), [
        { text: t("common.ok"), onPress: () => router.back() },
      ]);
    }, 1200);
  };

  return (
    <View className="flex-1 bg-surface">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t("createPost.title"),
          headerTitleStyle: { fontFamily: "Rubik-Bold", color: "#1A1A2E" },
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="ml-2 w-10 h-10 rounded-full bg-background items-center justify-center">
              <Ionicons name="close" size={22} color="#1A1A2E" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView className="flex-1 px-5 py-4" showsVerticalScrollIndicator={false}>
        {image ? (
          <View className="mb-4 relative rounded-2xl overflow-hidden">
            <Image source={{ uri: image }} className="h-72 w-full" resizeMode="cover" />
            <TouchableOpacity
              className="absolute top-3 right-3 bg-black/50 rounded-full p-2.5"
              onPress={() => setImage(null)}
            >
              <Ionicons name="trash-outline" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={pickImage}
            className="bg-background border-2 border-dashed border-border h-72 rounded-2xl mb-4 justify-center items-center"
            activeOpacity={0.8}
          >
            <View className="w-16 h-16 rounded-full bg-brand/10 items-center justify-center mb-3">
              <Ionicons name="image-outline" size={32} color="#6e11b0" />
            </View>
            <Text className="text-text-muted font-rubik">{t("createPost.tapToSelect")}</Text>
            <Text className="text-text-muted font-rubik text-sm mt-1">{t("createPost.fromGallery")}</Text>
          </TouchableOpacity>
        )}

        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            className="flex-1 bg-background border border-border py-3.5 rounded-2xl flex-row justify-center items-center"
            onPress={pickImage}
          >
            <Ionicons name="images-outline" size={20} color="#6e11b0" />
            <Text className="ml-2 font-rubik-medium text-brand">{t("createPost.gallery")}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-background border border-border py-3.5 rounded-2xl flex-row justify-center items-center opacity-50">
            <Ionicons name="camera-outline" size={20} color="#6B7280" />
            <Text className="ml-2 font-rubik-medium text-text-muted">{t("createPost.camera")}</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-sm font-rubik-medium text-text-muted dark:text-gray-400 mb-2">{t("createPost.description")}</Text>
          <TextInput
            className="bg-background dark:bg-[#0F0F1A] border border-border dark:border-[#2D2D44] rounded-2xl p-4 text-base text-text dark:text-white font-rubik min-h-[100px]"
            placeholder={t("createPost.descriptionPlaceholder")}
            value={caption}
            onChangeText={setCaption}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#9C96AD"
            maxLength={200}
          />
        </View>

        <FormInput label={t("createPost.location")} value={location} onChangeText={setLocation} placeholder={t("createPost.locationPlaceholder")} />
        <FormInput label={t("createPost.tags")} value={tags} onChangeText={setTags} placeholder={t("createPost.tagsPlaceholder")} />

        <Button label={t("createPost.publish")} onPress={handlePost} disabled={!image} loading={loading} className="mt-4 mb-8" />
      </ScrollView>
    </View>
  );
}
