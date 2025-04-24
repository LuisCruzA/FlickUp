import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { Contrato } from '~/types';


const ContractCardClient = ({ contrato }: { contrato: Contrato  }) => {
    return (
      <View className="rounded-lg border border-gray-300 bg-white p-4 mb-4">
        <Text className="text-lg font-bold mb-1">{contrato.project_title}</Text>
        <Text className="text-sm text-gray-800 mb-1">
          Monto acordado: {contrato.agreed_amount} MXN
        </Text>
        <Text className="text-sm">{contrato.start_date} → {contrato.end_date}</Text>
        <Text className="text-sm mt-2 text-gray-800">Condiciones: {contrato.payment_terms}</Text>
        <Text className="text-sm mt-2 text-yellow-500 font-semibold">Estado: Pendiente</Text>
      </View>
    );
  };
  

export default ContractCardClient;
