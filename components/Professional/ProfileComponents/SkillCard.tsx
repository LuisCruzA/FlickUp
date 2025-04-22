import React from 'react';
import { View, Text } from 'react-native';

const SkillCard = ({name}: {name: string}) => {
  return (
    <View className="flex-row flex-wrap gap-2">
      <View className="rounded-full   bg-blue-600 px-4 py-2">
        <Text className="text-sm font-bold  text-white">{name}</Text>
      </View>
    </View>
  );
};

export default SkillCard;
