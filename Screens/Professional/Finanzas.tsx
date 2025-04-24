import React from 'react';
import { View, Text, FlatList } from 'react-native';
import FinanzasButton from 'components/Professional/FinanzasButton';

export default function Finanzas() {
  const finanzas = [
    { id: '1', titulo: 'Saldo disponible', monto: '$15,000' },
    { id: '2', titulo: 'Dinero en proceso', monto: '$5,000' },
    { id: '3', titulo: 'Ingresos últimos 12 meses', monto: '$100,000' },
    { id: '4', titulo: 'Trabajos realizados', monto: '45' },
  ];

  const ingresos12m = parseInt(finanzas[2].monto);
  const trabajos   = parseInt(finanzas[3].monto, 10);

  return (
    <View className="flex-1 bg-white">
      <View className="bg-white-100 flex-[0.22]">
        <Text className="px-4 pt-8 text-3xl font-bold text-black">Mis Finanzas</Text>
        <Text className="mt-5 px-4 text-xl font-semibold text-black">Resumen general</Text>
      </View>

      <View className="flex-1 px-4 pt-4">
        <Text className="mb-2 text-lg font-bold text-gray-800">Detalles:</Text>

        <FlatList
          data={finanzas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mb-3 rounded-xl bg-gray-100 p-3 shadow-sm">
              <Text className="text-lg font-semibold text-gray-900">{item.titulo}</Text>
              <Text className="text-gray-700">{item.monto}</Text>
            </View>
          )}
          ListFooterComponent={
            <View className="mt-6">
              <Text className="text-center text-gray-500">Última actualización: hoy</Text>
              <View className='flex-1 mt-10'>
              <FinanzasButton ingresosUlt6m={ingresos12m}numTrabajos={trabajos}/>
              </View>
            </View>
          }
        />
      </View>
    </View>
  );
}
