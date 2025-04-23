import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import FinanzasModal from './FinanzasModal';

export default function FinanzasButton() {
  const [creditoVisible, setCreditoVisible] = useState(false);
  const hayCreditoDisponible = true; // Cambia esto según tu lógica

  const openCredito = () => setCreditoVisible(true);

  const screenWidth = Dimensions.get('window').width;
  const anchoBoton = screenWidth / 4; // ahora una cuarta parte

  return (
    <View className="items-center mt-4">
      <TouchableOpacity
        onPress={openCredito}
        style={{
          width: anchoBoton,
          height: 100,
          backgroundColor: '#d1d5db', // gris fijo
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#1f2937', fontWeight: 'bold', textAlign: 'center' }}>
          {hayCreditoDisponible ? 'Crédito disponible' : 'Sin crédito disponible'}
        </Text>
      </TouchableOpacity>

      <FinanzasModal visible={creditoVisible} onClose={() => setCreditoVisible(false)} />
    </View>
  );
}
