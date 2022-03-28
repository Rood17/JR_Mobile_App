import React from 'react';
import * as styleConst from '../../res/values/styles/StylesConstants'
import { Divider } from 'react-native-elements';
import { Card, ReturnHeader } from "../elements/Elements";
import {CALL_WHATSAPP} from '../../../types'
import { LOG_INFO } from '../../res/values/strings';
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

/**
 * Componente ASISTANCE - HELP
 * @param {navigation}
 * @returns Asistance
 */
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
            console.log('[Info] - Asistance - WhatsApp Opened');
          })
          .catch(() => {
            alert('Asegurate de tener instalado Whatsapp.');
          });
      };
    return (
        <View style={styles.container} >
            <ReturnHeader title='¿Te Podemos Ayudar?' navigation={navigation} />
            <View style={{ paddingLeft: 15, marginTop: 35 }}>
                <Text style={styles.text}>Estamos para atender cualquiera de tus dudas,
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
    text:{
        color:styleConst.JRGREY,
    }
});

export default Asistance;