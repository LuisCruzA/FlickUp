import React from 'react';
import { View, Text } from 'react-native';

interface FlashcardProps {
  titulo: string;
  publicadoHace: string;
  precio: string;
  tiempoDisponible: string;
  descripcion: string;
}



const Flashcard: React.FC<FlashcardProps> = ({
  titulo,
  publicadoHace,
  precio,
  tiempoDisponible,
  descripcion,
}) => {
  return (
    <View className="bg-white p-5 rounded-2xl shadow-md m-4">
      <Text className="text-xl font-bold text-black-800">{titulo}</Text>
      <Text className="text-sm text-gray-500 mt-1">Publicado hace: {publicadoHace}</Text>

      <View className="flex flex-row justify-between mt-3 mb-2">
        <Text className="text-base font-semibold text-blue-600">{precio}</Text>
        <Text className="text-base font-semibold text-green-600">{tiempoDisponible}</Text>
      </View>
      <View>
      <Text className= 'text-sm text-gray-500 text-right'>Tiempo disp.</Text>

      </View>

      <Text className="text-gray-700 mt-2 leading-relaxed">{descripcion}</Text>
    </View>
  );
};

export default Flashcard;
