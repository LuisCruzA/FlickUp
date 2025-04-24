import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { confirmSignUp, signIn, getCurrentUser } from 'aws-amplify/auth';

type Props = {
  username: string;
  rol: 'cliente' | 'profesional';
  onConfirmed: (u: { rol: 'cliente' | 'profesional' }) => void;
  onBack: () => void;
};

export default function ConfirmCodeScreen({ username, rol, onConfirmed, onBack }: Props) {
  const [code, setCode] = useState('');

  const handleConfirm = async () => {
    try {
        await confirmSignUp({
            username,
            confirmationCode: code,
            options: { clientMetadata: { role: rol } },
          });
          
          // Cognito ya inició sesión → obtén el usuario actual
          const user = await getCurrentUser();
          if (user) onConfirmed({ rol });
    } catch (e: any) {
      alert('Código incorrecto o expirado');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="pt-24">
        <Text className="mb-8 py-4 text-center text-3xl font-bold">FlickUp</Text>
      </View>

      <Text className="text-center text-lg font-semibold">Verifica tu cuenta</Text>
      <Text className="mb-6 text-center text-sm text-gray-500">
        Revisa tu correo o SMS e ingresa el código
      </Text>

      <TextInput
        keyboardType="number-pad"
        maxLength={6}
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 text-center text-xl tracking-widest"
        placeholder="123456"
        onChangeText={setCode}
        value={code}
      />

      <TouchableOpacity
        onPress={handleConfirm}
        className="mt-2 items-center rounded-md bg-blue-500 py-3"
      >
        <Text className="text-lg font-bold text-white">Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} className="mt-4">
        <Text className="text-center text-sm text-blue-500">
          Volver
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
