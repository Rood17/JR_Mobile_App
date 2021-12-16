/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import type {Node} from 'react';
 import StatusBarHandler from './app/utils/StatusBarHandler';
 import Intro from './app/components/Intro'
 import Login from './app/components/auth/Login'
 import Register from './app/components/auth/Register'
 import RegisterSms from './app/components/auth/RegisterSms';
 import Register_2 from './app/components/auth/Register_2'
 import Asistance from './app/components/pages/Asistance'
 import Main from './app/components/Main'
 import MiPerfil from './app/components/pages/MiPerfil'
 import MiPerfil_2 from './app/components/pages/MiPerfil_2'
 import ForgottenPwd from './app/components/pages/ForgottenPwd'
 import Recharge from './app/components/Payments/Recharge';

 import {MAIN_CONTAINER_STYLE} from './app/res/values/styles/StylesConstants'
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Keyboard
 } from 'react-native';
 

 // Intro
 const App: () => Node = () => {

  const [showIntro, setShowIntro] = useState(false);

  setTimeout( () => {
    setShowIntro(false)
  }, 3000);


  // Auth
  //<Login/>
  //<Register/>
  //<RegisterSms/>
  //<Register_2/>
  //<ForgottenPwd/>

  // Sections
  //<Asistance/>
  //<Main/>
  //<Intro/>

  // Perfil
  //<MiPerfil>
  //<MiPerfil_2>

  // Pagos
  //<Recarga />


   return (
     <SafeAreaView style={MAIN_CONTAINER_STYLE}>
       <StatusBarHandler hideBar={true} />
       {showIntro ? <Intro/> : <Recharge />}
        
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
 });
 
 export default App;
 