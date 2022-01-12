import React from 'react';

//import all the components we are going to use
import {SafeAreaView} from 'react-native';

import {WebView} from 'react-native-webview';


const Terminos = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <WebView
          source={{uri: 'https://jrmovil.com/terminos-condiciones/'}}
          style={{marginTop: 20}}
        />
      </SafeAreaView>
    );
  };
  
  export default Terminos;