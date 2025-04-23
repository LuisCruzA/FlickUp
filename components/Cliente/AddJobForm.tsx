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
import { post } from '@aws-amplify/api-rest';
import { getCurrentUser } from 'aws-amplify/auth';

async function postProject(projectData: any) {
  try {
    const { userId } = await getCurrentUser();
    
    const restOperation = post({
      apiName: 'flickupApi',
      path: '/projects',
      options: {
        body: {
          ...projectData,
          client_id: userId,
          status: 'Activo',
          is_featured: false,
          expires_at: null
        }
      }
    });

    const response = await restOperation.response;
    return response.body.json();
  } catch (error: any) {
    throw new Error(error.message || 'Error al crear el proyecto');
  }
}

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

  const handleSubmit = async () => {
    try {
      const camposObligatorios = [
        'title', 'description', 'budget', 'category', 
        'required_skills', 'estimated_duration'
      ];
  
      for (const campo of camposObligatorios) {
        if (!form[campo]?.trim()) throw new Error(`Campo "${campo}" requerido`);
      }
  
      const jobData = {
        ...form,
        budget: Number(form.budget),
        estimated_duration: Number(form.estimated_duration),
        required_skills: form.required_skills.split(',').map(s => s.trim()),
        status: 'Activo',
        posted_date: new Date().toISOString()
      };
  
      await postProject(jobData);
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