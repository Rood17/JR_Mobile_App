import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { UserImg, ReturnHeader } from "../elements/Elements";
import { Icon, Input } from 'react-native-elements'
import * as styleConst from '../../res/values/styles/StylesConstants'
import IntentBtn from '../elements/IntentBtn'
import { getUserName,  getUserEmail, getUserId, } from '../../utils/Storage'
import {get_notification_status, set_notification_status} from '../../utils/services/get_services'

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
export const CardPerfil = ({ navigation }) => {
    const letter = getUserName().slice(0, 1 - getUserName().length);
    return (

        <View style={stylesCardPerfil.boxShadow}>
            <View style={stylesCardPerfil.headerContainer}>
                <Text style={stylesCardPerfil.headerTxt}>Mis datos</Text>
            </View>
            <View style={stylesCardPerfil.infoContainer}>
                <View style={stylesCardPerfil.iconContainer}>
                    <UserImg 
                    txt={letter}
                    backColor={styleConst.MAINCOLORS[2]}
                    colorTxt='white'/>
                </View>
                <View style={stylesCardPerfil.headContainer}>
                    <Text style={stylesCardPerfil.cardHeadTxt}>Titular de la línea</Text>
                    <Text>{getUserName()}</Text>
                    <Text style={stylesCardPerfil.cardHeadTxt}>Número JRmóvil</Text>
                    <Text>{getUserId()}</Text>
                    <Text style={stylesCardPerfil.cardHeadTxt}>Email</Text>
                    <Text>{getUserEmail()}</Text>
                    <Text style={stylesCardPerfil.cardHeadTxt}>Contraseña</Text>
                    <Text style={{color:styleConst.SECONDARY_TXT_COLOR}}>********</Text>
                </View>
            </View>
            <View style={stylesCardPerfil.btnContainer}>
                <IntentBtn
                    intent='MiPerfil_2'
                    navigation={navigation} 
                    color={1}
                    btnText='Editar perfil'
                />
            </View>
        </View>

    );
}
export const CardPerfilInfo = ({navigation }) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const idSubscriber = getUserId()
    let agree;

    // Init
    useEffect(() => {
        let myPromise = new Promise(function (resolve) {
            resolve(get_notification_status(idSubscriber))
        })
        const notificationStatusStart = myPromise.then(
            (result) => setIsEnabled(result)
        )
    }, [])

    // Agree Validation
    isEnabled ?  agree = 'Sí' : agree = 'No'


    
    const notificationHandler = () => {
        set_notification_status(idSubscriber, isEnabled)
        navigation.navigate('Main')
    }
    
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
                        información que JRmóvil considere relevante enviarme;
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
                <Text style={{color:styleConst.SECONDARY_TXT_COLOR}}>{agree}</Text>
            </View>
            <View style={stylesCardPerfil.btnContainer}>
                <Button
                //style={stylesBtn == null ? btnNormal() : stylesBtn}
                onPress={() => notificationHandler()}
                title='Guardar Configuración'
                color={styleConst.MAINCOLORSLIGHT[1]}
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
        color: styleConst.SECONDARY_TXT_COLOR,
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

const MiPerfil = ({navigation}) => {
    // header, text, icon
    return (
        <View style={styles.container} >
            <ReturnHeader title='Mi perfil' navigation={navigation} />
            <View style={{ paddingLeft: 15, marginTop: 35 }}>
                <Text>Aquí puedes modificar tus datos personales registrados en "JRmóvil" y tu contraseña.</Text>
            </View>
            <CardPerfil navigation={navigation} />
            <CardPerfilInfo 
                navigation={navigation}
            />
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