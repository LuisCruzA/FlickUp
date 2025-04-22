import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Flashcard from '../../components/Professional/Cards';

interface Trabajo {
  id: string;
  titulo: string;
  publicadoHace: string;
  precio: string;
  tiempoDisponible: string;
  descripcion: string;
  categoria: string;
}
export default function Trabajos() {
  const [filtro, setFiltro] = useState('Todos');

  const trabajos: Trabajo[] = [
    {
      id: '1',
      titulo: 'Diseño de logotipo para startup',
      publicadoHace: '2 días',
      precio: '$500 MXN',
      tiempoDisponible: '3 días',
      descripcion:
        'Buscamos un diseñador creativo que pueda generar un logotipo moderno y minimalista para una startup tecnológica.',
      categoria: 'Diseño',
    },
    {
      id: '2',
      titulo: 'Desarrollo de landing page',
      publicadoHace: '5 horas',
      precio: '$1200 MXN',
      tiempoDisponible: '1 semana',
      descripcion:
        'Se requiere crear una landing page en React con animaciones suaves y secciones responsivas.',
      categoria: 'Programación',
    },
    {
      id: '3',
      titulo: 'Desarrollo de landing page',
      publicadoHace: '5 horas',
      precio: '$1200 MXN',
      tiempoDisponible: '1 semana',
      descripcion:
        'Se requiere crear una landing page en React con animaciones suaves y secciones responsivas.',
      categoria: 'Programación',
    },
    {
      id: '4',
      titulo: 'Desarrollo de landing page',
      publicadoHace: '5 horas',
      precio: '$1200 MXN',
      tiempoDisponible: '1 semana',
      descripcion:
        'Se requiere crear una landing page en React con animaciones suaves y secciones responsivas.',
      categoria: 'Programación',
    },
  ];

  const filtros = ['Todos', 'Diseño', 'Programación', 'Marketing'];

  const trabajosFiltrados =
    filtro === 'Todos' ? trabajos : trabajos.filter((trabajo) => trabajo.categoria === filtro);

  return (
    <View className="flex-1 bg-white">
      {/* Búsqueda */}
      <View className="mx-4 my-3 flex-row items-center rounded-xl border border-gray-300 bg-white px-4 py-2">
        <TextInput
          placeholder="Buscar trabajo..."
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-base text-gray-800"
        />
        <FontAwesome name="search" size={20} color="#9CA3AF" />
      </View>

      {/* Filtros */}
      <View className="h-10">
        <FlatList
          data={filtros}
          horizontal
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: 5}}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`mx-1 rounded-2xl bg-blue-600 px-4 py-2 ${filtro === item ? 'opacity-100' : 'opacity-60'}`}
              onPress={() => setFiltro(item)}>
              <Text className="text-sm font-bold text-white">{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Lista de trabajos */}
      <View className="flex-1 ">
        <FlatList
          data={trabajosFiltrados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Flashcard
              titulo={item.titulo}
              publicadoHace={item.publicadoHace}
              precio={item.precio}
              tiempoDisponible={item.tiempoDisponible}
              descripcion={item.descripcion}
            />
          )}
        />
      </View>
    </View>
  );
}