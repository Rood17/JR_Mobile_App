import React, { useState, useEffect, useContext } from 'react';

import DisplayLogo from '../elements/DisplayLogo';
import IntentBtn from '../elements/IntentBtn';
import { Icon, Input } from 'react-native-elements'
import { Loader, WarningAdvice, MainHeader, MainFooter, MainCard, SocialMainCard, ReturnHeader } from '../elements/Elements';
import * as styleConst from '../../res/values/styles/StylesConstants'
import * as constants from '../../utils/constants/Constants'
import { formatApiDate, setProductType } from '../../utils/Utils'
import UserContext from '../../../context/user/UserContext'
import PaquetesContext from '../../../context/paquetes/PaquetesContext';
// Services
import * as data from '../../utils/services/perfil_uf.json'

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';



const DetailLogOut = ({ navigation, route }) => {
    const { idSubscriber, UFuserData } = route.params;
    const { userData, getAPIUserData } = useContext(UserContext);
    const [isReady, setIsReady] = useState(false);


    useEffect(() => {
        getAPIUserData(idSubscriber).then((response) => {
            if ( response ){
                setIsReady(true)
            }
        })
    }, [userData])


    let simData, simSMS, simMIN = [0, 0, 0, 0, 0]


    if (isReady) {
        // Open the package
        if (userData != null && userData.simData != undefined) {
            //console.log("[Info] DetailLogOut - userData.simData : " + (userData.simData))
            if (userData.simData != undefined)
                simData = Object.values(userData.simData)
        }


        // Open the package
        if (userData != null && userData.simSMS != undefined)
            simSMS = userData.simSMS
    }

    const [gbProduct, setGbProduct] = useState()
    // Oferta actual
    const oferta = !simData ? 'Sin Plan' : simData[4]
    const expireMBData = !simData ? '' : simData[0]

    // MB
    const unsuedMBData = !simData ? '-' : simData[2]
    const totalMBData = !simData ? '-' : simData[1]

    //Validación vigencia - falta 999
    const validitNearDaysEnd = 5
    // respuesta Api
    // Just accept this format '2022/02/18'
    const validityUser = formatApiDate(expireMBData)
    const validityUserCode = validityUser.replace(/\//g, '')
    console.log("[Info] DetailLogOut - validityUser : " + validityUser)
    console.log("[Info] DetailLogOut - validityUserCode : " + validityUserCode)
    // si no tiene próxima recarga - vigencia
    let validityResponse = 'Vigencia: ' + validityUser
    let validityColor = styleConst.MAINCOLORSLIGHT[2]

    // Validity neast conditionals
    // If validity is end
    if (parseInt(validityUserCode) < constants.DATE_NOW_CODE) {
        validityResponse = 'SALDO VENCIDO';
        validityColor = styleConst.MAINCOLORS[1]
    }
    // If validity ends today
    else if (parseInt(validityUserCode) == constants.DATE_NOW_CODE) {
        validityResponse = '¡HOY VENCE TU SALDO!';
        validityColor = styleConst.MAINCOLORS[2]
    }
    // If validity is near to end
    else {
        if (parseInt(validityUserCode) - validitNearDaysEnd <= constants.DATE_NOW_CODE)
            if ((parseInt(validityUserCode) - constants.DATE_NOW_CODE) == 1)
                validityResponse = 'Tu saldo vence mañana'
            else
                validityResponse = 'Tu saldo vence en ' +
                    (parseInt(validityUserCode) - constants.DATE_NOW_CODE)
                    + ' días'
    }


    return (
        <>
            <View style={styles.container}>

                <ReturnHeader title='Detalles de tu Saldo' navigation={navigation} />
                <ScrollView style={styles.container}>
                    <View style={styles.numberContainer}>
                        <Icon
                            name='mobile'
                            type='font-awesome'
                            color={styleConst.MAINCOLORSLIGHT[1]}
                        />
                        <Text style={styles.number}>{idSubscriber}</Text>
                    </View>
                    <View>
                        {isReady ?
                            <MainCard
                                title={oferta}
                                subtitle={validityResponse}
                                subtitleColor={validityColor}
                                bodyHeadOne='MB Totales'
                                bodyHeadTwo='MB Disponibles'
                                dataOne={totalMBData}
                                dataTwo={unsuedMBData}
                                MBC='true'
                                text='Consumos de datos:'
                                isReady={isReady}
                            />
                            :
                            <Loader />
                        }


                        <View style={styles.infoNoRegisterTxt}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={{ textAlign: 'center' }}>
                                    Para más información
                                    <Text style={{ color: styleConst.MAINCOLORS[0] }}> Ingresa </Text>
                                    a tu "Cuenta".
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Register', {
                                                idSubscriber: idSubscriber,
                                                })}>
                                <Text style={{ textAlign: 'center' }}>
                                    O<Text style={{ color: styleConst.MAINCOLORS[0] }}> Regístrate Aquí. </Text>
                                    ¡Es gratuito!
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.btnsContainer}>
                                <View style={styles.btnAction}>
                                    <IntentBtn
                                        navigation={navigation}
                                        intent='Recharge'
                                        btnParams={{ idSubscriber: idSubscriber, isRegister: false, isJr: true }}
                                        btnText='Recarga' />
                                </View>
                            </View>
                        </View>



                    </View>
                </ScrollView>

            </View>


        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    numberContainer: {
        flexDirection: 'row',
        margin: 25,
        alignItems: 'center',
    },
    btnsContainer: {
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
    },
    btnAction: {
        margin: 5,
        flex: 1
    },
    productTitleContiner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 35,
        marginBottom: 30
    },
    number: {
        marginLeft: 15,
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 18
    },
    infoNoRegisterTxt: {
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20,
        marginTop: 20,
        alignItems: 'center',
    },
});

export default DetailLogOut;