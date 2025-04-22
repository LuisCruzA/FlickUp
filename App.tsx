import NavigationClient from './components/Cliente/NavigationClient';
import NavigationProfessional from './components/Professional/NavigationProfessional';
import { useState } from 'react';
import LoginScreen from 'Screens/LoginScreen';
import './global.css';

export default function App() {
  const [usuario, setUsuario] = useState<null | { rol: string }>(null);

  if (!usuario) return <LoginScreen onLogin={setUsuario} />;

  return usuario.rol === 'cliente' ? <NavigationClient /> : <NavigationProfessional />;
}
