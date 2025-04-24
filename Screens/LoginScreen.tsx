import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signIn, signOut, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { get } from 'aws-amplify/api';


type Rol = 'cliente' | 'profesional';

type Props = {
  onLogin: (u: { rol: Rol }) => void;
  onRegisterRequest: () => void;
};

export default function LoginScreen({ onLogin, onRegisterRequest }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
  
    try {
      await signOut({ global: true }).catch(() => {});
      const res = await signIn({ username: email.trim(), password });
      
      if (res.nextStep?.signInStep && res.nextStep.signInStep !== 'DONE') {
        alert('Completa el flujo de autenticación pendiente');
        return;
      }
      const { userId } = await getCurrentUser();
      
      const { tokens } = await fetchAuthSession({ forceRefresh: true });
      const accessToken = tokens?.accessToken?.toString();
      
      if (!accessToken) throw new Error('Token no disponible');
  
      const restOp = get({
        apiName: 'flickupApi',
        path: `/me/role?userId=${encodeURIComponent(userId)}`,
        options: {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      });
      
      const { body } = await restOp.response;
      const rolJson = await body.json() as unknown;
      console.log(body)
      console.log(rolJson)
      
      if (rolJson !== 'cliente' && rolJson !== 'profesional') {
        throw new Error('Rol inesperado en la respuesta');
      }
      
      onLogin({ rol: rolJson });
    } catch (err: any) {
      if (err.name === 'NotAuthorizedException') alert('Contraseña incorrecta');
      else if (err.name === 'UserNotFoundException') alert('El usuario no existe');
      else alert('Error: ' + (err.message ?? 'Desconocido'));
    } finally {
      setLoading(false);
    }
  };

  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="pt-24">
        <Text className="mb-8 py-4 text-center text-3xl font-bold">FlickUp</Text>
      </View>

      <Text className="text-center text-lg font-semibold">Iniciar sesión</Text>
      <Text className="mb-10 text-center text-sm text-gray-500">
        Inicia sesión en tu cuenta
      </Text>

      <Text className="mb-1 text-sm font-medium">Correo electrónico</Text>
      <TextInput
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="correo@ejemplo.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text className="mb-1 text-sm font-medium">Contraseña</Text>
      <TextInput
        secureTextEntry
        className="mb-2 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity className="mb-4">
        <Text className="text-center text-sm text-blue-500">
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className="mt-4 items-center rounded-md bg-blue-500 py-3 opacity-95"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-lg font-bold text-white">Iniciar sesión</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onRegisterRequest} className="mt-4">
        <Text className="text-center text-sm text-blue-500">
          Crear una cuenta
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}