import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface FlashcardProps {
  titulo: string;
  inicio: string;
  precio: string;
  statu: string,
    onPress: () => void

}



const Flashcard: React.FC<FlashcardProps> = ({
  titulo,
  inicio,
  statu,
  precio,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6}
    onPress={onPress}>
    <View className="bg-white p-5 rounded-2xl shadow-md m-4">
      <Text className="text-xl font-bold text-blue-600">{titulo}</Text>
      <Text className="text-sm text-gray-500 mt-1"> {inicio}</Text>

      <View className="flex flex-row justify-between mt-3 mb-2">
        <Text className="text-base font-bold text-black-600">Precio: ${precio}</Text>
      </View>
      <Text className={statu.toLowerCase() === 'activo' ? "text-base text-green-600" : "text-base text-red-600"}>
  {statu}
</Text>


    </View>
    </TouchableOpacity>
  );
};

export default Flashcard;