/**
 * -- Intro JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type { Node } from 'react';

import DisplayLogo from './elements/DisplayLogo';
import IntentBtn from './elements/IntentBtn';

import {
  Animated,
  SafeAreaView,
  ScrollView,
  Easing,
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

  const [ animacion ] = useState( new Animated.Value(-500) );

    useEffect(() => {
        Animated.timing(
            animacion, {
                toValue: 0,  // al valor al que llega
                duration: 700, // cantidad de tiempo en llegar
                easing: Easing.ease
            }
        ).start(); // iniciar la animación
    }, []);

  return (
    <>
    <ImageBackground 
      source={require('../res/drawable/background/bg_2.jpg')}
      style={{width: '100%', height: '100%'}} >
      <View style={styles.logoContainer}>
       {/*<DisplayLogo stylesLogo={styles.logo}/>*/}
       <Animated.Image
            source={require('../res/drawable/logo/jrlogo_2.png')}
            style={[{
                left: animacion,
            }, styles.logo]}
        >
        </Animated.Image>

      </View>
      <View style={styles.btnActionContainer}>
        <Text style={{fontWeight:'600', fontSize:30, color:'black'}}></Text>
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
    alignItems: 'center',
  },
  logo : {
    flex:1,
    height:100,
    margin: 20,
    marginTop:80

  },
  btnActionContainer : {
    padding: 20,
    flex:3,
    alignItems:'flex-start',
    alignItems:'center'
  },
});

export default Intro;
