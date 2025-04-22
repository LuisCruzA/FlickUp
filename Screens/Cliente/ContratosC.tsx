import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';

import Flashcard from '../../components/Professional/ContractCards';

interface Contrato {
  id: string;
  titulo: string;
  contratoPersona: string;
  descripcion: string;
  fecha: string;
}
export default function Contratos() {
  //const [filtro, setFiltro] = useState('Todos');

  const contratos: Contrato[] = [
    {
      id: '1',
      titulo: 'Diseño de logotipo para startup',
      contratoPersona: 'Luis',
      descripcion:
        '10.00, $1200 esta seman.',
      fecha: '21 de abril-presente',
    },
    {
      id: '2',
      titulo: 'destapado de coladeras',
      contratoPersona: 'omar',
      descripcion:
        '10.00, $12 esta seman.',
      fecha: '21 de abril-presente',
    },
    {
      id: '3',
      titulo: 'diseño web',
      contratoPersona: 'bruno',
      descripcion:
        '10.00, $12010 esta seman.',
      fecha: '21 de abril-presente',
    },
  ];

  //const filtros = ['Todos', 'Diseño', 'Programación', 'Marketing'];

  //const trabajosFiltrados =
  //filtro === 'Todos' ? trabajos : trabajos.filter((trabajo) => trabajo.categoria === filtro);

  return (
    <View className=" flex-1 bg-white pb-4">
      <Text className="text-1xl mb-3 ml-5 mt-12 text-left font-semibold text-neutral-900">
        Contratos activos
      </Text>

      <FlatList
        data={contratos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Flashcard
            titulo={item.titulo}
            contratoPersona={item.contratoPersona}
            descripcion={item.descripcion}
            fecha={item.fecha}
          />
        )}
      />
    </View>
  );
}

//export default Trabajos;
