import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState,useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';

import Flashcard from '../../components/Professional/ContractCards';

import ContractScreen from 'components/Professional/ContractScreen';
import { get } from '@aws-amplify/api-rest';
import { getCurrentUser } from 'aws-amplify/auth';
import  { Contrato } from '~/types';




function adaptarContrato(c:any): Contrato{

  return{

    id: c.project_id,
    titulo: c.project_title,
    
  fechaInicio: c.start_date, 
  fechaFin: c.end_date,
  precio: c.agreed_amount,
 descripcionpago: c.payment_terms,
  estatus: c.status,
  tipo: c.contract_type,
  descripcion: c.terms_conditions,
  }
}

  async function fecthContratos(): Promise<Contrato[]> {

    let { userId } = await getCurrentUser();
    userId = 'b4081418-9041-7000-565b-223d1c9eb3a2';
    
    const restOperation = get({
      apiName: 'flickupApi',
      path: `/contracts/${userId}`,
    });

    const response = await restOperation.response;
    const raw = await response.body.json();
    if (!Array.isArray(raw)) throw new Error('Respuesta no válida');
  
    const data = raw.map(adaptarContrato);
    //console.log('Contratos adaptados:', data); // 👈 Aquí verás los datos con título, precio, descripción, etc.

    return data;

  }



export default function Contratos() {
  //const [filtro, setFiltro] = useState('Todos');
  const [contratoActivo, setContratoActivo] = useState<Contrato | null>(null);
  const navigation = useNavigation();
  const [contratos, setContratos] = useState<Contrato[]>([]);


  useEffect(() => {
    const cargarContratos = async () => {
      try {
        const contrato = await fecthContratos();
        setContratos(contrato); // ✅ Aquí sí puedes usarlo
      } catch (err: any) {
        console.error('Error al obtener trabajos:', err.message);
      }
    };

    cargarContratos();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: !contratoActivo });
  }, [contratoActivo]);

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
            inicio={item.fechaInicio}
            precio={item.precio}
            statu={item.estatus}
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