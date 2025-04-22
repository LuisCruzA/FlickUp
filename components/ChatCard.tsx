import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface ChatCardProps {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
}

const ChatCard = ({id, name, message, time, avatar, onPress }: ChatCardProps & { onPress?: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center border-b border-gray-100 px-4 py-3">
      <View className="relative mr-4">
        <Image source={{ uri: avatar }} className="h-12 w-12 rounded-full" />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-black">{name}</Text>
        <Text className="text-xs text-gray-500" numberOfLines={1}>
          {message}
        </Text>
      </View>
      <Text className="ml-2 text-xs text-gray-400">{time}</Text>
    </TouchableOpacity>
  );
};

export default ChatCard;
