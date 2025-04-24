import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AddJobForm from 'components/Cliente/AddJobForm';
import JobInfoClient from 'components/Cliente/JobInfoClient';
import JobCard from 'components/Professional/JobCard';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { get } from '@aws-amplify/api-rest';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Trabajo } from '~/types';

function calcularTiempoDesde(fechaISO: string): string {
  const fecha = new Date(fechaISO);
  const diffMs = Date.now() - fecha.getTime();
  const diffD = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffD === 0) return 'hoy';
  if (diffD === 1) return 'ayer';
  return `hace ${diffD} días`;
}

function adaptarProyecto(p: any): Trabajo {
  return {
    id: p.project_id,
    titulo: p.title,
    publicadoHace: calcularTiempoDesde(p.posted_date),
    precio: `$${p.budget} MXN`,
    tiempoDisponible: `${p.estimated_duration} días`,
    descripcion: p.description,
    categoria: p.category,
    estado: p.status,
    habilidadesRequeridas: p.required_skills?.split(',').map((s: string) => s.trim()) ?? [],
    nivelComplejidad: p.complexity_level,
    destacado: p.is_featured,
  };
}

async function fetchTrabajos(): Promise<Trabajo[]> {
  const { userId } = await getCurrentUser();

  const restOperation = get({
    apiName: 'flickupApi',
    path: '/projects',
    options: {
      queryParams: { client_id: userId },
    },
  });

  const response = await restOperation.response;
  const raw = await response.body.json();
  if (!Array.isArray(raw)) throw new Error('Respuesta no válida');

  const data = raw.map(adaptarProyecto);
  return data;
}

export default function MisTrabajos() {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [trabajoActivo, setTrabajoActivo] = useState<Trabajo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);

  useEffect(() => {
    const cargarTrabajos = async () => {
      try {
        const trabajos = await fetchTrabajos();
        setTrabajos(trabajos); // ✅ Aquí sí puedes usarlo
      } catch (err: any) {
        console.error('Error al obtener trabajos:', err.message);
      }
    };

    cargarTrabajos();
  }, []);

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
