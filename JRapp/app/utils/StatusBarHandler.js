/**
 * -- Status Bar Style Handler - JR App --
 *
 */
import * as styleConst from '../res/values/styles/StylesConstants'
import React, { useState } from 'react';
import { Button, Platform, useColorScheme, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';



const StatusBarHandler = ({hideBar}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [statusBarStyle, setStatusBarStyle] = useState(styleConst.STYLES[0]);
    const [statusBarTransition, setStatusBarTransition] = useState(styleConst.TRANSITIONS[0]);
  
  
    const StatusBarStyle = () => {
      if (isDarkMode) {
        setStatusBarStyle(styleConst.STYLES[1]);
      } else 
          if ( !isDarkMode ){
            setStatusBarStyle(styleConst.STYLES[2]);
      } else {
        setStatusBarStyle(styleConst.STYLES[0]);
      }
    };
  
    const StatusBarTransition = () => {
      setStatusBarTransition(styleConst.TRANSITIONS[0]);
    };
  
    return (
        <StatusBar
          animated={true}
          backgroundColor={styleConst.MAINCOLORS[0]}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hideBar} />
    );
  };
  
  export default StatusBarHandler;