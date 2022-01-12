import React from 'react';

//import all the components we are going to use
import { SafeAreaView } from 'react-native';

import { WebView } from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo";
import { ReturnHeader } from '../elements/Elements';

const Faqs = ({ navigation }) => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        
        if ( !state.isConnected )
            alert("Favor de revisar su conexión a internet.")

    });

    // Unsubscribe
    unsubscribe();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                source={{ uri: 'https://jrmovil.com/faq/' }}
                style={{ marginTop: 20 }}
            />
            <ReturnHeader title='Regresar' navigation={navigation} />
        </SafeAreaView>
    );
};

export default Faqs;