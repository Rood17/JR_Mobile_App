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
import { Card, ReturnHeader } from "../elements/Elements";
import {
    Button,
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
    return (
        <View style={styles.container} >
            <ReturnHeader title='¿Te Podemos Ayudar?' navigation={navigation} />
            <View style={{ paddingLeft: 15, marginTop: 35 }}>
                <Text>Estamos para atender cualquiera de tus dudas,
                    aclaraciones o comentarios.</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Privacidad')}>
                <Card header='Ayuda con la App'
                    text='Ponte en contacto, ¡estamos para ayudarte!'
                    icon='life-ring' />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Faqs')}>
                <Card header='Faqs'
                    text='Preguntas frecuentes que nuestros clientes hacen.'
                    icon='question' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Privacidad')}>
                <Card header='Privacidad y Políticas de Uso de Datos'
                    text='Ponte en contacto, ¡estamos para ayudarte!'
                    icon='info-circle' />
            </TouchableOpacity >
            <TouchableOpacity onPress={() => navigation.navigate('Terminos')}>
                <Card header='Términos y Condiciones'
                    text='Ponte en contacto, ¡estamos para ayudarte!'
                    icon='info-circle' />
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