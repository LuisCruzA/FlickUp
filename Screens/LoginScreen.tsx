import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signIn, signOut } from 'aws-amplify/auth';

type Props = {
  onLogin: (u: { rol: 'cliente' | 'profesional' }) => void;
  onRegisterRequest: () => void;
};

const LoginScreen = ({ onLogin, onRegisterRequest }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /** Inicia sesión forzando la limpieza de cualquier token previo */
  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // 1 — Elimina refresh-tokens locales y remotos
      await signOut({ global: true }).catch(() => {});

      // 2 — Ahora sí valida la contraseña con Cognito
      const res = await signIn({ username: email.trim(), password });
      console.log('nextStep:', res.nextStep);

      if (res.nextStep?.signInStep && res.nextStep.signInStep !== 'DONE') {
        alert('Completa el flujo de autenticación pendiente');
        setLoading(false);
        return;
      }

      // ▸ Cambia esta lógica por la que uses realmente para el rol
      const rol: 'cliente' | 'profesional' =
        email.trim().toLowerCase().startsWith('l') ? 'cliente' : 'profesional';

      onLogin({ rol });
    } catch (err: any) {
      if (err.name === 'NotAuthorizedException')
        alert('Contraseña incorrecta');
      else if (err.name === 'UserNotFoundException')
        alert('El usuario no existe');
      else alert(`Error al iniciar sesión: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

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
};

export default LoginScreen;
