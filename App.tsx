import { useState } from 'react'
import NavigationClient from './components/Cliente/NavigationClient'
import NavigationProfessional from './components/Professional/NavigationProfessional'
import LoginScreen from 'Screens/LoginScreen'
import RegisterScreen from 'Screens/RegisterScreen'
import './global.css'

import { Amplify } from 'aws-amplify'
import amplifyconfig from './src/amplifyconfiguration.json'
Amplify.configure(amplifyconfig)

type Usuario = { rol: 'cliente' | 'profesional' }

export default function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [screen, setScreen] = useState<'login' | 'register'>('login')

  if (!usuario) {
    if (screen === 'login')
      return (
        <LoginScreen
          onLogin={setUsuario}
          onRegisterRequest={() => setScreen('register')}
        />
      )
    return (
      <RegisterScreen
        onSuccess={(u) => {
          setUsuario(u)
        }}
        onBack={() => setScreen('login')}
      />
    )
  }

  return usuario.rol === 'cliente' ? <NavigationClient /> : <NavigationProfessional />
}
