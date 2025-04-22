import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { View, Text } from 'react-native';

interface FlashcardProps {
  nombre: string;
  categoria: string;
  descripcion: string;
  hourly_rate: string;
  availability_status: string;
  location: string;
  rating: string;
}

const Flashcard: React.FC<FlashcardProps> = ({
  nombre,
  categoria,
  descripcion,
  hourly_rate,
  availability_status,
  location,
  rating,
}) => {
  return (
    <View className="m-4 rounded-2xl bg-white p-5 shadow-md">
      <Text className="text-black-800 text-xl font-bold">{nombre}</Text>
      <View className="mb-2 mt-3 flex flex-row justify-between">
        <Text className="text-base font-semibold text-blue-600">Especialidad: {categoria}</Text>
        <Text className="text-base font-semibold text-green-600">{hourly_rate}</Text>
      </View>

      <Text className="text-black-500 mt-1 text-sm">{descripcion}</Text>

      <View>
        <Text
          className={`text-right text-sm ${availability_status === 'Disponible' ? 'text-green-500' : 'text-red-500'}`}>
          {availability_status}
        </Text>
        <Text className="text-right text-sm text-gray-500">Ubicacion: {location}</Text>
        <Text className="text-right text-sm text-gray-500">{}</Text>
      </View>
      <View className=" my-3 flex-row  bg-white px-4 py-2">
        <FontAwesome name="star" size={20} color="gold" />
        <Text className="ml-2 leading-relaxed text-black-1000">{rating}</Text>
      </View>
    </View>
  );
};

export default Flashcard;
