import { useState } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import NavigationClient from './components/Cliente/NavigationClient';
import NavigationProfessional from './components/Professional/NavigationProfessional';
import LoginScreen from 'Screens/LoginScreen';
import './global.css';

Amplify.configure(awsconfig);

export default function App() {
  const [usuario, setUsuario] = useState<null | { rol: string }>(null);

  if (!usuario) return <LoginScreen onLogin={setUsuario} />;
  return usuario.rol === 'cliente' ? <NavigationClient /> : <NavigationProfessional />;
}
