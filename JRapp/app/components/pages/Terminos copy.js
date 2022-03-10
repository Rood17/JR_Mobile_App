import React from 'react';

//import all the components we are going to use
import {SafeAreaView} from 'react-native';

import {WebView} from 'react-native-webview';
import { ReturnHeader, Loader } from '../elements/Elements';


const Terminos = () => {
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
      </SafeAreaView>
    );
  };
  
  export default Terminos;