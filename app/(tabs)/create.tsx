import React from 'react';
import { View } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function CreateTab() {
  useEffect(() => {
    router.replace('/posts/create-post');
  }, []);

  return <View />;
}