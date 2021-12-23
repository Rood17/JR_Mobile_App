/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import StatusBarHandler from './app/utils/StatusBarHandler';

// Views
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
import Recharge_2 from './app/components/Payments/Recharge_2'
import Recharge_3 from './app/components/Payments/Recharge_3'

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { MAIN_CONTAINER_STYLE } from './app/res/values/styles/StylesConstants'
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


const Stack = createNativeStackNavigator();

// Intro
const App: () => Node = () => {

  const [showIntro, setShowIntro] = useState(false);

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


  return (

    <NavigationContainer>
      <SafeAreaView style={MAIN_CONTAINER_STYLE}>
        <StatusBarHandler hideBar={true} />

        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          {
            showIntro ?
              <Stack.Screen name="Intro" component={Intro} />
              :
              <Stack.Screen name="Login" component={Login} />
          }
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RegisterSms" component={RegisterSms} />
          <Stack.Screen name="Register_2" component={Register_2} />
          <Stack.Screen name="ForgottenPwd" component={ForgottenPwd} />
          <Stack.Screen name="Asistance" component={Asistance} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="MiPerfil" component={MiPerfil} />
          <Stack.Screen name="MiPerfil_2" component={MiPerfil_2} />
          <Stack.Screen name="Recharge" component={Recharge} />
          <Stack.Screen name="Recharge_2" component={Recharge_2} />
          <Stack.Screen name="Recharge_3" component={Recharge_3} />   
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
});

export default App;
