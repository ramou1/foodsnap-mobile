import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

interface VideoPlayerProps {
  source: AVPlaybackSource;
  style?: any;
  onPress?: () => void;
  shouldPlay?: boolean;
  showControls?: boolean;
}

export default function VideoPlayer({ 
  source, 
  style, 
  onPress, 
  shouldPlay = true,
  showControls = false
}: VideoPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = React.useState<AVPlaybackStatus | null>(null);
  const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isPlaying, setIsPlaying] = useState(shouldPlay);
  const [showControlsOverlay, setShowControlsOverlay] = useState(false);

  useEffect(() => {
    if (shouldPlay && videoRef.current) {
      videoRef.current.playAsync();
    }
  }, [shouldPlay]);

  const handlePlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    setStatus(playbackStatus);
    
    if (playbackStatus.isLoaded) {
      setIsPlaying(playbackStatus.isPlaying);
      
      // Se o vídeo terminou, reinicia automaticamente apenas se não tiver controles
      if (playbackStatus.didJustFinish && !showControls) {
        videoRef.current?.replayAsync();
      }
    }
  };

  const handleLoad = (data: any) => {
    if (data.naturalSize) {
      setVideoDimensions({
        width: data.naturalSize.width,
        height: data.naturalSize.height
      });
    }
  };

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
  };

  const handleVideoPress = () => {
    if (showControls) {
      setShowControlsOverlay(!showControlsOverlay);
    }
    if (onPress) {
      onPress();
    }
  };

  // Calcular altura dinâmica baseada na proporção do vídeo
  const getDynamicHeight = () => {
    if (!videoDimensions || !style?.width) return style?.height || 200;
    
    const containerWidth = typeof style.width === 'number' ? style.width : 200;
    const aspectRatio = videoDimensions.width / videoDimensions.height;
    return containerWidth / aspectRatio;
  };

  const dynamicStyle = {
    ...style,
    height: getDynamicHeight(),
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (!status?.isLoaded || !status.durationMillis) return 0;
    return status.positionMillis / status.durationMillis;
  };

  return (
    <TouchableOpacity 
      style={dynamicStyle} 
      onPress={handleVideoPress}
      activeOpacity={0.9}
    >
      <Video
        ref={videoRef}
        source={source}
        style={dynamicStyle}
        resizeMode={ResizeMode.COVER}
        shouldPlay={shouldPlay}
        isLooping={!showControls}
        isMuted={true}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onLoad={handleLoad}
      />
      
      {/* Indicador de vídeo (sempre visível) */}
      <View 
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: 12,
          padding: 4,
        }}
      >
        <Ionicons name="play" size={12} color="white" />
      </View>

      {/* Controles de player (visíveis apenas quando showControls=true) */}
      {showControls && showControlsOverlay && (
        <View 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: 16,
          }}
        >
          {/* Barra de progresso */}
          <View 
            style={{
              height: 3,
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: 2,
              marginBottom: 12,
            }}
          >
            <View 
              style={{
                height: '100%',
                backgroundColor: '#FF6B6B',
                borderRadius: 2,
                width: `${getProgress() * 100}%`,
              }}
            />
          </View>

          {/* Controles de play/pause e tempo */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={togglePlayPause}>
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 12, marginRight: 8 }}>
                {status?.isLoaded ? formatTime(status.positionMillis || 0) : '0:00'}
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
                {status?.isLoaded && status.durationMillis ? formatTime(status.durationMillis) : '0:00'}
              </Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
} 