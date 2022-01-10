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

const Asistance = ({navigation}) => {
    // header, text, icon
    return (
        <View style={styles.container} >
            <ReturnHeader title='¿Te Podemos Ayudar?' navigation={navigation}/>
            <View style={{paddingLeft:15, marginTop:35}}>
                <Text>Estamos para atender cualquiera de tus dudas, 
                    aclaraciones o comentarios.</Text>
            </View>
            <TouchableOpacity onPress={ () => alert("hola")}>
            <Card header='Contáctanos' 
                text='Ponte en contacto, ¡estamos para ayudarte!'
                icon='user' />
            </TouchableOpacity >
            <TouchableOpacity onPress={ () => alert("hola")}>
            <Card header='Ayuda con la App' 
                text='Ponte en contacto, ¡estamos para ayudarte!'
                icon='life-ring' />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => alert("hola")}>
            <Card header='Preguntas Frecuentes' 
                text='Ponte en contacto, ¡estamos para ayudarte!'
                icon='question' />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => alert("hola")}>
            <Card header='Términos y Condiciones de Uso' 
                text='Ponte en contacto, ¡estamos para ayudarte!'
                icon='file' />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => alert("hola")}>
            <Card header='Avisos de Privacidad' 
                text='Ponte en contacto, ¡estamos para ayudarte!'
                icon='file' />
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