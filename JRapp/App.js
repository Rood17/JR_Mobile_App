/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import StatusBarHandler from './app/utils/StatusBarHandler';

// Views
import Intro from './app/components/Intro'
import Login from './app/components/auth/Login'
import Register from './app/components/auth/Register'
import RegisterSms from './app/components/auth/RegisterSms';
import RegisterSms2 from './app/components/auth/RegisterSms2';
import Register_2 from './app/components/auth/Register_2'
import Asistance from './app/components/pages/Asistance'
import Main from './app/components/Main'
import MiPerfil from './app/components/pages/MiPerfil'
import MiPerfil_2 from './app/components/pages/MiPerfil_2'
import ForgottenPwd from './app/components/pages/ForgottenPwd'
import Recharge from './app/components/Payments/Recharge';
import Recharge_2 from './app/components/Payments/Recharge_2'
import Recharge_3 from './app/components/Payments/Recharge_3'
import Details from './app/components/Details/Details'
import Privacidad from './app/components/pages/Privacidad'
import Terminos from './app/components/pages/Terminos';
import Contacto from './app/components/pages/Contacto'
import Faqs from './app/components/pages/Faqs';
import DetailLogOut from './app/components/Details/DetailLogOut';
import RegisterSuccess from './app/components/auth/RegisterSuccess';

import { isUserLog } from './app/context/AuthProvider';

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FirebaseState from './context/firebase/FirebaseState';
import UserState from './context/user/UserState';
import RecargasState from './context/recargas/RecargasState';
import PaquetesState from './context/paquetes/PaquetesState';


import { MAIN_CONTAINER_STYLE } from './app/res/values/styles/StylesConstants'
import {
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';


const Stack = createNativeStackNavigator();

// IUserRegister?
const UserLogged = () => {
  return (
    <>
      <Stack.Screen name={initRoute} component={initComponent} options={{
        // When logging out, a pop animation feels intuitive
        // You can remove this if you want the default 'push' animation
        animationTypeForReplace: 'pop',
      }} />
    </>
  )
}

// Intro
const App: () => Node = () => {

  const [showIntro, setShowIntro] = useState(true);

  setTimeout(() => {
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
  //<Recharge />
  //<Recharge_2 />
  //<Recharge_3 />

  // Details
  // Is User logeIn
  const userLogged = isUserLog()
  console.log('userLogged : ' + userLogged)

  return (
    <>
      <UserState>
        <PaquetesState>
        <RecargasState>
        <NavigationContainer>
          <SafeAreaView style={MAIN_CONTAINER_STYLE}>
            <StatusBarHandler hideBar={true} />
            <Stack.Navigator initialRouteName={'Intro'} screenOptions={{ headerShown: false }}>

              {userLogged ?
                <>

                  <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
                  <Stack.Screen name="Main" component={Main} />
                  <Stack.Screen name="MiPerfil" component={MiPerfil} />
                  <Stack.Screen name="MiPerfil_2" component={MiPerfil_2} />
                  <Stack.Screen name="Details" component={Details} />
                </>
                :
                <>
                  {showIntro ?
                    <Stack.Screen name="Intro" component={Intro} />
                    : null}
                  <Stack.Screen name='Login' component={Login} options={{
                    // When logging out, a pop animation feels intuitive
                    // You can remove this if you want the default 'push' animation
                    animationTypeForReplace: 'pop',
                  }} />
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="RegisterSms" component={RegisterSms} />

                  <Stack.Screen name="Register_2" component={Register_2} />
                  <Stack.Screen name="DetailLogOut" component={DetailLogOut} />
                  <Stack.Screen name="ForgottenPwd" component={ForgottenPwd} />
                </>
              }


              <Stack.Screen name="Asistance" component={Asistance} />

              <Stack.Screen name="Recharge" component={Recharge} />
              <Stack.Screen name="Recharge_2" component={Recharge_2} />
              <Stack.Screen name="Recharge_3" component={Recharge_3} />

              <Stack.Screen name="Privacidad" component={Privacidad} />
              <Stack.Screen name="Terminos" component={Terminos} />
              <Stack.Screen name="Contacto" component={Contacto} />
              <Stack.Screen name="Faqs" component={Faqs} />

            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
        </RecargasState>
        </PaquetesState>
      </UserState>
    </>
  );
};

const styles = StyleSheet.create({
});

export default App;
