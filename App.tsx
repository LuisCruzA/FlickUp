
import NavigationClient from './components/Cliente/NavigationClient';
import NavigationProfessional from './components/Professional/NavigationProfessional';

import './global.css';

export default function App() {
  
  let cliente: boolean=true;

  
  
  return (
  <>
  
    {cliente ? <NavigationClient/> : <NavigationProfessional/>}
    
  </> 

  
  
  );
}
//<ScreenContent title="Home" path="App.tsx" />
//    <StatusBar style="auto" />
