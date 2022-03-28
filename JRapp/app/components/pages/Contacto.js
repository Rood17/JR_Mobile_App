import React, {useState} from 'react';

//import all the components we are going to use
import { SafeAreaView, View} from 'react-native';

import { WebView } from 'react-native-webview';
import { ReturnHeader, Loader } from '../elements/Elements';
import { LOG_INFO } from '../../res/values/strings/Strings';
import NetInfo from "@react-native-community/netinfo";

const Contacto = ({ navigation }) => {

    const [loading, setIsLoading] = useState(true);
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
        console.log(LOG_INFO('Contacto', 'state.type'), state.type);
        console.log(LOG_INFO('Contacto', 'state.isConnected'), state.isConnected);

        if ( !state.isConnected )
            console.error("[Error] Favor de revisar su conexión a internet.")
    });

    // Unsubscribe
    unsubscribe();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                onLoad={() => setIsLoading(false)}
                source={{ uri: 'https://jrmovil.com/contact/' }}
                style={{ marginTop: 20 }}
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
            <ReturnHeader title='Regresar' navigation={navigation} />
        </SafeAreaView>
    );
};

export default Contacto;