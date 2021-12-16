/**
 * -- Asistance JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import { UserImg, ReturnHeader } from "../elements/Elements";
import { Icon, Input } from 'react-native-elements'
import * as styleConst from '../../res/values/styles/StylesConstants'
import IntentBtn from '../elements/IntentBtn'
import * as constants from '../../utils/constants/Constants'
import { NewPwd } from '../auth/Register_2';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Switch,
    TouchableOpacity,
} from 'react-native';

// Card
export const CardPerfil = () => {
    return (

        <View style={stylesCardPerfil.boxShadow}>
            <View style={stylesCardPerfil.headerContainer}>
                <View style={stylesCardPerfil.iconContainer}>
                    <UserImg
                        medium
                        backColor={styleConst.MAINCOLORS[2]}
                        colorTxt='white' />
                </View>
            </View>
            <View style={stylesCardPerfil.infoContainer}>

                <View style={stylesCardPerfil.headContainer}>
                    <Input
                        placeholder="[Cargar nombre del usuario]"
                        autoComplete='name'
                        secureTextEntry={false}
                        leftIcon={{ type: 'font-awesome', name: 'user', size:18, color:'grey' }}
                        onChangeText={text => onChangeName(text)}
                    />
                    <Input
                        placeholder="Apellido(s)"
                        secureTextEntry={false}
                        leftIcon={{ type: 'font-awesome', name: 'user', size:18, color:'grey'  }}
                        onChangeText={text => onChangeLastName(text)}
                    />
                    <Input
                        placeholder="[Cargar email del usuario]"
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        secureTextEntry={false}
                        autoComplete='email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope', size:18, color:'grey'  }}
                    />
                    <View style={stylesCardPerfil.pwdContainer}>
                        <Text>Cambio de Contraseña</Text>
                    </View>
                    <Input
                        placeholder="Introducir Actual contraseña"
                        textContentType='password'
                        maxLength={constants.MAX_NUMBER_LENGTH}
                        secureTextEntry={true}
                        leftIcon={{ type: 'font-awesome', name: 'lock', size:18, color:'grey'  }}
                        color={styleConst.MAINCOLORS[1]}
                        onChangeText={text => onChangeText(text)}
                    />
                    <NewPwd 
                    emailPass={false}
                    goToIntent='guardar'
                    btnTxt='Guardar'
                    label='Ingrese Nueva Contraseña'
                    />


                </View>
                <View>
                    
                </View>
            </View>
        </View>

    );
}

const stylesCardPerfil = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        margin: 15,
        borderBottomWidth: .5,
        borderBottomColor: styleConst.MAINCOLORSLIGHT[1],
        alignItems: 'center',
    },
    iconContainer: {
        padding: 15,
    },
    headContainer: {
        padding: 15,
        flex: 1,
        textAlign: 'justify'
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    btnContainer: {
        flexDirection: 'column',
        margin: 15
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pwdContainer:{
        marginTop: 30,
        marginLeft: 0,
        marginRight: 20,
        marginBottom: 30,
        borderBottomWidth: .5,
        borderBottomColor: styleConst.MAINCOLORSLIGHT[1],
    },
    headerTxt: {
        color: styleConst.MAINCOLORSLIGHT[1],
        fontWeight: 'bold'
    },
    cardHeadTxt: {
        color: styleConst.MAINCOLORSLIGHT[2],
        fontWeight: 'bold'
    },
    boxShadow: {
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 30,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        flexDirection: 'column'
    }
});
// END Card

const MiPerfil = () => {
    // header, text, icon
    return (
        <ScrollView style={styles.container} >
            <ReturnHeader title='Administrar mi perfil' />
            <CardPerfil />
        </ScrollView>

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

export default MiPerfil;