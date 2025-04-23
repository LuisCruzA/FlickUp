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
      name: 'Bruno Espina',
      message: 'Tú: Hola soy tu fan',
      time: '9:40 p.m.',
      avatar: 'https://i.pravatar.cc/150?img=1',
      project_title: 'Diseño de logotipo para startup',
    },
    {
      id: '2',
      name: 'nebulanomad',
      message: 'Tu puta madre',
      time: '5:40 a.m.',
      avatar: 'https://i.pravatar.cc/150?img=2',
      project_title: 'Landing page con animaciones',
    },
    {
      id: '3',
      name: 'emberecho',
      message: '👍 Me gustó tu mensaje',
      time: 'Ayer',
      avatar: 'https://i.pravatar.cc/150?img=3',
      project_title: 'Campaña de marketing de verano',
    },
    {
      id: '4',
      name: 'lunavoyager',
      message: 'Tú: Te amo, perdón por todo :C',
      time: 'Ayer',
      avatar: 'https://i.pravatar.cc/150?img=4',
      project_title: 'Diseño de ilustraciones personalizadas',
    },
    {
      id: '5',
      name: 'shadowlynx',
      message: 'Hey! Whats up?',
      time: 'Lunes',
      avatar: 'https://i.pravatar.cc/150?img=5',
      project_title: 'Optimización SEO para eCommerce',
    },
    {
      id: '6',
      name: 'fernandx',
      message: '¿Cuánto me cobras por cambiar el motor?',
      time: 'Domingo',
      avatar: 'https://i.pravatar.cc/150?img=6',
      project_title: 'Mantenimiento de backend con Node.js',
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
