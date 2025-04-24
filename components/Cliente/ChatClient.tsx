import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ContractCardClient from 'components/Cliente/ContractCardClient';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import NewContractMessageForm from './NewContractMessageForm';
import { get, post } from '@aws-amplify/api-rest';
import type { Mensaje, Chat, Contrato } from '~/types';
export async function fetchContracts(userId: string, status?: string): Promise<Contrato[]> {
  const path = status ? `/contracts/${userId}/${status}` : `/contracts/${userId}`;

  const res = await get({
    apiName: 'flickupApi',
    path,
  });

  const response = await res.response;
  const raw = await response.body.json();

  if (!Array.isArray(raw)) throw new Error('Respuesta no válida');

  const data: Contrato[] = raw.map((item: any) => ({
    contract_id: item.contract_id,
    project_id: item.project_id,
    freelancer_id: item.freelancer_id,
    client_id: item.client_id,
    start_date: item.start_date,
    end_date: item.end_date,
    agreed_amount: item.agreed_amount,
    payment_terms: item.payment_terms,
    status: item.status,
    contract_type: item.contract_type,
    terms_conditions: item.terms_conditions,
    project_title: item.project_title,
  }));

  return data;
}

async function fetchMensajes(
  idUser: string,
  idOtraPersona: string,
  idProject: string
): Promise<Mensaje[]> {
  const res = await get({
    apiName: 'flickupApi',
    path: '/messages',
    options: {
      queryParams: {
        idUser,
        idOtraPersona,
        idProject,
      },
    },
  });

  const response = await res.response;
  let data;
  try {
    data = await response.body.json();
  } catch (e) {
    console.error('Error al parsear JSON de mensajes:', e);
  }

  if (!Array.isArray(data)) throw new Error('Respuesta no válida');
  return data as Mensaje[];
}

async function enviarMensaje({
  idUser,
  idOtraPersona,
  idProject,
  texto,
}: {
  idUser: string;
  idOtraPersona: string;
  idProject: string;
  texto: string;
}) {
  const res = await post({
    apiName: 'flickupApi',
    path: '/messages',
    options: {
      body: {
        idUser,
        idOtraPersona,
        idProject,
        texto,
      },
    },
  });

  const response = await res.response;
  const data = await response.body.json();
  return data;
}

export async function fetchContratoPendiente(userId: string, projectId: string): Promise<Contrato | null> {
    const contratos = await fetchContracts(userId, 'pendiente');
    return contratos.find((c) => c.project_id === projectId) ?? null;
  }

const mockContract = {
    "contract_id": '1',
    "project_id": '101',
    "freelancer_id": '55',
    "client_id": '12',
    "start_date": "2024-05-01T00:00:00Z",
    "end_date": "2024-05-15T00:00:00Z",
    "agreed_amount": 2000.0,
    "payment_terms": "50% upfront, 50% on completion",
    "status": "pendiente",
    "contract_type": "fijo",
    "terms_conditions": "Incluye soporte por 30 días después de la entrega.",
    "project_title": "Landing Page para Empresa Local"
  }
const ChatClient = ({
  chat,
  userId,
  onBack,
}: {
  chat: Chat;
  userId: string;
  onBack: () => void;
}) => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [contrato, setContrato] = useState<Contrato | null>(null);
  const [mensajeNuevo, setMensajeNuevo] = useState('');

  4;

  useEffect(() => {
    const cargarMensajesYContrato = async () => {
      try {
        const mensajesBD = await fetchMensajes(userId, chat.id_otrapersona, chat.id_project);
        setMensajes(mensajesBD);

        const contratoBD = await fetchContratoPendiente(userId, chat.id_project);
        setContrato(contratoBD);
      } catch (err: any) {
        console.error('Error al cargar datos:', err.message);
      }
    };

    cargarMensajesYContrato();
  }, [userId, chat.id_otrapersona, chat.id_project]);

  const handleEnviarMensaje = async () => {
    if (!mensajeNuevo.trim()) return;

    try {
      const nuevo = (await enviarMensaje({
        idUser: userId,
        idOtraPersona: chat.id_otrapersona,
        idProject: chat.id_project,
        texto: mensajeNuevo.trim(),
      })) as Mensaje;

      // Agregar el mensaje al final del chat localmente
      setMensajes((prev) => [...prev, nuevo]);
      setMensajeNuevo('');
    } catch (error: any) {
      console.error('Error al enviar mensaje:', error.message);
      alert('No se pudo enviar el mensaje');
    }
  };
  const contratoPendiente = contrato?.status === 'pendiente' ? contrato : null;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white pt-12"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={onBack}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Image source={{ uri: chat.avatar }} className="h-12 w-12 rounded-full" />
          <View>
            <Text className="text-md font-bold text-black">{chat.name}</Text>
            <Text className="w-50 text-sm text-black">{chat.project_title}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View className="flex-row items-center rounded-full bg-blue-500 px-2">
              <Text className="mr-2 text-white">Contratar</Text>
              <MaterialIcons name="add" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <NewContractMessageForm
            visible={modalVisible}
            chat={chat}
            userId={userId}
            onClose={() => setModalVisible(false)}
            onSubmit={(data) => setContrato(data)}
          />
        </View>
      </View>
      <View className="px-4 pt-6">
  <ContractCardClient contrato={mockContract} />
</View>

      {/* Mensajes */}
      <View className="flex-1 bg-white px-4 pt-3">
        <FlatList
          data={mensajes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              className={`mb-4 max-w-[70%] rounded-lg px-4 py-2  ${
                item.sender_id === userId ? 'self-end bg-blue-100' : 'self-start bg-gray-100'
              }`}>
              <Text className="text-md text-black">{item.texto}</Text>
            </View>
          )}
        />
      </View>

      {/* Input */}
      <View className="bottom-0 left-0 right-0 flex-row items-center border-t border-gray-200 bg-white px-4 py-3">
        <TextInput
          value={mensajeNuevo}
          onChangeText={setMensajeNuevo}
          className="mr-2 flex-1 rounded-full bg-gray-100 px-4 py-2 text-base text-black"
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity onPress={handleEnviarMensaje}>
          <Ionicons name="send" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatClient;
