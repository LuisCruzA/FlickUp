import React from 'react';
import { View, Text } from 'react-native';

const SkillCard = ({name}: {name: string}) => {
  return (
    <View className="flex-row flex-wrap gap-2">
      <View className="rounded-full bg-gray-200 px-3 py-1">
        <Text className="text-sm">{name}</Text>
      </View>
    </View>
  );
};

export default SkillCard;
