import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const ProfessionalSelect = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const categorias = ['Diseño', 'Programación', 'Marketing'];
  const [selectedCategory, setSelectedCategory] = useState<string>(categorias[0]);
  const navigation = useNavigation<NavigationProp<any>>();

  const aplicarAhora = () => {
    onClose(); // Cierra el modal antes de navegar
    navigation.navigate('Mensajes');
  };
  const closeModal = () => {
    setSelectedCategory(categorias[0]);
    onClose();
  };

  const handleSubmit = () => {
    const jobApplication = {
      categoria: selectedCategory,
      submitted_at: new Date().toISOString(),
      status: 'Enviado',
    };

    console.log('📤 Categoría seleccionada:', jobApplication);
    closeModal();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 bg-white"
      >
        <ScrollView className="p-6 pt-20">
          <Text className="text-2xl font-bold mb-4">¿Para que quieres contratar?</Text>

          <View className="border border-gray-300 rounded-lg overflow-hidden">
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue: React.SetStateAction<string>) => setSelectedCategory(itemValue)}
              style={{ height: 200 }}
              itemStyle={{ fontSize: 18 }}
            >
              {categorias.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>

          {/* Botones */}
          <View className="flex-row justify-between gap-3 mt-6">
            <TouchableOpacity
              onPress={closeModal}
              className="flex-1 rounded-xl bg-gray-300 py-4 items-center"
            >
              <Text className="text-gray-800 font-semibold">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={aplicarAhora}
              className="flex-1 rounded-xl bg-blue-600 py-4 items-center"
            >
              <Text className="text-white font-semibold">Enviar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ProfessionalSelect;