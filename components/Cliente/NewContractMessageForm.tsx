import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  KeyboardTypeOptions,
} from 'react-native';

const NewContractMessageForm = ({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (form: { [key: string]: string }) => void;
}) => {
  const [form, setForm] = useState<{ [key: string]: string }>({
    titulo: '',
    proposed_amount: '',
    cover_letter: '',
    estimated_duration: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const closeModal = () => {
    setForm({
      titulo: '',
      proposed_amount: '',
      cover_letter: '',
      estimated_duration: '',
    });
    onClose();
  };

  const handleSubmit = () => {
    try {
      const camposObligatorios = ['titulo', 'proposed_amount', 'cover_letter', 'estimated_duration'];

      for (const campo of camposObligatorios) {
        if (!form[campo] || form[campo].trim() === '') {
          throw new Error(`El campo "${campo}" no puede estar vacío.`);
        }
      }

      onSubmit(form); // ← llama al padre para insertar la "card" en el chat
      closeModal();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 bg-white"
      >
        <ScrollView className="p-6 pt-20">
          <Text className="text-2xl font-bold mb-4">Aplicar a trabajo</Text>

          {/* Campos del formulario */}
          {[
            { label: 'Título del proyecto', key: 'titulo' },
            { label: 'Monto propuesto (MXN)', key: 'proposed_amount', keyboardType: 'numeric' },
            {
              label: 'Carta de presentación',
              key: 'cover_letter',
              multiline: true,
              style: 'h-32 text-top',
            },
            {
              label: 'Duración estimada (días)',
              key: 'estimated_duration',
              keyboardType: 'numeric',
            },
          ].map(({ label, key, multiline, style, keyboardType }) => (
            <View key={key} className="mb-4">
              <Text className="text-sm font-medium mb-1">{label}</Text>
              <TextInput
                className={`border border-gray-300 rounded-lg px-3 py-2 text-sm ${
                  style || ''
                }`}
                value={form[key]}
                onChangeText={(text) => handleChange(key, text)}
                multiline={multiline}
                keyboardType={keyboardType as KeyboardTypeOptions}
              />
            </View>
          ))}

          {/* Botones */}
          <View className="flex-row justify-between gap-3 mt-6">
            <TouchableOpacity
              onPress={closeModal}
              className="flex-1 rounded-xl bg-gray-300 py-4 items-center"
            >
              <Text className="text-gray-800 font-semibold">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              className="flex-1 rounded-xl bg-blue-500 py-4 items-center"
            >
              <Text className="text-white font-semibold">Enviar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default NewContractMessageForm;
