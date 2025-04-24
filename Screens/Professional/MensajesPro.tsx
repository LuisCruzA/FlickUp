import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ChatCard from 'components/ChatCard';
import ChatPro from 'components/Professional/ChatPro';
import { useNavigation } from '@react-navigation/native';

export default function MensajesPro() {
  const [chatActivo, setChatActivo] = useState<string | null>(null);
  const userId = '123';

  const navigation = useNavigation();

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

  const chats = [
    {
      id: '1',
      name: 'Carlos Fontes',
      message: 'Tú: Perfecto, te veo el jueves',
      time: '9:10 a.m.',
      avatar: 'https://i.pravatar.cc/150?img=10',
      project_title: 'Instalación de sistema de riego',
    },
    {
      id: '2',
      name: 'Luisa Herrera',
      message: '¿Incluye el cableado nuevo?',
      time: '12:45 p.m.',
      avatar: 'https://i.pravatar.cc/150?img=20',
      project_title: 'Revisión eléctrica de local comercial',
    },
    {
      id: '3',
      name: 'Esteban Morales',
      message: 'Tú: Te mando la ubicación',
      time: 'Ayer',
      avatar: 'https://i.pravatar.cc/150?img=30',
      project_title: 'Mantenimiento de aire acondicionado',
    },
    {
      id: '4',
      name: 'Marta Cano',
      message: 'El lavamanos sigue goteando...',
      time: 'Ayer',
      avatar: 'https://i.pravatar.cc/150?img=40',
      project_title: 'Reparación de grifería y desagüe',
    },
    {
      id: '5',
      name: 'Javier Ávila',
      message: 'Todo listo, trabajo terminado.',
      time: 'Lunes',
      avatar: 'https://i.pravatar.cc/150?img=50',
      project_title: 'Armado de clóset empotrado',
    },
    {
      id: '6',
      name: 'Rosa Domínguez',
      message: 'Tú: ¿Puedes venir mañana temprano?',
      time: 'Domingo',
      avatar: 'https://i.pravatar.cc/150?img=60',
      project_title: 'Pintura exterior de fachada',
    },
  ];
  

  if (chatActivo) {
    return <ChatPro chatId={chatActivo} userId={userId} onBack={() => handleBack()} />;
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 190 }}
        renderItem={({ item }) => (
          <ChatCard
            id={item.id}
            name={item.name}
            message={item.message}
            time={item.time}
            avatar={item.avatar}
            project_title={item.project_title}
            onPress={() => setChatActivo(item.id)}
          />
        )}
      />
    </View>
  );
}
