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
  project_title,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  project_title: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) => {
  const [form, setForm] = useState<{ [key: string]: string }>({
    start_date: '',
    end_date: '',
    agreed_amount: '',
    payment_terms: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const closeModal = () => {
    setForm({
      start_date: '',
      end_date: '',
      agreed_amount: '',
      payment_terms: '',
    });
    onClose();
  };

  const handleSubmit = () => {
    try {
      const requiredFields = ['start_date', 'end_date', 'agreed_amount', 'payment_terms'];

      for (const field of requiredFields) {
        if (!form[field] || form[field].trim() === '') {
          throw new Error(`El campo "${field}" no puede estar vacío.`);
        }
      }

      const contractData = {
        project_title,
        start_date: new Date(form.start_date).toISOString(),
        end_date: new Date(form.end_date).toISOString(),
        agreed_amount: parseFloat(form.agreed_amount),
        payment_terms: form.payment_terms.trim(),
        status: 'pendiente',
        submitted_at: new Date().toISOString(),
      };

      console.log('📤 Contrato propuesto:', contractData);
      onSubmit(contractData);
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
          <Text className="text-2xl font-bold mb-1">Contrato</Text>
          <Text className="mb-6 text-gray-700 italic text-base">{project_title}</Text>

          {[
            { label: 'Fecha de inicio (YYYY-MM-DD)', key: 'start_date' },
            { label: 'Fecha de entrega (YYYY-MM-DD)', key: 'end_date' },
            { label: 'Monto acordado (MXN)', key: 'agreed_amount', keyboardType: 'numeric' },
            {
              label: 'Condiciones de pago',
              key: 'payment_terms',
              multiline: true,
              style: 'h-32 text-top',
            },
          ].map(({ label, key, multiline, style, keyboardType }) => (
            <View key={key} className="mb-4">
              <Text className="text-sm font-medium mb-1">{label}</Text>
              <TextInput
                className={`border border-gray-300 rounded-lg px-3 py-2 text-sm ${style || ''}`}
                value={form[key]}
                onChangeText={(text) => handleChange(key, text)}
                multiline={multiline}
                keyboardType={keyboardType as KeyboardTypeOptions}
              />
            </View>
          ))}

          <View className="flex-row justify-between gap-3 mt-6">
            <TouchableOpacity
              onPress={closeModal}
              className="flex-1 rounded-xl bg-gray-300 py-4 items-center"
            >
              <Text className="text-gray-800 font-semibold">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
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

export default NewContractMessageForm;
