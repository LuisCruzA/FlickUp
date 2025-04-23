import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signIn } from 'aws-amplify/auth'

type Props = {
  onLogin: (u: { rol: 'cliente' | 'profesional' }) => void
  onRegisterRequest: () => void
}

const LoginScreen = ({ onLogin, onRegisterRequest }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      await signIn({ username: email, password })
      const rol: 'cliente' | 'profesional' = email.startsWith('C') ? 'cliente' : 'profesional'
      onLogin({ rol })
    } catch {
      alert('Usuario o contraseña incorrecta')
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="pt-24">
        <Text className="mb-8 py-4 text-center text-3xl font-bold">FlickUp</Text>
      </View>
      <Text className="text-center text-lg font-semibold">Iniciar sesión</Text>
      <Text className="mb-10 text-center text-sm text-gray-500">Inicia sesión en tu cuenta</Text>

      <Text className="mb-1 text-sm font-medium">Correo electrónico</Text>
      <TextInput
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="correo@ejemplo.com"
        onChangeText={setEmail}
        value={email}
      />

      <Text className="mb-1 text-sm font-medium">Contraseña</Text>
      <TextInput
        secureTextEntry
        className="mb-2 rounded-md border border-gray-300 px-4 py-2 text-sm"
        placeholder="Ingresa tu contraseña"
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity className="mb-4">
        <Text className="text-center text-sm text-blue-500">¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} className="mt-4 items-center rounded-md bg-blue-500 py-3">
        <Text className="text-lg font-bold text-white">Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRegisterRequest} className="mt-4">
        <Text className="text-center text-sm text-blue-500">Crear una cuenta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default LoginScreen
