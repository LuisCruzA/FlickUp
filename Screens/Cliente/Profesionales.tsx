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

import Flashcard from '../../components/Cliente/professionalCards';

interface Profesional {
  id: string;
  nombre: string;
  descripcion: string;
  hourly_rate: string;
  availability_status: string;
  location: string;
  rating: string;
  categoria: string;
}
export default function Profesionales() {
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const profesionales: Profesional[] = [
    {
      id: '1',
      nombre: 'luis',
      descripcion: 'hoola sot tal.... soy especialista en tal... cuento con talm cosaa...',
      hourly_rate: '$1000 MXN',
      availability_status: 'Disponible',
      location: 'xoxoyork',
      rating: '5.0',
      categoria: 'diseño',
    },
    {
      id: '2',
      nombre: 'bruno',
      descripcion: 'habilidad de nose',
      hourly_rate: '$1000 MXN',
      availability_status: 'Disponible',
      location: 'xoxoyork',
      rating: '5.0',
      categoria: 'Marketing',
    },
    {
      id: '3',
      nombre: 'omar',
      descripcion: 'habilidad de nose',
      hourly_rate: '$10 MXN',
      availability_status: 'no disponible',
      location: 'xoxoyork',
      rating: '1.0',
      categoria: 'Diseño',
    },
    {
      id: '4',
      nombre: 'capiubara',
      descripcion: 'habilidad de nose',
      hourly_rate: '$1000 MXN',
      availability_status: 'no disponible',
      location: 'xoxoyork',
      rating: '5.0',
      categoria: 'Programación',
    },
  ];

  const filtros = ['Todos', 'Diseño', 'Programación', 'Marketing'];

  const profesionalesFiltrados = profesionales.filter((profesional) => {
    const coincideCategoria = filtro === 'Todos' || profesional.categoria === filtro;
    const coincideBusqueda = profesional.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });
  return (
    <View className="flex-1 bg-white">
      {/* Búsqueda */}
      <View className="mx-4 my-3 flex-row items-center rounded-xl border border-gray-300 bg-white px-4 py-2">
        <TextInput
          placeholder="Buscar profesional..."
          placeholderTextColor="#9CA3AF"
          value={busqueda}
          onChangeText={(text) => setBusqueda(text)}
          className="flex-1 text-base text-gray-800"
        />
        <FontAwesome name="search" size={20} color="#9CA3AF" />
      </View>

      {/* Filtros */}
      <View className="h-12 border-b border-gray-300 pb-2">
        <FlatList
          data={filtros}
          horizontal
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: 5 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.6}
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
          data={profesionalesFiltrados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Flashcard
              nombre={item.nombre}
              descripcion={item.descripcion}
              hourly_rate={item.hourly_rate}
              availability_status={item.availability_status}
              location={item.location}
              categoria={item.categoria}
              rating={item.rating}
            />
          )}
        />
      </View>
    </View>
  );
}
