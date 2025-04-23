
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signUp } from 'aws-amplify/auth'

type Props = {
  onSuccess: (u: { rol: 'cliente' | 'profesional' }) => void
  onBack: () => void
}

const RegisterScreen = ({ onSuccess, onBack }: Props) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    rol: 'cliente' as 'cliente' | 'profesional',
  })

  const update = (k: string, v: string) => setForm({ ...form, [k]: v })

  const handleRegister = async () => {
    try {
      await signUp({
        username: form.username,
        password: form.password,
        options: {
          userAttributes: {
            email: form.email,
            phone_number: form.phone,
          },
          autoSignIn: true,
        },
      })
      onSuccess({ rol: form.rol })
    } catch {
      alert('Error al registrar usuario')
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="pt-24">
        <Text className="mb-8 py-4 text-center text-3xl font-bold">FlickUp</Text>
      </View>
      <Text className="text-center text-lg font-semibold">Crear cuenta</Text>
      <Text className="mb-10 text-center text-sm text-gray-500">Regístrate con tus datos</Text>

      <Text className="mb-1 text-sm font-medium">Usuario</Text>
      <TextInput
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="Nombre de usuario"
        onChangeText={(v) => update('username', v)}
        value={form.username}
      />

      <Text className="mb-1 text-sm font-medium">Correo electrónico</Text>
      <TextInput
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="correo@ejemplo.com"
        onChangeText={(v) => update('email', v)}
        value={form.email}
      />

      <Text className="mb-1 text-sm font-medium">Teléfono</Text>
      <TextInput
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="+5215555555555"
        onChangeText={(v) => update('phone', v)}
        value={form.phone}
      />

      <Text className="mb-1 text-sm font-medium">Contraseña</Text>
      <TextInput
        secureTextEntry
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="******"
        onChangeText={(v) => update('password', v)}
        value={form.password}
      />

      <TouchableOpacity onPress={handleRegister} className="mt-4 items-center rounded-md bg-blue-500 py-3">
        <Text className="text-lg font-bold text-white">Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} className="mt-4">
        <Text className="text-center text-sm text-blue-500">¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default RegisterScreen
