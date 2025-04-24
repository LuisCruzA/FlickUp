import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface FlashcardProps {
  titulo: string;
  publicadoHace: string;
  precio: string;
  tiempoDisponible: string;
  descripcion: string;
  onPress: () => void
}

const JobCard: React.FC<FlashcardProps> = ({
  titulo,
  publicadoHace,
  precio,
  tiempoDisponible,
  descripcion,
  onPress
}) => {


  return (
    <TouchableOpacity activeOpacity={0.6}
    onPress={onPress}>
      <View className="m-4 rounded-2xl bg-white p-5 shadow-md">
        <Text className="text-black-800 text-xl font-bold">{titulo}</Text>
        <Text className="mt-1 text-sm text-gray-500">Publicado hace: {publicadoHace}</Text>

        <View className="mb-2 mt-3 flex flex-row justify-between">
          <Text className="text-base font-semibold text-blue-600">{precio}</Text>
          <Text className="text-base font-semibold text-green-600">{tiempoDisponible}</Text>
        </View>
        <View>
          <Text className="text-right text-sm text-gray-500">Tiempo disp.</Text>
        </View>

        <Text className="mt-2 leading-relaxed text-gray-700">{descripcion}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;
