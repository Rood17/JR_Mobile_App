/**
 * -- Main - JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';

import DisplayLogo from './elements/DisplayLogo';
import IntentBtn from './elements/IntentBtn';
import { Icon, Input } from 'react-native-elements'
import { WarningAdvice, MainHeader, MainFooter, MainCard, SocialMainCard, ReturnHeader } from './elements/Elements';
import * as styleConst from '../res/values/styles/StylesConstants'
import * as constants from '../utils/constants/Constants'
import { formatApiDate, setProductType } from '../utils/Utils'
import { OverlayModal } from '../components/Payments/Recharge'
import MiPerfil from './pages/MiPerfil';
import Asistance from './pages/Asistance';
// Services
import * as data from '../utils/services/perfil_uf.json'

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

let globalRoute


// Drawer
function CustomDrawerContent(props) {

    const goToIntent = (intent) => {

        if ( intent === 'Recharge')
            props.navigation.navigate(intent, {
                idSubscriber: globalRoute.params.idSubscriber,
                isRegister: true,
                isJr: true,

            })
        else if (intent === 'Cerrar')
            props.navigation.popToTop()
        else
            props.navigation.navigate(intent)

        props.navigation.closeDrawer();
    }
    return (
        <>
            <View >
                <View style={{ height: '28%', margin: 20, alignItems: 'center', alignContent: 'center' }}>
                    <DisplayLogo stylesLogo={{ height: '55%', width: '55%', margin: 10 }} mini />
                    <Text>Hola [Nombre]</Text>
                    <Text>{globalRoute.params.idSubscriber}</Text>
                </View>
                <View style={stylesNav.line}></View>
                <TouchableOpacity style={stylesNav.navBtn} onPress={() => goToIntent('MiPerfil')}>
                    <Icon
                        name='user'
                        type='font-awesome'
                        size={20}
                        color={styleConst.MAINCOLORSLIGHT[1]}
                    />
                    <Text style={stylesNav.txtIcon}>Mi Perfil</Text>
                </TouchableOpacity>


                <TouchableOpacity style={stylesNav.navBtn} onPress={() => goToIntent('Recharge')}>
                    <Icon
                        name='mobile'
                        type='font-awesome'
                        color={styleConst.MAINCOLORSLIGHT[1]}
                    />
                    <Text style={stylesNav.txtIcon}>Recargas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesNav.navBtn} onPress={() => goToIntent('Asistance')}>
                    <Icon
                        name='question'
                        type='font-awesome'
                        color={styleConst.MAINCOLORSLIGHT[1]}
                    />
                    <Text style={stylesNav.txtIcon}>Ayuda</Text>
                </TouchableOpacity>
                <View style={stylesNav.line}></View>
                <TouchableOpacity style={stylesNav.navBtn} onPress={() => goToIntent('Cerrar')}>
                    <Icon
                        name='sign-out'
                        type='font-awesome'
                        color={styleConst.MAINCOLORSLIGHT[1]}
                    />
                    <Text style={stylesNav.txtIcon}>Cerrar Sesión</Text>
                </TouchableOpacity>
                <View style={stylesNav.line}></View>
                <View style={{ marginTop: 100 }}>
                    <TouchableOpacity style={stylesNav.navBtn2}>
                        <Text style={stylesNav.txtA}>Terminos y Condiciones</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesNav.navBtn2}>
                        <Text style={stylesNav.txtA}>Aviso de Privacidad</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesNav.navBtn2}>
                        <Text style={stylesNav.txtA}>Política de Uso de Datos</Text>
                    </TouchableOpacity>

                    <Text style={{ margin: 10, marginTop: 20, color: 'black' }}>@2022 JR Movil S.A. de C.V.</Text>
                </View>


            </View>

        </>
    );
}
const Drawer = createDrawerNavigator();
const stylesNav = StyleSheet.create({
    navBtn: {
        margin: 20,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    navBtn2: {
        margin: 5,
        marginLeft: 20,
    },
    line: {
        backgroundColor: styleConst.MAINCOLORSLIGHT[1],
        height: 1
    },
    txtA: {
        color:styleConst.COLOR_LINK[0]
    },
    txtIcon: {
        marginLeft:15
    }
})
function MyDrawer() {
    return (
        <Drawer.Navigator
            screenOptions={{ drawerPosition: 'right', width: 200 }}
            drawerContent={(props) => <CustomDrawerContent {...props}
            />}

        >
            <Drawer.Screen name="MainContent" component={MainContent}
                options={{
                    headerShown: false,
                    drawerLabel: 'Main',
                    // Section/Group Name
                    groupName: 'Section 1',
                    activeTintColor: '#e91e63',
                }}
            />
        </Drawer.Navigator>
    );
}

// Card
export const ProductCard = ({ navigation, idSubscriber, isRegister }) => {

    const productCardHandler = (charge) => {
        let intent

        // Is Register?
        if (isRegister)
            intent = 'Recharge_2'
        else
            intent = 'Recharge'

        // Set product
        charge = setProductType(charge)

        // Go to
        navigation.navigate(intent, {
            idSubscriber: idSubscriber,
            isRegister: isRegister,
            isJr: true,
            sendPayload: charge
        })
    }

    return (
        <ScrollView horizontal >
            <TouchableHighlight
                onPress={() => productCardHandler('A')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/2.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => productCardHandler('B')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/3.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => productCardHandler('C')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/4.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => productCardHandler('D')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/5.jpg')}
                />
            </TouchableHighlight>
        </ScrollView>
    );
}

const stylesProductCard = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageProduct: {
        width: 300,
        height: 300,
        padding: 5,
        flexDirection: 'column',
        borderBottomWidth: .8,
        //borderBottomColor: styleConst.MAINCOLORSLIGHT[1],
        margin: 0,
        flex: 1
    },
    boxShadow: {
        marginTop: 0,
        margin: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
});

const MainContent = ({ navigation, route }) => {
    //data.responseSubscriber.status.subStatus
    const userIsActive = false;
    const { idSubscriber, isRegister } = globalRoute.params;
    const [payload, setPayload] = useState('Carga - $50');
    const [gbProduct, setGbProduct] = useState()


    let [totalMBData, unsuedMBData, expireMBData, actualMBData,
        totalSMSData, unsuedSMSData, expireSMSData, actualSMSData,
        totalMINData, unsuedMINData, expireMINData, actualMINData] = [0]

    //Validación vigencia - falta 999
    const validitNearDaysEnd = 5
    // respuesta Api


    data.responseSubscriber.freeUnits.map((item, i) => {
        // Get data 'mb'
        if (item.name.indexOf("FreeData_Altan") != -1) {
            // set Vars
            totalMBData = item.freeUnit.totalAmt;
            unsuedMBData = item.freeUnit.unusedAmt;
            actualMBData = totalMBData - unsuedMBData;

            // if unsed data is none
            if (actualMBData == 0)
                actualMBData = totalMBData

            // Get Expirtaion Date
            item.detailOfferings.map((subItem) => {
                //console.log(subItem.expireDate)
                expireMBData = subItem.expireDate;
            })
        }

        // get 'sms'  y 'tiempo'
        if (item.name.indexOf("FU_SMS_Altan-NR-LDI_NA") != -1) {
            // set Vars
            totalSMSData = item.freeUnit.totalAmt;
            unsuedSMSData = item.freeUnit.unusedAmt;
            actualSMSData = totalSMSData - unsuedSMSData;

            // if unsed data is none
            if (actualSMSData == 0)
                actualSMSData = totalSMSData

            // Get Expirtaion Date
            item.detailOfferings.map((subItem) => {
                //console.log(subItem.expireDate)
                expireSMSData = subItem.expireDate;
            })
        }
        if (item.name.indexOf("FU_Min_Altan-NR-IR-LDI_NA") != -1) {
            // set Vars
            totalMINData = item.freeUnit.totalAmt;
            unsuedMINData = item.freeUnit.unusedAmt;
            actualMINData = totalMINData - unsuedMINData;

            // if unsed data is none
            if (actualMINData == 0)
                actualMINData = totalMINData

            // Get Expirtaion Date
            item.detailOfferings.map((subItem) => {
                //console.log(subItem.expireDate)
                expireMINData = subItem.expireDate;
            })
        }
    })


    // Just accept this format '2022/02/18'
    const validityUser = formatApiDate(expireMBData)
    const validityUserCode = validityUser.replace(/\//g, '')
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


    // Payload select
    useEffect(() => {

        if (gbProduct) {
            // Set product
            let charge = setProductType(gbProduct)

            // Intent to Recharge_2
            navigation.navigate('Recharge_2', {
                idSubscriber: idSubscriber,
                isRegister: isRegister,
                isJr: true,
                sendPayload: charge
            })
        }
    });


    return (
        <>
            <View style={styles.container}>
                {isRegister ?
                    <MainHeader name='Hola [Usuario]' navigation={navigation} />
                    :
                    <ReturnHeader title='Detalles de tu Saldo' navigation={navigation} />
                }
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
                        <MainCard
                            title={payload}
                            subtitle={validityResponse}
                            subtitleColor={validityColor}
                            bodyHeadOne='MB Totales'
                            bodyHeadTwo='MB Disponibles'
                            dataOne={totalMBData + ' MB'}
                            dataTwo={actualMBData + ' MB'}
                            MBC='true'
                            text='Consumos de datos:'
                        />
                        {isRegister ?
                            <>
                                <SocialMainCard />
                                <MainCard
                                    bodyHeadOne='Min Consumidos'
                                    bodyHeadTwo='SMS Consumidos'
                                    dataOne={actualSMSData + ' Sms'}
                                    dataTwo={actualMINData + ' Min'}
                                    showDetalles
                                    navigation={navigation}
                                    idSubscriber={idSubscriber}
                                />
                                {/** Exported from recharge */}
                                <View style={{ marginTop: 20 }}>
                                    <OverlayModal setGbProduct={setGbProduct} main />
                                </View>
                                {/**
                                <View style={styles.btnsContainer}>
                                    <View style={styles.btnAction}>
                                        <IntentBtn
                                            navigation={navigation}
                                            intent='Recharge'
                                            btnParams={{ idSubscriber: idSubscriber, isRegister: isRegister, isJr: true }}
                                            btnText='Paquetes' />
                                    </View>
                                    <View style={styles.btnAction}>
                                    <IntentBtn
                                            navigation={navigation}
                                            intent='Recharge'
                                            btnParams={{ 
                                                idSubscriber: idSubscriber, 
                                                isRegister: isRegister, 
                                                isJr: true,
                                                sendPayload: 'B'
                                             }}
                                            btnText='Cargar Saldo' />
                                    </View>
                                </View>**/}
                            </>
                            :
                            <View style={styles.infoNoRegisterTxt}>
                                <TouchableOpacity>
                                    <Text style={{ textAlign: 'center' }}>
                                        Para más información
                                        <Text style={{ color: styleConst.MAINCOLORS[0] }}> Ingresa </Text>
                                        a tu "Cuenta".
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={{ textAlign: 'center' }}>
                                        O<Text style={{ color: styleConst.MAINCOLORS[0] }}> Registrate Aquí. </Text>
                                        ¡Es gratuito!
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.btnsContainer}>
                                    <View style={styles.btnAction}>
                                        <IntentBtn
                                            navigation={navigation}
                                            intent='Recharge'
                                            btnParams={{ idSubscriber: idSubscriber, isRegister: isRegister, isJr: true }}
                                            btnText='Recarga' />
                                    </View>
                                </View>
                            </View>
                        }


                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <View style={styles.productTitleContiner}>
                            <Icon
                                name='dropbox'
                                type='font-awesome'
                                color={styleConst.MAINCOLORSLIGHT[1]}
                            />
                            <Text style={{ marginLeft: 15 }}>Selecciona el plan que más te convenga</Text>
                        </View>
                        <View>
                            <ProductCard
                                navigation={navigation}
                                idSubscriber={idSubscriber}
                                isRegister={isRegister}
                            />
                        </View>
                    </View>
                </ScrollView>


                {isRegister ?
                    <MainFooter
                        navigation={navigation}
                        idSubscriber={idSubscriber}
                    />
                    :
                    null
                }
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

const Main = ({ navigation, route }) => {
    globalRoute = route;
    return (
        <>
            <MyDrawer route={route} />
        </>
    );
}

export default Main;