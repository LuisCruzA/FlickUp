import FontAwesome from '@expo/vector-icons/FontAwesome';

import ProfessionalSelect from 'components/Cliente/professionalSelect';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';

import Flashcard from '../../components/Cliente/professionalCards';

import { get } from '@aws-amplify/api-rest';
interface Profesional {
  id: string;
  nombre: string;
  descripcion: string;
  hourly_rate: string;
  availability_status: string;
  location: string;
  rating: string;
  categoria: string;
  image: string;
  idiomas: string[];
  verificado: boolean;
}

function adaptarFreelancer(f: any) {
  return {
    id: f.user_id,
    nombre: (f.full_name.trim() === '' ||  !f.full_name) ? 'Juan Pérez' : f.full_name,
    descripcion: f.bio,
    hourly_rate: `$${f.hourly_rate} MXN`,
    availability_status: f.availability_status,
    location: f.location,
    rating: f.rating,
    categoria: f.title || 'Carpinteria',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    idiomas: f.languages?.split(',').map((i: string) => i.trim()) || [],
    verificado: !!f.verified_at,
  };
}

async function fecthProfesionales(): Promise<Profesional[]> {

  const restOperation = get({
    apiName: 'flickupApi',
    path: `/freelancers`,
  });

  const response = await restOperation.response;
  const raw = await response.body.json();
  if (!Array.isArray(raw)) throw new Error('Respuesta no válida');

  const data = raw.map(adaptarFreelancer);

  return data;
}
export default function Profesionales() {
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Profesional | null>(null);
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);

  useEffect(() => {
    const cargarProfesionales = async () => {
      try {
        const profesional = await fecthProfesionales();
        setProfesionales(profesional);
      } catch (err: any) {
        console.error('Error al obtener trabajos:', err.message);
      }
    };

    cargarProfesionales();
  }, []);

  const filtros = ['Todos', 'Carpinteria', 'Programación', 'Marketing'];

  const profesionalesFiltrados = profesionales.filter((prof) => {
    const coincideCategoria = filtro === 'Todos' || prof.categoria === filtro;
    const coincideBusqueda = (prof.nombre ?? '').toLowerCase().includes(busqueda.toLowerCase());

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
        <ProfessionalSelect id_professional = {selectedProfessional.id} visible={modalVisible} onClose={() => setModalVisible(false)} />
      )}
    </View>
  );
}