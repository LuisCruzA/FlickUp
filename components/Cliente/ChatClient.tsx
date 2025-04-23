import React, { useState, useLayoutEffect } from 'react';
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

const mensajesMock: {
  [key: string]: {
    name: string;
    avatar: string;
    project_title: string;
    mensajes: { id: string; sender_id: string; texto: string }[];
  };
} = {
  '1': {
    name: 'Bruno Espina',
    avatar: 'https://i.pravatar.cc/150?img=1',
    project_title: 'Diseño de logotipo para startup',
    mensajes: [
      { id: '1', sender_id: '123', texto: 'Hola, ¿cómo estás?' },
      { id: '2', sender_id: '456', texto: 'Bien, ¿y tú?' },
      { id: '3', sender_id: '123', texto: 'Todo bien, gracias :)' },
    ],
  },
  '2': {
    name: 'nebulanomad',
    avatar: 'https://i.pravatar.cc/150?img=2',
    project_title: 'Landing page en React con animaciones',
    mensajes: [
      { id: '1', sender_id: '123', texto: '¿Estás disponible esta semana?' },
      { id: '2', sender_id: '456', texto: 'Sí, ¿qué necesitas?' },
    ],
  },
  '3': {
    name: 'emberecho',
    avatar: 'https://i.pravatar.cc/150?img=3',
    project_title: 'Campaña de marketing de verano',
    mensajes: [
      { id: '1', sender_id: '456', texto: '¡Buen trabajo con el proyecto!' },
      { id: '2', sender_id: '123', texto: 'Gracias, un placer trabajar contigo.' },
    ],
  },
  '4': {
    name: 'lunavoyager',
    avatar: 'https://i.pravatar.cc/150?img=4',
    project_title: 'Ilustraciones personalizadas para redes',
    mensajes: [
      { id: '1', sender_id: '123', texto: 'Te amo, perdón por todo :C' },
      { id: '2', sender_id: '456', texto: 'No pasa nada, todo bien 💛' },
      { id: '3', sender_id: '123', texto: '¿De verdad?' },
      { id: '4', sender_id: '456', texto: 'Sí, ya pasó. 😊' },
    ],
  },
  '5': {
    name: 'shadowlynx',
    avatar: 'https://i.pravatar.cc/150?img=5',
    project_title: 'Optimización SEO para eCommerce',
    mensajes: [
      { id: '1', sender_id: '456', texto: 'Hey! Whats up?' },
      { id: '2', sender_id: '123', texto: 'Todo bien, ¿y tú?' },
      { id: '3', sender_id: '456', texto: 'Relajado, solo viendo qué hacer hoy' },
    ],
  },
  '6': {
    name: 'fernandx',
    avatar: 'https://i.pravatar.cc/150?img=6',
    project_title: 'Backend para app de servicios (Node.js + Firebase)',
    mensajes: [
      { id: '1', sender_id: '456', texto: '¿Cuánto me cobras por cambiar el motor?' },
      { id: '2', sender_id: '123', texto: 'Depende del modelo. ¿Qué coche es?' },
      { id: '3', sender_id: '456', texto: 'Un Jetta 2009' },
      { id: '4', sender_id: '123', texto: 'Te paso precio en un momento 👌' },
    ],
  },
};
type Contrato = {
  project_title: string;
  start_date: string;
  end_date: string;
  agreed_amount: number;
  payment_terms: string;
  status: 'pendiente' | 'aceptado';
  submitted_at: string;
};

const contratoPendiente: Contrato  = {
    project_title: 'Landing page para negocio local',
    start_date: '2024-05-01',
    end_date: '2024-05-10',
    agreed_amount: 1500,
    payment_terms: 'Pago 50% al iniciar, 50% al entregar',
    status: 'pendiente',
    submitted_at: '2024-04-28T15:00:00Z',
  };
  

const ChatClient = ({ onBack, chatId, userId,}: { onBack: () => void; chatId: string; userId: string;}) => {
  const chat = mensajesMock[chatId];
  const mensajes = chat?.mensajes || [];
  const [modalVisible, setModalVisible] = useState(false);
  const [contrato, setContrato] = useState<Contrato | null>(null);

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
            project_title={chat.project_title}
            onClose={() => setModalVisible(false)}
            onSubmit={(data) => setContrato(data)}
          />
        </View>
      </View>
      {contratoPendiente && (
        <View className="px-4 pt-6">
          {contratoPendiente && contratoPendiente.status === 'pendiente' && (
  <ContractCardClient contrato={contratoPendiente} />
)}

        </View>
      )}

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
          className="mr-2 flex-1 rounded-full bg-gray-100 px-4 py-2 text-base text-black"
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity>
          <Ionicons name="send" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatClient;
