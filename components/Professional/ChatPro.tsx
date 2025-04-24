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
import ContractCardPro from './ContractCardPro';

import { Ionicons, AntDesign } from '@expo/vector-icons';

const mensajesMock: {
    [key: string]: {
      name: string;
      avatar: string;
      project_title: string;
      mensajes: { id: string; sender_id: string; texto: string }[];
    };
  } = {
    '1': {
      name: 'Carlos Fontes',
      avatar: 'https://i.pravatar.cc/150?img=10',
      project_title: 'Instalación de sistema de riego',
      mensajes: [
        { id: '1', sender_id: 'client123', texto: 'Hola Carlos, necesito instalar un riego automático.' },
        { id: '2', sender_id: 'pro456', texto: 'Claro, puedo revisarlo esta semana.' },
        { id: '3', sender_id: 'client123', texto: 'Perfecto, te veo el jueves' },
      ],
    },
    '2': {
      name: 'Luisa Herrera',
      avatar: 'https://i.pravatar.cc/150?img=20',
      project_title: 'Revisión eléctrica de local comercial',
      mensajes: [
        { id: '1', sender_id: 'pro456', texto: '¿Ya cortaron la corriente del área a revisar?' },
        { id: '2', sender_id: 'client123', texto: 'Sí, lo hicimos hoy temprano.' },
        { id: '3', sender_id: 'pro456', texto: 'Perfecto, entonces voy en camino.' },
      ],
    },
    '3': {
      name: 'Esteban Morales',
      avatar: 'https://i.pravatar.cc/150?img=30',
      project_title: 'Mantenimiento de aire acondicionado',
      mensajes: [
        { id: '1', sender_id: 'client123', texto: 'Hola Esteban, ¿puedes revisar el aire de la sala?' },
        { id: '2', sender_id: 'pro456', texto: 'Sí, paso después de las 5 pm.' },
        { id: '3', sender_id: 'client123', texto: 'Te mando la ubicación' },
      ],
    },
    '4': {
      name: 'Marta Cano',
      avatar: 'https://i.pravatar.cc/150?img=40',
      project_title: 'Reparación de grifería y desagüe',
      mensajes: [
        { id: '1', sender_id: 'client123', texto: 'El lavamanos sigue goteando...' },
        { id: '2', sender_id: 'pro456', texto: 'Lo reviso mañana sin falta.' },
      ],
    },
    '5': {
      name: 'Javier Ávila',
      avatar: 'https://i.pravatar.cc/150?img=50',
      project_title: 'Armado de clóset empotrado',
      mensajes: [
        { id: '1', sender_id: 'pro456', texto: 'Ya está instalado el clóset.' },
        { id: '2', sender_id: 'client123', texto: 'Todo quedó perfecto, gracias.' },
      ],
    },
    '6': {
      name: 'Rosa Domínguez',
      avatar: 'https://i.pravatar.cc/150?img=60',
      project_title: 'Pintura exterior de fachada',
      mensajes: [
        { id: '1', sender_id: 'client123', texto: '¿Puedes venir mañana temprano?' },
        { id: '2', sender_id: 'pro456', texto: 'Sí, estaré ahí a las 8.' },
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
const ChatPro = ({
  onBack,
  chatId,
  userId,
}: {
  onBack: () => void;
  chatId: string;
  userId: string;
}) => {
  const chat = mensajesMock[chatId];
  const mensajes = chat?.mensajes || [];
  const [contrato, setContrato] = useState<Contrato | null>({
    project_title: 'Landing page para negocio local',
    start_date: '2024-05-01',
    end_date: '2024-05-10',
    agreed_amount: 1500,
    payment_terms: 'Pago 50% al iniciar, 50% al entregar',
    status: 'pendiente',
    submitted_at: '2024-04-28T15:00:00Z',
  });

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
            <Text className="text-sm text-black w-50">{chat.project_title}</Text>
          </View>
        </View>
      </View>
      {/* Contrato pendiente */}
      {contrato && contrato.status === 'pendiente' && (
        <View className="px-4 pt-6">
          <ContractCardPro
            contrato={contrato}
            onAceptar={() =>
              setContrato({ ...contrato, status: 'aceptado' })
            }
            onDeclinar={() => setContrato(null)}
          />
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

export default ChatPro;