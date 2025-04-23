import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AddJobForm from 'components/Cliente/AddJobForm';
import JobInfoClient from 'components/Cliente/JobInfoClient';
import JobCard from 'components/Professional/JobCard';
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
interface Trabajo {
  id: string;
  titulo: string;
  publicadoHace: string;
  precio: string;
  tiempoDisponible: string;
  descripcion: string;
  categoria: string;
  estado: string;
  habilidadesRequeridas: string[];
  nivelComplejidad: string;
  destacado: boolean;
}
export default function MisTrabajos() {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [trabajoActivo, setTrabajoActivo] = useState<Trabajo | null>(null);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    if (trabajoActivo) {
      navigation.setOptions({ headerShown: false });
    } else {
      navigation.setOptions({ headerShown: true });
    }
  }, [trabajoActivo]);

  const trabajos: Trabajo[] = [
    {
      id: '1',
      titulo: 'Diseño de logotipo para startup',
      publicadoHace: 'hace 2 días',
      precio: '$500 MXN',
      tiempoDisponible: '3 días',
      descripcion:
        'Buscamos un diseñador creativo que pueda generar un logotipo moderno y minimalista para una startup tecnológica.',
      categoria: 'Diseño',
      estado: 'Abierto',
      habilidadesRequeridas: ['Illustrator', 'Photoshop', 'Branding'],
      nivelComplejidad: 'Baja',
      destacado: true,
    },
    {
      id: '2',
      titulo: 'Desarrollo de landing page',
      publicadoHace: 'hace 5 horas',
      precio: '$1200 MXN',
      tiempoDisponible: '1 semana',
      descripcion:
        'Se requiere crear una landing page en React con animaciones suaves y secciones responsivas.',
      categoria: 'Programación',
      estado: 'Abierto',
      habilidadesRequeridas: ['React', 'HTML', 'CSS', 'JavaScript', 'Tailwind'],
      nivelComplejidad: 'Media',
      destacado: false,
    },
    {
      id: '3',
      titulo: 'Pene',
      publicadoHace: 'hace 1 día',
      precio: '$800 MXN',
      tiempoDisponible: '4 días',
      descripcion:
        'Se busca experto en SEO para mejorar el posicionamiento en buscadores de un sitio WordPress.',
      categoria: 'Marketing',
      estado: 'Abierto',
      habilidadesRequeridas: ['SEO', 'Google Analytics', 'WordPress'],
      nivelComplejidad: 'Media',
      destacado: true,
    },
    {
      id: '4',
      titulo: 'Desarrollo de backend para app móvil',
      publicadoHace: 'hace 3 días',
      precio: '$2500 MXN',
      tiempoDisponible: '2 semanas',
      descripcion:
        'Se necesita backend developer con experiencia en Node.js y Firebase para crear la API de una app de servicios.',
      categoria: 'Programación',
      estado: 'En progreso',
      habilidadesRequeridas: ['Node.js', 'Firebase', 'REST API', 'MongoDB'],
      nivelComplejidad: 'Alta',
      destacado: false,
    },
  ];

  const filtros = ['Todos', 'Diseño', 'Programación', 'Marketing'];

  const trabajosFiltrados = trabajos.filter((trabajo) => {
    const coincideCategoria = filtro === 'Todos' || trabajo.categoria === filtro;
    const coincideBusqueda = trabajo.titulo.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });  
  return (
    <View className="flex-1 bg-white">
      {/* Búsqueda */}
      <View className="mx-4 my-3 flex-row items-center rounded-xl border border-gray-300 bg-white px-4 py-2">
        <TextInput
          placeholder="Buscar trabajo..."
          placeholderTextColor="#9CA3AF"
          value={busqueda}
          onChangeText={(text) => setBusqueda(text)}
          className="flex-1 text-base text-gray-800 "
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
          data={trabajosFiltrados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <JobCard
              titulo={item.titulo}
              publicadoHace={item.publicadoHace}
              precio={item.precio}
              tiempoDisponible={item.tiempoDisponible}
              descripcion={item.descripcion}
              onPress={() => setTrabajoActivo(item)}
            />
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-6 right-6 z-50 rounded-full bg-blue-600 p-4 shadow-lg">
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
      <AddJobForm visible={modalVisible} onClose={() => setModalVisible(false)} />
      {trabajoActivo && (
        <JobInfoClient trabajo={trabajoActivo} onClose={() => setTrabajoActivo(null)} />
      )}
    </View>
  );
}
