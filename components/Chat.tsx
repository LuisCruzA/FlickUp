import React, {useState, useLayoutEffect} from 'react';
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
import { useNavigation } from '@react-navigation/native';


import { Ionicons, AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewContractMessageForm from './Cliente/NewContractMessageForm';

const mensajesMock: {
  
  [key: string]: {
    name: string;
    avatar: string;
    last_active: string;
    mensajes: { id: string; sender_id: string; texto: string }[];
  };
} = {
  '1': {
    name: 'Bruno Espina',
    avatar: 'https://i.pravatar.cc/150?img=1',
    last_active: 'Activa hace 11 minutos',
    mensajes: [
      { id: '1', sender_id: '123', texto: 'Hola, ¿cómo estás?' },
      { id: '2', sender_id: '456', texto: 'Bien, ¿y tú?' },
      { id: '3', sender_id: '123', texto: 'Todo bien, gracias :)' },
    ],
  },
  '2': {
    name: 'nebulanomad',
    avatar: 'https://i.pravatar.cc/150?img=2',
    last_active: 'Activo hace 1 hora',
    mensajes: [
      { id: '1', sender_id: '123', texto: '¿Estás disponible esta semana?' },
      { id: '2', sender_id: '456', texto: 'Sí, ¿qué necesitas?' },
    ],
  },
  '3': {
    name: 'emberecho',
    avatar: 'https://i.pravatar.cc/150?img=3',
    last_active: 'Activo hace 5 minutos',
    mensajes: [
      { id: '1', sender_id: '456', texto: '¡Buen trabajo con el proyecto!' },
      { id: '2', sender_id: '123', texto: 'Gracias, un placer trabajar contigo.' },
    ],
  },
  '4': {
    name: 'lunavoyager',
    avatar: 'https://i.pravatar.cc/150?img=4',
    last_active: 'Activa hace 2 días',
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
    last_active: 'Activo hace 3 días',
    mensajes: [
      { id: '1', sender_id: '456', texto: 'Hey! Whats up?' },
      { id: '2', sender_id: '123', texto: 'Todo bien, ¿y tú?' },
      { id: '3', sender_id: '456', texto: 'Relajado, solo viendo qué hacer hoy' },
    ],
  },
  '6': {
    name: 'fernandx',
    avatar: 'https://i.pravatar.cc/150?img=6',
    last_active: 'Activo hace 1 semana',
    mensajes: [
      { id: '1', sender_id: '456', texto: '¿Cuánto me cobras por cambiar el motor?' },
      { id: '2', sender_id: '123', texto: 'Depende del modelo. ¿Qué coche es?' },
      { id: '3', sender_id: '456', texto: 'Un Jetta 2009' },
      { id: '4', sender_id: '123', texto: 'Te paso precio en un momento 👌' },
    ],
  },
};

const Chat = ({
  
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
  const [modalVisible, setModalVisible] = useState(false);
  //const [trabajoActivo, setTrabajoActivo] = useState<Trabajo | null>(null);
  const navigation = useNavigation();

  

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
            <Text className="text-sm font-semibold text-black">{chat.name}</Text>
            <Text className="text-xs text-gray-500">{chat.last_active}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity>
            <Feather name="phone" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
          

          <View className="flex-row rounded-full items-center bg-blue-500">
  <Text className="mr-2 text-white">Contract</Text>
  <MaterialIcons name="add" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <NewContractMessageForm visible={modalVisible} onClose={() => setModalVisible(false)} />
      
        </View>
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

export default Chat;