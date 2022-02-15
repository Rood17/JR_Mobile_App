/**
 * -- Asistance JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { Divider } from 'react-native-elements';
import { Card, ReturnHeader } from "../elements/Elements";
import {CALL_WHATSAPP} from '../../../types'
import {
    Linking,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
} from 'react-native';

const Asistance = ({ navigation }) => {
    // header, text, icon
    let whatsAppMsg = 'Hola, podría ayudarme :)';
    let mobileNumber = CALL_WHATSAPP;
    const initiateWhatsApp = () => {
        let url =
          'whatsapp://send?text=' + 
           whatsAppMsg +
          '&phone=52' + mobileNumber;
        Linking.openURL(url)
          .then((data) => {
            console.log('WhatsApp Opened');
          })
          .catch(() => {
            alert('Make sure Whatsapp installed on your device');
          });
      };
    return (
        <View style={styles.container} >
            <ReturnHeader title='¿Te Podemos Ayudar?' navigation={navigation} />
            <View style={{ paddingLeft: 15, marginTop: 35 }}>
                <Text>Estamos para atender cualquiera de tus dudas,
                    aclaraciones o comentarios.</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Contacto')}>
                <Card header='Contacto y/o Ayuda con la App'
                    text='Ponte en contacto, ¡estamos para ayudarte!'
                    icon='life-ring' />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Faqs')}>
                <Card header='Faqs'
                    text='Preguntas frecuentes.'
                    icon='question' />
            </TouchableOpacity>
            <Divider style={{marginTop:20, marginBottom:15}}/>
            <TouchableOpacity onPress={() => navigation.navigate('Privacidad')}>
                <Card header='Privacidad y Políticas de Uso de Datos'
                    text='Nos interesa tu privacidad.'
                    icon='info-circle' />
            </TouchableOpacity >
            <TouchableOpacity onPress={() => navigation.navigate('Terminos')}>
                <Card header='Términos y Condiciones'
                    text='Nos interesa tu privacidad.'
                    icon='info-circle' />
            </TouchableOpacity>
            <Divider style={{marginTop:20, marginBottom:15}}/>
            <TouchableOpacity onPress={() => initiateWhatsApp()}>
                <Card header='WhatsApp'
                    text='Ponte en contacto, ¡estamos para ayudarte!'
                    icon='whatsapp'
                    social
                />
            </TouchableOpacity>
            
            

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        padding: 20,
        flex: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        flex: 1,
        height: 100,
        margin: 20

    },
    btnActionContainer: {
        padding: 20,
        flex: 2,
        alignItems: 'center'
    },
});

export default Asistance;