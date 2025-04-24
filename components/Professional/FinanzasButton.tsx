// FinanzasButton.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { post } from 'aws-amplify/api';  // nuevo import v6
import PerfilModal from './PerfilModal';

interface Props {
  ingresosUlt6m: number;
  numTrabajos: number;
}

interface Data {
  score: number;
}

export default function FinanzasButton({ ingresosUlt6m, numTrabajos }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handlePress = async () => {
    try {
      // Operación REST según v6: obtenemos .response
      const operation = post({
        apiName: 'flickupApi',
        path: '/predictCreditScore',
        options: { 
          body: {
            freelancer_id: 1,
            ingresos_ult_6m: ingresosUlt6m,
            num_trabajos: numTrabajos
          }
        }
      });

      // Esperamos la respuesta y parseamos JSON
      const apiRes = await operation.response;
      const data = await apiRes.body.json() as unknown as Data;
      setScore(data.score);
      setModalVisible(true);

    } catch (err: any) {
      console.error(err);
      Alert.alert('Error', 'No fue posible calcular el score');
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const anchoBoton = screenWidth / 2;

  return (
    <View className="items-center mt-4">
      <TouchableOpacity
        onPress={handlePress}
        style={{
          width: anchoBoton,
          height: 100,
          backgroundColor: '#4EEE80',
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#1f2937', fontWeight: 'bold', textAlign: 'center' }}>
          Créditos
        </Text>
      </TouchableOpacity>

      <PerfilModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        score={score}
      />
    </View>
  );
}
