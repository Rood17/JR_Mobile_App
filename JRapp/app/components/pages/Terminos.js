import React from 'react';

//import all the components we are going to use
import {SafeAreaView} from 'react-native';
import { ReturnHeader, Loader } from '../elements/Elements';

import {WebView} from 'react-native-webview';


const Terminos = ({navigation}) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <WebView
          source={{uri: 'https://jrmovil.com/terminos-condiciones/'}}
          style={{marginTop: 20}}
          startInLoadingState={true}
                mixedContentMode={"always"}
                allowsBackForwardNavigationGestures={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                
                renderLoading={() => 
                <>
                <Loader marginTop={1}/>
                </>}
        />
        <ReturnHeader title='Regresar' navigation={navigation}/>
      </SafeAreaView>
    );
  };
  
  export default Terminos;