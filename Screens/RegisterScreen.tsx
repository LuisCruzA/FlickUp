import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signUp } from 'aws-amplify/auth';

type Rol = 'cliente' | 'profesional';

type Props = {
  onRegistered: (u: { username: string; rol: Rol }) => void;
  onBack: () => void;
};

export default function RegisterScreen({ onRegistered, onBack }: Props) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    rol: 'cliente' as Rol,
  });
  const [loading, setLoading] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: string) =>
    setForm({ ...form, [k]: v });

  const Radio = ({ value, label }: { value: Rol; label: string }) => (
    <Pressable
      onPress={() => update('rol', value)}
      className="mb-2 flex-row items-center"
    >
      <View
        className={`mr-2 h-5 w-5 rounded-full border border-gray-400 ${
          form.rol === value ? 'bg-blue-500' : 'bg-white'
        }`}
      />
      <Text className="text-sm">{label}</Text>
    </Pressable>
  );

  const handleRegister = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await signUp({
        username: form.email.trim(),          // ← correo == username
        password: form.password,
        options: {
          autoSignIn: { enabled: true },
          userAttributes: {
            email: form.email.trim(),
            phone_number: form.phone.trim(),
            given_name: form.firstName.trim(),
            family_name: form.lastName.trim(),
          },
          clientMetadata: { 
            role: form.rol,
          },
        },
      });

      onRegistered({ username: form.email.trim(), rol: form.rol });
    } catch (e: any) {
      console.log(e);
      alert('Error al registrar: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="pt-24">
        <Text className="mb-8 py-4 text-center text-3xl font-bold">FlickUp</Text>
      </View>

      <Text className="text-center text-lg font-semibold">Crear cuenta</Text>
      <Text className="mb-10 text-center text-sm text-gray-500">
        Regístrate con tus datos
      </Text>

      {/* ───── Nombre y Apellido ───── */}
      <Text className="mb-1 text-sm font-medium">Nombre</Text>
      <TextInput
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="Juan"
        onChangeText={(v) => update('firstName', v)}
        value={form.firstName}
      />

      <Text className="mb-1 text-sm font-medium">Apellido</Text>
      <TextInput
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="Pérez"
        onChangeText={(v) => update('lastName', v)}
        value={form.lastName}
      />

      {/* ───── Correo ───── */}
      <Text className="mb-1 text-sm font-medium">Correo electrónico</Text>
      <TextInput
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(v) => update('email', v)}
        value={form.email}
      />

      {/* ───── Teléfono ───── */}
      <Text className="mb-1 text-sm font-medium">Teléfono</Text>
      <TextInput
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="+5215555555555"
        keyboardType="phone-pad"
        onChangeText={(v) => update('phone', v)}
        value={form.phone}
      />

      {/* ───── Contraseña ───── */}
      <Text className="mb-1 text-sm font-medium">Contraseña</Text>
      <TextInput
        secureTextEntry
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="******"
        onChangeText={(v) => update('password', v)}
        value={form.password}
      />

      {/* ───── Selector de rol ───── */}
      <Text className="mb-1 text-sm font-medium">Tipo de cuenta</Text>
      <Radio value="cliente" label="Cliente" />
      <Radio value="profesional" label="Profesional" />

      {/* ───── Botón Registrar ───── */}
      <TouchableOpacity
        disabled={loading}
        onPress={handleRegister}
        className="mt-4 items-center rounded-md bg-blue-500 py-3"
      >
        <Text className="text-lg font-bold text-white">
          {loading ? 'Creando…' : 'Registrarse'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} className="mt-4">
        <Text className="text-center text-sm text-blue-500">
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
