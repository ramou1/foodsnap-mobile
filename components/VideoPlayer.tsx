import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ImageSourcePropType } from "react-native";
import { useVideoPlayer, VideoView, VideoSource } from "expo-video";
import { Ionicons } from "@expo/vector-icons";

interface VideoPlayerProps {
  source: ImageSourcePropType | VideoSource;
  style?: { width?: number | string; height?: number };
  onPress?: () => void;
  shouldPlay?: boolean;
  showControls?: boolean;
}

function toVideoSource(source: ImageSourcePropType | VideoSource): VideoSource {
  if (typeof source === "number") return source;
  if (typeof source === "object" && source !== null) {
    if ("uri" in source && source.uri) return { uri: source.uri };
    return source as VideoSource;
  }
  return source as VideoSource;
}

export default function VideoPlayer({
  source,
  style,
  onPress,
  shouldPlay = true,
  showControls = false,
}: VideoPlayerProps) {
  const videoSource = toVideoSource(source);
  const [showControlsOverlay, setShowControlsOverlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(shouldPlay);

  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = !showControls;
    p.muted = true;
    if (shouldPlay) p.play();
  });

  useEffect(() => {
    if (shouldPlay) player.play();
    else player.pause();
    setIsPlaying(shouldPlay);
  }, [shouldPlay, player]);

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  const handleVideoPress = () => {
    if (showControls) setShowControlsOverlay((v) => !v);
    onPress?.();
  };

  const containerStyle = {
    width: style?.width ?? "100%",
    height: style?.height ?? 200,
    overflow: "hidden" as const,
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={handleVideoPress} activeOpacity={0.9}>
      <VideoView
        player={player}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        nativeControls={false}
        allowsFullscreen={false}
      />

      <View className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
        <Ionicons name="play" size={12} color="white" />
      </View>

      {showControls && showControlsOverlay && (
        <View className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
          <TouchableOpacity onPress={togglePlayPause}>
            <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}
