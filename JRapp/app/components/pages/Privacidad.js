import React, {useState} from 'react';

//import all the components we are going to use
import { SafeAreaView} from 'react-native';

import { WebView } from 'react-native-webview';
import { ReturnHeader, Loader } from '../elements/Elements';

const Privacidad = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
          source={{ uri: 'https://jrmovil.com/privacy-policy/' }}
          style={{ marginTop: 20 }}
        />
      
      <ReturnHeader title='Regresar' navigation={navigation} />
    </SafeAreaView>
  );
};

export default Privacidad;