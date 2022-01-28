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
import { Loader ,WarningAdvice, MainHeader, MainFooter, MainCard, SocialMainCard, ReturnHeader } from './elements/Elements';
import * as styleConst from '../res/values/styles/StylesConstants'
import * as constants from '../utils/constants/Constants'
import { formatApiDate, setProductType } from '../utils/Utils'
import { OverlayModal } from '../components/Payments/Recharge'
import MiPerfil from './pages/MiPerfil';
import Asistance from './pages/Asistance';
import { storeUserString, storeUserData, getUserKey,getUserData, getUserName, getUserLastName, getUserEmail, getUserId } from '../utils/Storage'
import { logout } from '../context/AuthProvider';
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

// Global Vars
let userName, userId, fromZero = null;


// Drawer
function CustomDrawerContent(props) {

    const goToIntent = (intent) => {

        if (intent === 'Recharge') {
            props.navigation.navigate(intent, {
                idSubscriber: getUserId(),
                isRegister: true,
                isJr: true,

            })
        }
        else if (intent === 'Cerrar') {
            
            // LoginOut
            console.log("Mandando Loginout")
            logout() ? props.navigation.navigate('Login') : null
        }
        else { props.navigation.navigate(intent) }

        props.navigation.closeDrawer();
    }
    return (
        <>
            <View >
                <View style={{ height: '28%', margin: 20, alignItems: 'center', alignContent: 'center' }}>
                    <DisplayLogo stylesLogo={{ height: '55%', width: '55%', margin: 10 }} mini />
                    <Text>{getUserName() + ' ' + getUserLastName()}</Text>
                    <Text>{getUserId()}</Text>
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
                    <TouchableOpacity style={stylesNav.navBtn2} onPress={() => navigation.navigate('Terminos')}>
                        <Text style={stylesNav.txtA}>Terminos y Condiciones</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesNav.navBtn2} onPress={() => navigation.navigate('Privacidad')}>
                        <Text style={stylesNav.txtA}>Aviso de Privacidad</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesNav.navBtn2} onPress={() => navigation.navigate('Contacto')}>
                        <Text style={stylesNav.txtA}>Contacto</Text>
                    </TouchableOpacity>

                    <Text style={{ margin: 10, marginTop: 20, color: 'black', fontSize: 12 }}>@2022 JR Movil S.A. de C.V.</Text>
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
        color: styleConst.COLOR_LINK[0]
    },
    txtIcon: {
        marginLeft: 15
    }
})
function MyDrawer({hola}) {

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


// Product card va a lements 999
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
            idSubscriber: userId,
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

const MainContent = ({ navigation }) => {


    // 
    // Set Constants
    // Hacer pruebas on diferentes números
    // la idea aquí es que siempre se tome de storage, porque en teoría venga de donde venga tendrá el storgae

    // Si viene de Auth tomaá el id de rout
    // Cuando inici debe pdirlo a la bd

    // sino lo tomará de storga 
    
    // Setting Global Vars
    // Se debe quitar
  
    
    //data.responseSubscriber.status.subStatus
    

    

    userName = getUserName()
    console.log("userName > Main : " + userName)
    
   
    const [payload, setPayload] = useState('Carga - $50');
    const [gbProduct, setGbProduct] = useState()


    // Api data
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
                idSubscriber: userId,
                isRegister: true,
                isJr: true,
                sendPayload: charge
            })
        }
    });


    return (
        <>
            <View style={styles.container}>

                <MainHeader name={'hola ' + userName} navigation={navigation} />

                <ScrollView style={styles.container}>
                    <View style={styles.numberContainer}>
                        <Icon
                            name='mobile'
                            type='font-awesome'
                            color={styleConst.MAINCOLORSLIGHT[1]}
                        />
                        <Text style={styles.number}>{getUserId()}</Text>
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

                            
                                <SocialMainCard />
                                <MainCard
                                    bodyHeadOne='Min Consumidos'
                                    bodyHeadTwo='SMS Consumidos'
                                    dataOne={actualSMSData + ' Sms'}
                                    dataTwo={actualMINData + ' Min'}
                                    showDetalles
                                    navigation={navigation}
                                    idSubscriber={userId}
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
                                            btnParams={{ userId: userId, isRegister: isRegister, isJr: true }}
                                            btnText='Paquetes' />
                                    </View>
                                    <View style={styles.btnAction}>
                                    <IntentBtn
                                            navigation={navigation}
                                            intent='Recharge'
                                            btnParams={{ 
                                                idSubscriber: userId, 
                                                isRegister: isRegister, 
                                                isJr: true,
                                                sendPayload: 'B'
                                             }}
                                            btnText='Cargar Saldo' />
                                    </View>
                                </View>**/}
                            
                            



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
                                idSubscriber={userId}
                                isRegister={true}
                            />
                        </View>
                    </View>
                </ScrollView>



                    <MainFooter
                        navigation={navigation}
                        idSubscriber={userId}
                    />

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

    

    const [ isReady, setIsReady] = useState(false);
    // La ide aaquí es que la página main pueda entrar con params y sin params.
    // si no tiene paramas viene de inicio y los tomara del storgae
    // si tiene params viene de registros y s olo toamra de route como segunda opción.

    // Entering From Auth
    if ( route.params != undefined && route.params != null)
    {
        const { idSubscriber } = route.params;
        userId = idSubscriber;

        // searching for first time
        getUserData().then(() => setIsReady(true))
    }
    // Entering from start
    else 
    {
        userId = getUserId();
        fromZero = true;
        // get Storage
        getUserData().then(() => setIsReady(true))
    }

    // Reset User is register
    storeUserString('lastView', 'main')

    return (
        <>
            { !isReady ? 
                <Loader />
            :
                <MyDrawer 
                hola='hola'
                />
            }
        </>
    );
}

export default Main;