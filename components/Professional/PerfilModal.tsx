// PerfilModal.tsx
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

interface PerfilModalProps {
  visible: boolean;
  onClose: () => void;
  score: number | null;
}

const PerfilModal = ({ visible, onClose, score }: PerfilModalProps) => (
  <Modal transparent={false} visible={visible} animationType="slide" onRequestClose={onClose}>
    <View className="flex-1 bg-white px-4 pt-12">
      {/* Header */}
      <View className="mb-2 flex-row items-center bg-white">
        <TouchableOpacity onPress={onClose} className="z-10">
          <AntDesign name="arrowleft" size={28} color="black" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold">Crédito estimado</Text>
        </View>
      </View>

      {/* Contenido: mostramos el score */}
      <View className="flex-1 justify-center items-center">
        {score === null ? (
          <Text className="text-lg">Cargando...</Text>
        ) : (
          <Text className="text-3xl font-bold text-green-600">
            {score?.toFixed(2) ?? 'Cargando...'}
          </Text>
        )}
        <Text className="mt-4 text-center text-gray-700">
          {score === null
            ? 'Por favor espera'
            : 'Este es tu score de crédito'}
        </Text>
        {score !== null && score >= 650? (
          <Text className="mt-4 text-center text-gray-700">
            ¡Felicidades, tienes acceso a un crédito!
          </Text>
        ) : (
          <Text className="mt-4 text-center text-gray-700">
            Lo sentimos, por el momento no podemos ofrecerte ningún credito
          </Text>
        )}
      </View>
    </View>
  </Modal>
);

export default PerfilModal;
