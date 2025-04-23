import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';

import Flashcard from '../../components/Professional/ContractCards';

import ContractScreen from 'components/Professional/ContractScreen';
interface Contrato {
  id: string;
  titulo: string;
  contratoPersona: string;
  descripcion: string;
  fecha: string;
  
}

export default function Contratos() {
  //const [filtro, setFiltro] = useState('Todos');
  const [contratoActivo, setContratoActivo] = useState<Contrato | null>(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: !contratoActivo });
  }, [contratoActivo]);


  const contratos: Contrato[] = [
    {
      id: '1',
      titulo: 'Diseño de logotipo para startup',
      contratoPersona: 'Luis',
      descripcion: '10.00, $1200 esta seman.',
      fecha: '21 de abril-presente',
     
    },
    // Agrega los demás contratos aquí también
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
            onPress={() => setContratoActivo(item)}

          />
        )}
      />

{/* Modal de detalles del trabajo */}
        {contratoActivo && (
        <ContractScreen
          visible={true}
          contrato={contratoActivo}
          onClose={() => setContratoActivo(null)}
        />
      )}
    </View>
    
  );
}

//export default Trabajos;
