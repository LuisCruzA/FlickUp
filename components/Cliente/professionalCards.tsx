import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface FlashcardProps {
  nombre: string;
  categoria: string;
  descripcion: string;
  hourly_rate: string;
  availability_status: string;
  location: string;
  rating: string;
  profileImage: string;       // URL de la foto
  onApply: () => void;        // callback al presionar el botón
}

const Flashcard: React.FC<FlashcardProps> = ({
  nombre,
  categoria,
  descripcion,
  hourly_rate,
  availability_status,
  location,
  rating,
  profileImage,
  onApply,
}) => {
  return (
    <View className="m-4 rounded-2xl bg-white p-5 shadow-md">
      {/* Header con foto y nombre */}
      <View className="flex-row items-center mb-3">
        <Image
          source={{ uri: profileImage }}
          className="w-16 h-16 rounded-full mr-4"
        />
        <Text className="text-black-800 text-xl font-bold">{nombre}</Text>
      </View>

      {/* Especialidad y tarifa */}
      <View className="mb-2 flex-row justify-between">
        <Text className="text-base font-semibold text-blue-600">
          Especialidad: {categoria}
        </Text>
        <Text className="text-base font-semibold text-green-600">
          {hourly_rate}
        </Text>
      </View>

      {/* Descripción */}
      <Text className="text-black-500 mt-1 text-sm">
        {descripcion}
      </Text>

      {/* Estado, ubicación y rating */}
      <View className="mt-2">
        <Text
          className={`text-right text-sm ${
            availability_status === 'Disponible'
              ? 'text-green-500'
              : 'text-red-500'
          }`}>
          {availability_status}
        </Text>
        <Text className="text-right text-sm text-gray-500">
          Ubicación: {location}
        </Text>
        <View className="my-3 flex-row items-center justify-end">
          <FontAwesome name="star" size={20} color="gold" />
          <Text className="ml-2 leading-relaxed text-black-1000">
            {rating}
          </Text>
        </View>
      </View>

      {/* Botón Aplicar */}
      <TouchableOpacity
        onPress={onApply}
        activeOpacity={0.7}
        className="mt-4 rounded-xl bg-blue-500 py-3 items-center">
        <Text className="text-white font-semibold">Contratar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Flashcard;
