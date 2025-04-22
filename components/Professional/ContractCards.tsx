import React from 'react';
import { View, Text } from 'react-native';

interface FlashcardProps {
  titulo: string;
  contratoPersona: string;
  descripcion: string;
  fecha: string;
}



const Flashcard: React.FC<FlashcardProps> = ({
  titulo,
  contratoPersona,
  descripcion,
  fecha,
}) => {
  return (
    <View className="bg-white p-5 rounded-2xl shadow-md m-4">
      <Text className="text-xl font-bold text-blue-600">{titulo}</Text>
      <Text className="text-sm text-gray-500 mt-1">Contratado por {contratoPersona}</Text>

      <View className="flex flex-row justify-between mt-3 mb-2">
        <Text className="text-base font-bold text-black-600">{descripcion}</Text>
      </View>
      <Text className="text-base  text-black-600">{fecha}</Text>


    </View>
  );
};

export default Flashcard;
