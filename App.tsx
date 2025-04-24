import { useState } from 'react'
import NavigationClient from './components/Cliente/NavigationClient'
import NavigationProfessional from './components/Professional/NavigationProfessional'
import LoginScreen from 'Screens/LoginScreen'
import RegisterScreen from 'Screens/RegisterScreen'
import ConfirmCodeScreen from 'Screens/ConfirmCodeScreen'
import './global.css'

import { Amplify } from 'aws-amplify'
import amplifyconfig from './src/amplifyconfiguration.json'
Amplify.configure(amplifyconfig)

type Usuario = { rol: 'cliente' | 'profesional' }

export default function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [screen, setScreen] = useState<'login'|'register'|'confirm'>('login');
  const [pending, setPending] = useState<{username:string; rol:'cliente'|'profesional'}|null>(null);


  if (!usuario) {
    if (screen === 'login')
      return (
        <LoginScreen
          onLogin={setUsuario}
          onRegisterRequest={() => setScreen('register')}
        />
      );
    if (screen === 'register')
        return (
          <RegisterScreen
            onRegistered={(u)=>{ setPending(u); setScreen('confirm'); }}
            onBack={()=>setScreen('login')}
          />
        );
    return (
        <ConfirmCodeScreen
          username={pending!.username}
          rol={pending!.rol}
          onConfirmed={(u)=>setUsuario(u)}
          onBack={()=>setScreen('register')}
        />
      );
  }

  return usuario.rol === 'cliente' ? <NavigationClient /> : <NavigationProfessional />
}
