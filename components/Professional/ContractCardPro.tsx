import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
type Contrato = {
    project_title: string;
    start_date: string;
    end_date: string;
    agreed_amount: number;
    payment_terms: string;
    status: 'pendiente' | 'aceptado';
    submitted_at: string;
  };

const ContractCardPro = ({
    contrato,
    onAceptar,
    onDeclinar,
  }: {
    contrato: Contrato;
    onAceptar: () => void;
    onDeclinar: () => void;
  }) => {
    return (
      <View className="rounded-lg border border-gray-300 bg-white p-4 mb-4">
        <Text className="text-lg font-bold mb-1">📄 {contrato.project_title}</Text>
        <Text className="text-sm text-gray-800 mb-1">
          💰 Monto acordado: {contrato.agreed_amount} MXN
        </Text>
        <Text className="text-sm">📅 {contrato.start_date} → {contrato.end_date}</Text>
        <Text className="text-sm mt-2 text-gray-800">📝 Condiciones: {contrato.payment_terms}</Text>
        <Text className="text-sm mt-2 text-yellow-500 font-semibold">Estado: Pendiente</Text>
  
        <View className="flex-row justify-between mt-4 gap-2">
          <TouchableOpacity
            onPress={onDeclinar}
            className="flex-1 bg-red-500 py-2 rounded-md"
          >
            <Text className="text-white text-center font-semibold">Declinar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={onAceptar}
            className="flex-1 bg-green-600 py-2 rounded-md"
          >
            <Text className="text-white text-center font-semibold">Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  export default ContractCardPro;