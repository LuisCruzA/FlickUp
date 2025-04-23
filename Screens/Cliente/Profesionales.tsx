import FontAwesome from '@expo/vector-icons/FontAwesome';

import ProfessionalSelect from 'components/Cliente/professionalSelect';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';

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
  image: string; // <-- agrega la URL de la foto
}

export default function Profesionales() {

  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Profesional | null>(null);

  const profesionales: Profesional[] = [
    {
      id: '1',
      nombre: 'Luis',
      descripcion: 'Soy especialista en diseño gráfico...',
      hourly_rate: '$1000 MXN',
      availability_status: 'Disponible',
      location: 'CDMX',
      rating: '5.0',
      categoria: 'Diseño',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '2',
      nombre: 'María',
      descripcion: 'Experta en marketing digital...',
      hourly_rate: '$1200 MXN',
      availability_status: 'Disponible',
      location: 'CDMX',
      rating: '4.8',
      categoria: 'Marketing',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: '3',
      nombre: 'Omar',
      descripcion: 'Desarrollador back-end...',
      hourly_rate: '$800 MXN',
      availability_status: 'No disponible',
      location: 'GDL',
      rating: '4.2',
      categoria: 'Programación',
      image: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: '4',
      nombre: 'Sofía',
      descripcion: 'UI/UX designer con 5 años de experiencia...',
      hourly_rate: '$1100 MXN',
      availability_status: 'Disponible',
      location: 'MTY',
      rating: '4.9',
      categoria: 'Diseño',
      image: 'https://i.pravatar.cc/150?img=8',
    },
  ];

  const filtros = ['Todos', 'Diseño', 'Programación', 'Marketing'];

  const profesionalesFiltrados = profesionales.filter((prof) => {
    const coincideCategoria = filtro === 'Todos' || prof.categoria === filtro;
    const coincideBusqueda = prof.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  const handleApply = (prof: Profesional) => {
    setSelectedProfessional(prof);
    setModalVisible(true);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Búsqueda */}
      <View className="mx-4 my-3 flex-row items-center rounded-xl border border-gray-300 bg-white px-4 py-2">
        <TextInput
          placeholder="Buscar profesional..."
          placeholderTextColor="#9CA3AF"
          value={busqueda}
          onChangeText={setBusqueda}
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

      {/* Lista de profesionales */}
      <View className="flex-1">
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
              profileImage={item.image}
              onApply={() => handleApply(item)}
            />
          )}
        />
      </View>

      {/* Modal de aplicación */}
      {selectedProfessional && (
        <ProfessionalSelect visible={modalVisible} onClose={() => setModalVisible(false)} />
      )}
    </View>
  );
}


