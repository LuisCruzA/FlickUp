import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const AddJobForm = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [form, setForm ] = useState<{ [key: string]: string }>({
    title: '',
    description: '',
    budget: '',
    category: '',
    required_skills: '',
    estimated_duration: '',
    complexity_level: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };
  const closeModal = () => {
    setForm({
        title: '',
    description: '',
    budget: '',
    category: '',
    required_skills: '',
    estimated_duration: '',
    complexity_level: '',
    })
    onClose();
  }
  const handleSubmit = () => {
    const jobData = {
      ...form,
      budget: parseFloat(form.budget),
      estimated_duration: parseInt(form.estimated_duration),
      status: 'Activo',
      is_featured: false,
      posted_date: new Date().toISOString(),
      expires_at: null,
    };
    closeModal();
  };



  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView className="flex-1 bg-white p-6 pt-24">
        <Text className="text-2xl font-bold mb-4">Publicar nuevo trabajo</Text>

        {[
          { label: 'Título', key: 'title' },
          { label: 'Descripción', key: 'description', multiline: true },
          { label: 'Presupuesto (MXN)', key: 'budget' },
          { label: 'Categoría', key: 'category' },
          { label: 'Habilidades requeridas', key: 'required_skills' },
          { label: 'Duración estimada (días)', key: 'estimated_duration' },
          { label: 'Nivel de complejidad', key: 'complexity_level' },
        ].map(({ label, key, multiline }) => (
          <View key={key} className="mb-4">
            <Text className="text-sm font-medium mb-1">{label}</Text>
            <TextInput
              className="border border-gray-300 rounded px-3 py-2"
              value={form[key]}
              onChangeText={(text) => handleChange(key, text)}
              multiline={multiline}
            />
          </View>
        ))}

        <View className="flex-row justify-between mt-6">
          <TouchableOpacity
            onPress={()=>closeModal()}
            className="bg-gray-300 px-6 py-3 rounded"
          >
            <Text>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-500 px-6 py-3 rounded"
          >
            <Text className="text-white font-semibold">Publicar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddJobForm;
