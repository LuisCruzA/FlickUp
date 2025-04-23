import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface Contrato {
  id: string;
  titulo: string;
  contratoPersona: string;
  descripcion: string;
  fecha: string;
}

interface ContratoScreenProps {
  visible: boolean;
  contrato: Contrato;
  onClose: () => void;
}

const ContractScreen: React.FC<ContratoScreenProps> = ({ visible, contrato, onClose }) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white pt-10">
        {/* Encabezado */}
        <View className="flex-row items-center  px-4 pb-2">
          <TouchableOpacity onPress={onClose}>
            <View className="items-center mt-10 justify-center bg-white p-2">
              <AntDesign name="arrowleft" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View className="flex-1 mt-10 items-center -ml-6">
            <Text className="text-lg font-bold text-gray-800">Detalles del Contrato</Text>
          </View>
        </View>

        {/* Contenido */}
        <ScrollView className="flex-1 bg-white px-6 py-4">
          {/* Título */}
          <View className="mb-6  p-4 bg-blue-50">
            <Text className="text-2xl font-bold text-blue-800">{contrato.titulo}</Text>
            <Text className="text-sm text-gray-600 mt-1">Fecha de publicación: {contrato.fecha}</Text>
          </View>

          {/* Contratante */}
          <View className="mb-6  p-4 bg-white">
            <Text className="text-lg font-semibold text-gray-800 mb-1">Contratante</Text>
            <Text className="text-gray-700">{contrato.contratoPersona}</Text>
          </View>

          {/* Descripción */}
          <View className="mb-6  p-4 bg-white">
            <Text className="text-lg font-semibold text-gray-800 mb-1">Descripción del contrato</Text>
            <Text className="text-gray-700 leading-relaxed">{contrato.descripcion}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default ContractScreen;
