/**
 * -- Intro JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';

import DisplayLogo from './elements/DisplayLogo';
import IntentBtn from './elements/IntentBtn';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
} from 'react-native';


const Intro: () => Node = () => {

  const image = { require: '../res/drawable/background/bg_1.jpg' };
  const isDarkMode = useColorScheme() === 'dark';
  // console.log("Intro Log : " + MAIN_CONTAINER_STYLE)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'Colors.blu': 'Colors.lighter',
  };

  const goToIntent = () => {
    console.log("holaaaa 123")
  }

  return (
    <>
    <ImageBackground 
      source={require('../res/drawable/background/bg_2.jpg')}
      style={{width: '100%', height: '100%'}} >
      <View style={styles.logoContainer}>
       <DisplayLogo stylesLogo={styles.logo}/> 
      </View>
      <View style={styles.btnActionContainer}>
        <Text style={{fontWeight:'normal', fontSize:20}}>Cambiate de CHIP</Text>
      </View>
    </ImageBackground>
    </> 
  );
};

const styles = StyleSheet.create({
  container : {
    flex:1,    
  },
  logoContainer: {
    padding: 20,
    flex:6,
    flexDirection:'row',
    alignItems: 'center'
  },
  logo : {
    flex:1,
    height:100,
    margin: 20

  },
  btnActionContainer : {
    padding: 20,
    flex:2,
    alignItems:'flex-start',
    alignItems:'center'
  },
});

export default Intro;
