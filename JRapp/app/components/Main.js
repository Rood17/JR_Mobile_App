/**
 * -- JRmóvil App --
 * Author: Rodrigo Mora
 * rodmoraem@gmail.com
 *
 * @Lang  - JavaScript
 * @flow strict-local
 */

import React, { useState, useEffect, useContext } from 'react';

import DisplayLogo from './elements/DisplayLogo';
import IntentBtn from './elements/IntentBtn';
import { Icon, Input } from 'react-native-elements'
import { Loader, WarningAdvice, MainHeader, MainFooter, MainCard, SocialMainCard, ReturnHeader } from './elements/Elements';
import * as styleConst from '../res/values/styles/StylesConstants'
import * as constants from '../utils/constants/Constants'
import { formatApiDate, setProductType } from '../utils/Utils'
import { OverlayModal } from '../components/Payments/Recharge'
import MiPerfil from './pages/MiPerfil';
import Asistance from './pages/Asistance';
import { storeUserString, clearStorage, getUserKey, getUserData, getUserName, getUserLastName, getUserEmail, getUserId } from '../utils/Storage'
import { logout } from '../context/AuthProvider';
import UserContext from '../../context/user/UserContext'
import AuthContext from '../../context/auth/AuthContext';

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
let userName, userId = null;

/**
 * CustomDrawerContent
 * Modificación contenido del SideNav
 * @param {props} props
 * @returns Component
 */
function CustomDrawerContent(props) {

    const { isUserLogged } = useContext(AuthContext);

    const goToIntent = (intent) => {

        if (intent === 'Recharge') {
            props.navigation.navigate(intent, {
                idSubscriber: getUserId(),
                isRegister: true,
                isJr: true,
                canChangeNumber: true, 
            })
        }
        else if (intent === 'Cerrar') {

            // LoginOut
            clearStorage()
            isUserLogged(false)
            //logout(props.navigation)
        }
        else { props.navigation.navigate(intent) }

        props.navigation.closeDrawer();
    }
    return (
        <>
            <View >
                <View style={{ height: '28%', margin: 20, alignItems: 'center', alignContent: 'center' }}>
                    <DisplayLogo stylesLogo={{ height: '55%', width: '55%', margin: 10 }} mini />
                    <Text style={{color : styleConst.SECONDARY_TXT_COLOR}}>{getUserName() + ' ' + getUserLastName()}</Text>
                    <Text style={{color : styleConst.SECONDARY_TXT_COLOR}}>{getUserId()}</Text>
                </View>
                <View style={stylesNav.line}></View>
                <TouchableOpacity style={stylesNav.navBtn} onPress={() => goToIntent('MiPerfil')}>
                    <Icon
                        name='user'
                        type='font-awesome'
                        size={20}
                        color={styleConst.MAINCOLORSLIGHT[1]}
                    />
                    <Text style={[stylesNav.txtIcon]}>Mi Perfil</Text>
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
                    <TouchableOpacity style={stylesNav.navBtn2} onPress={() => goToIntent('Terminos')}>
                        <Text style={stylesNav.txtA}>Terminos y Condiciones</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesNav.navBtn2} onPress={() => goToIntent('Privacidad')}>
                        <Text style={stylesNav.txtA}>Aviso de Privacidad</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesNav.navBtn2} onPress={() => goToIntent('Contacto')}>
                        <Text style={stylesNav.txtA}>Contacto</Text>
                    </TouchableOpacity>

                    <Text style={{ margin: 10, marginTop: 20, color: styleConst.PRIMARY_TXT_COLOR, fontSize: 12 }}>@2022 JR móvil S.A. de C.V.</Text>
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
        marginLeft: 15,
        color:styleConst.SECONDARY_TXT_COLOR,
    }
})

/**
 * MyDrawer
 * SideNav
 * @param {Array} userData
 * @returns Drawer Component
 */
function MyDrawer({ userData }) {

    return (
        <Drawer.Navigator
            screenOptions={{ drawerPosition: 'right', width: 200 }}
            drawerContent={(props) => <CustomDrawerContent {...props}
            />}

        >
            <Drawer.Screen 
            name="MainContent"
            initialParams={{ userData: userData }} 
            component={MainContent}
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

/**
 * ProductCard
 * ** Es utilizada por vaios VIEWS -- pasar a elements --
 * @param {navigation} navigation
 * @param {String} idSubscriber, setGbProduct
 * @param {Boolean} isRegister
 * @returns Component
 */
export const ProductCard = ({ navigation, idSubscriber, isRegister, setGbProduct }) => {

    const productHandler = (charge) => {
        let intent

        // Is Register?
        if (isRegister)
            intent = 'Recharge_2'
        else
            intent = 'Recharge'

        // Set product
        setGbProduct(charge)
        charge = setProductType(charge)

        // Go to
        // Manejado por GBproduct
        /*navigation.navigate(intent, {
            idSubscriber: userId,
            isRegister: isRegister,
            isJr: true,
            sendPayload: charge
        })*/
    }

    return (
        <ScrollView horizontal >
            <TouchableHighlight
                onPress={() => productHandler('1879901017')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/1.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1809901178')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/2.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1809901013')}
                style={stylesProductCard.boxShadow}
            >
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/3.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1809901179')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/4.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1879901018')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/5.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1809901014')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/6.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1879901019')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/7.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1809901016')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/8.jpg')}
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

/**
 * MainContent
 * Handler de todos los elementos en Main
 * @param {navigation} navigation
 * @param {route} params
 * @returns Component
 */
const MainContent = ({ navigation, route }) => {

    const userData = route.params.userData

    let simData, simSMS, simMIN = [0,0,0,0,0]

    // Open the package
    if (userData != null || userData.simData != undefined )
        simData = Object.values(userData.simData)

    // Open the package
    if ( userData != null || userData.simSMS != undefined)
        simSMS = Object.values(userData.simSMS)

    // Open the package
    if ( userData != null || userData.simMIN != undefined )
        simMIN = Object.values(userData.simMIN)


    userName = getUserName()
    //console.log("simData > Main : " + Object.values(userDataMain.simData))


    const [gbProduct, setGbProduct] = useState()
    // Oferta actual
    const payload = !simData[4] ? 'Sin Carga' : simData[4]
    const expireMBData = !simData[0] ? '202202010100' : simData[0]
    
    // MB
    const unsuedMBData = !simData ? 'NaN' : simData[2]
    const totalMBData = !simData ? 'NaN' : simData[1]
    //SMS
    const totalSMSData = !simSMS ? 'NaN' : simSMS[1]
    const unsuedSMSData = !simSMS ? 'NaN' : simSMS[2]
    // Min
    const unsuedMINData = !simMIN ? 'NaN' : simMIN[2]



    //Validación vigencia - falta 999
    const validitNearDaysEnd = 5
    // respuesta Api



    // Just accept this format '2022/02/18'
    const validityUser = formatApiDate(expireMBData)
    const validityUserCode = validityUser.replace(/\//g, '')
    // si no tiene próxima recarga - vigencia
    let validityResponse = 'Vigencia: ' + validityUser
    let validityColor = styleConst.SECONDARY_TXT_COLOR

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
            /**
             * Identificar si el usuario escoje MIfi
             */
            if (charge.title.toString().indexOf('MiFi') != -1){
                // Intent to Recharge_2
                navigation.navigate('Recharge', {
                    idSubscriber: userId,
                    isRegister: true,
                    isJr: true,
                    sendPayload: gbProduct,
                })

            } else {
                // Intent to Recharge_2
                navigation.navigate('Recharge_2', {
                    idSubscriber: userId,
                    isRegister: true,
                    isJr: true,
                    sendPayload: charge
                })
            }
            
        }
    }, [gbProduct]);


    return (
        <>
            <View style={styles.container}>

                <MainHeader name={userName} navigation={navigation} />

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
                            dataOne={totalMBData}
                            dataTwo={unsuedMBData}
                            MBC='true'
                            text='Consumos de datos:'
                        />


                        <SocialMainCard />
                        <MainCard
                            bodyHeadOne='Min Restantes'
                            bodyHeadTwo='SMS Restantes'
                            dataOne={unsuedMINData}
                            dataTwo={unsuedSMSData}
                            showDetalles
                            navigation={navigation}
                            idSubscriber={userId}
                        />
                        {/** Exported from recharge */}
                        <View style={{ marginTop: 20 }}>
                            <OverlayModal setGbProduct={setGbProduct} main />
                        </View>
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <View style={styles.productTitleContiner}>
                            <Icon
                                name='mobile'
                                type='font-awesome'
                                color={styleConst.MAINCOLORSLIGHT[1]}
                            />
                            <Text style={{ marginLeft: 15, color:styleConst.SECONDARY_TXT_COLOR }}>Selecciona el plan que más te convenga</Text>
                        </View>
                        <View>
                            <ProductCard
                                navigation={navigation}
                                idSubscriber={userId}
                                isRegister={true}
                                setGbProduct={setGbProduct}
                            />
                        </View>
                    </View>
                </ScrollView>



                <MainFooter
                    navigation={navigation}
                    idSubscriber={userId}
                    canChangeNumber={true}
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
        color: styleConst.SECONDARY_TXT_COLOR,
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

/**
 * MainContent
 * Handler de todos los elementos en Main
 * @param {navigation} navigation
 * @param {route} params
 * @returns Component
 */
const Main = ({ navigation, route }) => {


    // Charge ZONE
    const [isReady, setIsReady] = useState(false);
    const { userData, getAPIUserData } = useContext(UserContext);

    // Call UserState
    useEffect(() => {
        storeUserString('lastView', 'main')
        getUserData().catch(() => console.error("[Error] - Main - Error en getUserData"))
        .finally(()=>{
            getAPIUserData(getUserId()).then((response) => {
                console.log("[Info] - ** Bienvenido a Main **")
                if ( response ){
                    setIsReady(true)
                }
        
            })
        })
        
    }, [userData])

    console.log("[Info] - Main - userId : " + getUserId())
    userId = getUserId();

    return (
        <>
            {!isReady ?
                <Loader />
                :
                <MyDrawer
                    userData={userData}
                />
            }
        </>
    );
}

export default Main;