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

const AddJobForm = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [form, setForm] = useState<{ [key: string]: string }>({
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
    });
    onClose();
  };

  const handleSubmit = () => {
    try {
      // Validación de campos requeridos
      const camposObligatorios = [
        'title',
        'description',
        'budget',
        'category',
        'required_skills',
        'estimated_duration',
        'complexity_level',
      ];
  
      for (const campo of camposObligatorios) {
        if (!form[campo] || form[campo].trim() === '') {
          throw new Error(`El campo "${campo}" no puede estar vacío.`);
        }
      }
  
      // Construcción del objeto final
      const jobData = {
        ...form,
        budget: parseFloat(form.budget),
        estimated_duration: parseInt(form.estimated_duration),
        required_skills: form.required_skills.split(',').map((s) => s.trim()),
        status: 'Activo',
        is_featured: false,
        posted_date: new Date().toISOString(),
        expires_at: null,
      };
      closeModal();
    } catch (error: any) {
      alert(error.message); 
  };
  }

  return (
    <Modal visible={visible} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 bg-white"
      >
        <ScrollView className="p-6 pt-20">
          <Text className="text-2xl font-bold mb-4">Publicar nuevo trabajo</Text>

          {/* Campos de formulario */}
          {[
            { label: 'Título', key: 'title' },
            {
              label: 'Descripción',
              key: 'description',
              multiline: true,
              style: 'h-32 text-top',
            },
            {
              label: 'Presupuesto (MXN)',
              key: 'budget',
              keyboardType: 'numeric',
            },
            { label: 'Categoría', key: 'category' },
            {
              label: 'Habilidades requeridas (separadas por coma)',
              key: 'required_skills',
            },
            {
              label: 'Duración estimada (días)',
              key: 'estimated_duration',
              keyboardType: 'numeric',
            },
            { label: 'Nivel de complejidad', key: 'complexity_level' },
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
              <Text className="text-white font-semibold">Publicar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddJobForm;