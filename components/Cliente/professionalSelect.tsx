import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { get, post } from '@aws-amplify/api-rest';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Trabajo } from '~/types';

function adaptarProyecto(p: any): any {
  return {
    id: p.project_id,
    titulo: p.title,
  };
}

async function fetchTrabajos(): Promise<Trabajo[]> {
  const { userId } = await getCurrentUser();
  const restOperation = get({
    apiName: 'flickupApi',
    path: '/projects',
    options: {
      queryParams: { client_id: userId },
    },
  });
  const response = await restOperation.response;
  const raw = await response.body.json();
  if (!Array.isArray(raw)) throw new Error('Respuesta no válida');
  return raw.map(adaptarProyecto);
}

async function crearMensajeInicial({
  receiverId,
  projectId,
  content,
}: {
  receiverId: string;
  projectId: string;
  content: string;
}) {
  const { userId } = await getCurrentUser();

  const restOperation = post({
    apiName: 'flickupApi',
    path: '/messages',
    options: {
      body: {
        idUser: userId,
        idOtraPersona: receiverId,
        idProject: projectId,
        texto: content
    },
    },
  });

  const response = await restOperation.response;
  return response.body.json(); // opcional: devuelve el mensaje creado
}

const ProfessionalSelect = ({ id_professional, visible, onClose }: { id_professional: string,visible: boolean; onClose: () => void }) => {
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [seleccionado, setSeleccionado] = useState<Trabajo | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    const cargar = async () => {
      try {
        const t = await fetchTrabajos();
        setTrabajos(t);
      } catch (e) {
        console.error(' Error al cargar trabajos:', e);
      }
    };
    if (visible) cargar();
  }, [visible]);

  const handleEnviarMensaje = async () => {
    try {
      const content = 'Hola, tengo el trabajo '+ seleccionado?.titulo;
      console.log(id_professional)
      const receiverId = id_professional;
      const projectId: any = seleccionado?.id;

      await crearMensajeInicial({ receiverId, projectId, content });

      navigation.navigate('Mensajes', {
        projectId,
        receiverId,
      });
    } catch (error) {
      console.error('Error al crear mensaje:', error);
      alert('No se pudo enviar el mensaje');
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 bg-white">
        <View className="px-6 pt-20">
          <Text className="mb-4 text-2xl font-bold">Selecciona un trabajo</Text>

          <FlatList
            data={trabajos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`mb-2 rounded-lg border px-4 py-3 ${
                  seleccionado?.id === item.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                }`}
                onPress={() => setSeleccionado(item)}>
                <Text className="text-base font-medium text-black">{item.titulo}</Text>
              </TouchableOpacity>
            )}
          />

          <View className="mt-6 flex-row justify-between gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 items-center rounded-xl bg-gray-300 py-4">
              <Text className="font-semibold text-gray-800">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleEnviarMensaje}
              className="flex-1 items-center rounded-xl bg-blue-600 py-4">
              <Text className="font-semibold text-white">Enviar Mensaje</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ProfessionalSelect;
