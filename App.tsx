
import NavigationProfessional from './components/Professional/NavigationProfessional';
import NavigationClient from './components/Cliente/NavigationClient';

import './global.css';

export default function App() {
  
  let cliente: boolean=false;

  
  
  return (
  <>
  
    {cliente ? <NavigationClient/> : <NavigationProfessional/>}
    
  </> 

  
  
  );
}
//<ScreenContent title="Home" path="App.tsx" />
//    <StatusBar style="auto" />
