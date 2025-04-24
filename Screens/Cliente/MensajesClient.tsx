import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ChatCard from 'components/ChatCard';
import ChatClient from 'components/Cliente/ChatClient';
import { useNavigation } from '@react-navigation/native';
import { get } from '@aws-amplify/api-rest';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Chat } from '~/types';
async function fetchChats(userId: string) {
  const res = await get({
    apiName: 'flickupApi',
    path: `/messages/${userId}`,
  });

  const response = await res.response;
  const json = (await response.body.json()) as unknown as Chat[];

  if (!Array.isArray(json)) throw new Error('Respuesta no válida');
  return json as Chat[];
}
export default function MensajesClient() {
  const [chatActivo, setChatActivo] = useState<Chat | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const cargarUsuarioYChats = async () => {
      try {
        const { userId } = await getCurrentUser();
        setUserId(userId);
        const data = await fetchChats(userId);
        setChats(data);
      } catch (err: any) {
        console.error('Error al obtener chats:', err.message);
      }
    };

    cargarUsuarioYChats();
  }, []);

  useLayoutEffect(() => {
    if (chatActivo) {
      navigation.setOptions({ headerShown: false });
    } else {
      navigation.setOptions({ headerShown: true });
    }
  }, [chatActivo]);

  const handleBack = () => {
    setChatActivo(null);
  };
  if (!userId) return null;
  if (chatActivo) {
    return (
      <ChatClient
        chat={chatActivo}
        userId={userId}
        onBack={() => handleBack()}
      />
    );
  }

  return (
    <View className=" bg-white">
      <View className="mx-4 my-3 flex-row items-center rounded-xl border border-gray-300 bg-white px-4 py-2">
        <TextInput
          placeholder="Buscar Chat..."
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-base text-gray-800"
        />
        <FontAwesome name="search" size={20} color="#9CA3AF" />
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id_otrapersona}
        contentContainerStyle={{ paddingBottom: 190 }}
        renderItem={({ item }) => (
          <ChatCard
            id={item.id_otrapersona}
            name={item.name}
            message={item.last_message}
            time={item.time}
            avatar={item.avatar}
            project_title={item.project_title}
            onPress={() => setChatActivo(item)}
          />
        )}
      />
    </View>
  );
}
