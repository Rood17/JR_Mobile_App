import React from 'react';

//import all the components we are going to use
import { SafeAreaView } from 'react-native';

import { WebView } from 'react-native-webview';
import { ReturnHeader } from '../elements/Elements';

const Faqs = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                source={{ uri: 'https://jrmovil.com/preguntas-frecuentes/' }}
                style={{ marginTop: 20 }}
            />
            <ReturnHeader title='Regresar' navigation={navigation} />
        </SafeAreaView>
    );
};

export default Faqs;