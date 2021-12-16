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
export const CardPerfil = ({ }) => {
    return (

        <View style={stylesCardPerfil.boxShadow}>
            <View style={stylesCardPerfil.headerContainer}>
                <Text style={stylesCardPerfil.headerTxt}>Mis datos</Text>
            </View>
            <View style={stylesCardPerfil.infoContainer}>
                <View style={stylesCardPerfil.iconContainer}>
                    <UserImg 
                    backColor={styleConst.MAINCOLORS[2]}
                    colorTxt='white'/>
                </View>
                <View style={stylesCardPerfil.headContainer}>
                    <Text style={stylesCardPerfil.cardHeadTxt}>Titular de la línea</Text>
                    <Text>'User'</Text>
                    <Text style={stylesCardPerfil.cardHeadTxt}>Número JR Movil</Text>
                    <Text>55 89 74 56 23</Text>
                    <Text style={stylesCardPerfil.cardHeadTxt}>Email</Text>
                    <Text>'User@hotmail.com'</Text>
                    <Text style={stylesCardPerfil.cardHeadTxt}>Contraseña</Text>
                    <Text>********</Text>
                </View>
            </View>
            <View style={stylesCardPerfil.btnContainer}>
                <IntentBtn
                intent='Editar perfil'
                    color={1}
                    btnText='Editar perfil'
                />
            </View>
        </View>

    );
}
export const CardPerfilInfo = ({ }) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    let agree = 'Sí'

    // Agree Validation
    if (!isEnabled)
        agree = 'No'
    return (

        <View style={stylesCardPerfil.boxShadow}>
            <View style={stylesCardPerfil.headerContainer}>
                <Text style={stylesCardPerfil.headerTxt}>¿Te gustaría recibir promociones?</Text>
            </View>
            <View style={stylesCardPerfil.infoContainer}>
                <View style={stylesCardPerfil.iconContainer}>
                    <Icon
                        name='bell'
                        type='font-awesome'
                        color={styleConst.MAINCOLORS[2]}
                    />
                </View>
                <SafeAreaView style={stylesCardPerfil.headContainer}>
                    <Text style={stylesCardPerfil.cardHeadTxt}>Estoy de acuerdo en recibir promociones e
                        información que JR Movil considere relevante enviarme;
                        ya sea por whatsapp o cualquier otro medio de difusión.
                    </Text>
                </SafeAreaView>
            </View>
            <View style={stylesCardPerfil.switchContainer}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text>{agree}</Text>
            </View>
            <View style={stylesCardPerfil.btnContainer}>
                <IntentBtn
                    color={1}
                    intent='guardar'
                    btnText='Guardar configuración'
                />
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
        borderBottomColor: styleConst.MAINCOLORSLIGHT[1]
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
    headerTxt: {
        color:styleConst.MAINCOLORSLIGHT[1],
        fontWeight:'bold'
    },
    cardHeadTxt: {
        color: styleConst.MAINCOLORSLIGHT[2],
        fontWeight: 'bold'
    },
    boxShadow: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
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
        <View style={styles.container} >
            <ReturnHeader title='Mi perfil' />
            <View style={{ paddingLeft: 15, marginTop: 35 }}>
                <Text>Aquí puedes modificar tus datos personales registrados en "JR Movil" y tu contraseña.</Text>
            </View>
            <CardPerfil />
            <CardPerfilInfo />
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

export default MiPerfil;