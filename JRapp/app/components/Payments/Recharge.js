import React, { useContext, useState, useEffect } from 'react';
import { JrBtnCircle, DisplayLogo, LetterCircle, ReturnHeader, WarningAdvice } from "../elements/Elements";
import * as styleConst from '../../res/values/styles/StylesConstants'
import { Icon, Input, Overlay } from 'react-native-elements'
import * as constants from '../../utils/constants/Constants'
import IntentBtn from '../elements/IntentBtn';
import { setProductType } from '../../utils/Utils'
import { Avatar } from 'react-native-elements';
import PaquetesContext from '../../../context/paquetes/PaquetesContext';
import UserContext from '../../../context/user/UserContext';
import { LOG_INFO } from '../../res/values/strings/Strings';
import {
    Button,
    ScrollView,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    TouchableOpacity,
} from 'react-native';
import { get_api_isJr } from '../../utils/services/get_services';

// Globals
let payloadArray;
/**
 * RechargeOneCard
 * @param {Boolean} canChangeNumber, isMifi, isJr,isRegister
 * @param {String} title,subtitle,subtitleColor
 * @param {userInfo} idSubscriber, setGbProduct
 * @returns Component Card
 */
export const RechargeOneCard = ({ canChangeNumber, isMifi, isJr, idSubscriber, isRegister, title, subtitle, subtitleColor, navigation, setGbProduct }) => {
    // Sates
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [displayColor1, setDisplayColor1] = useState(styleConst.MAINCOLORSLIGHT[2]);
    const [displayColor2, setDisplayColor2] = useState(styleConst.MAINCOLORSLIGHT[2]);
    const [errorMsg, setErrorMsg] = useState('');
    const [errorMsg2, setErrorMsg2] = useState('');
    const [initNumber, setInitNumber] = useState(idSubscriber);
    const [pass1, setPass1] = useState(false);
    const { userData, userIsJr } = useContext(UserContext);

    /**
     * Si se bloquea el idSubscriber
     * llamar change number 1
     */
    const [autoFlag, setAutoFlag] = useState(true);


    // MIFI
    useEffect(() => {
        if (isMifi) {
            setAutoFlag(false)
            onChangeNumber(initNumber)
        }
    }, [isMifi])

    // CAN CHANGE NUMBER
    useEffect(() => {
        if (canChangeNumber) {
            setAutoFlag(false)
            onChangeNumber(initNumber)
        }
    }, [])

    if (isJr) {
        // Set input value
        phoneValue = initNumber
    }

    // IsRegister
    useEffect(() => {
        if (isJr) {
            // Set input value
            console.log(LOG_INFO('Recharge', 'RechargeOneCard.isJr')+isJr)
            setPass1(true);
        }
    }, [])

    const numberExist = 888
    let phoneValue;
    /**
     * Verificar si el número es JR Async
     * @param {idSubscriber} number 
     * @returns Boolean
     */
    const isNumberJr = async (number) => {

        let result = false;
        const response = await get_api_isJr(number)
            .then(function (response) {
                // Manejar errores
                console.log(LOG_INFO('Recharge', 'RechargeOneCard.isNumberJr.get_api_isJr')+response)
                result = response
                numberIsJrHandler(number, result)
            })
            .catch(function (error) {
                console.error("[Error] Recharge - isRegister error : " + error);
                //throw new Error ('Error - ' + error.message)
            }).finally(() => {
                console.log("[Info] Recharge - Isregister fin *")
            });
        return result
    };
    /**
     * numberIsJrHandler
     * @param {idSubscriber} number 
     * @param {resutado de la API isJr} result 
     */
    const numberIsJrHandler = (number, result) => {
        if (number.toString().indexOf(numberExist) != -1 || result) {
            setDisplayColor1(styleConst.MAINCOLORSLIGHT[1])
            setErrorMsg(<WarningAdvice type={3} warningText='Número correcto' />)
            setPass1(true);
        } else {
            setDisplayColor1('red')
            setDisabledBtn(true)
            setErrorMsg(<WarningAdvice type={2} warningText='El número no es Jr' />)
            setPass1(false);
        }
    }
    // Validate if Number account exist
    const onChangeNumber = (number) => {
        // Set number
        setInitNumber(number);
        if (number.length === constants.MAX_NUMBER_LENGTH) {
            // Verificar si es JR
            isNumberJr(number)
        }
        else {
            setDisabledBtn(true)
            setDisplayColor1(styleConst.MAINCOLORSLIGHT[2])
            setErrorMsg('')
            setPass1(false);
        }

    }

    // Validate if Number account exist
    const onChangeNewNumber = (number) => {
        if (number.length === constants.MAX_NUMBER_LENGTH && pass1) {
            if (number === initNumber) {
                setDisabledBtn(false)
                setDisplayColor2(styleConst.MAINCOLORSLIGHT[1])
                setErrorMsg2(<WarningAdvice type={3} warningText='El número coincide' />)
            } else {
                setDisplayColor2('red')
                setDisabledBtn(true)
                setErrorMsg2(<WarningAdvice type={2} warningText='El número no coincide' />)
            }

        }
        else {
            setDisabledBtn(true)
            setDisplayColor2(styleConst.MAINCOLORSLIGHT[2])
            setErrorMsg2('')
        }

    }



    return (

        <View style={stylesMainCard.boxShadow}>

            <View style={stylesMainCard.inputContainer}>
                {isMifi
                    ? <Text style={styleConst.JRGREY}>Introduce el número MIFI a recargar</Text>
                    : <Text>Introduce el número móvil a recargar</Text>
                }
                <Input
                    placeholder="Número JRmóvil (10 dígitos)"
                    keyboardType='number-pad'
                    textContentType='telephoneNumber'
                    errorMessage={errorMsg}
                    value={phoneValue}
                    disabled={autoFlag}
                    leftIcon={{ type: 'font-awesome', name: 'mobile', size: 18, color: displayColor1 }}
                    maxLength={constants.MAX_NUMBER_LENGTH}
                    onChangeText={number => onChangeNumber(number)}
                />
                <Input
                    placeholder="Introduce de nuevo tu número"
                    keyboardType='number-pad'
                    textContentType='telephoneNumber'
                    errorMessage={errorMsg2}
                    leftIcon={{ type: 'font-awesome', name: 'mobile', size: 18, color: displayColor2 }}
                    maxLength={constants.MAX_NUMBER_LENGTH}
                    onChangeText={number => onChangeNewNumber(number)}
                />
            </View>
            <OverlayModal setGbProduct={setGbProduct} />
            <View style={{ marginBottom: 30, width: '80%' }}>
                <IntentBtn
                    isDisabled={disabledBtn}
                    intent={['Recharge_2', {
                        sendPayload: payloadArray,
                        idSubscriber: initNumber,
                        isRegister:isRegister
                    }]}
                    navigation={navigation}
                    btnText='Continuar' />
            </View>
        </View>

    );
}
const stylesMainCard = StyleSheet.create({
    inputContainer: {
        width: '100%',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    headContainer: {
        padding: 5,
        flexDirection: 'column',
        borderBottomWidth: 0,
        margin: 25,
        flex: 1,
        alignItems: 'center'
    },
    bodyContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    bodyTitle: {
        marginLeft: 20,
    },
    cardTitleTxt: {
        color: styleConst.MAINCOLORSLIGHT[1],
        fontSize: 25
    },
    boxShadow: {
        marginTop: 30,
        marginLeft: styleConst.CARD_MARGIN,
        marginRight: styleConst.CARD_MARGIN,
        marginBottom: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        alignItems: 'center',
    },
});

/**
 * MifiCard list
 * @param {String} setGbProduct
 * @param {Boolean} togglePlans
 * @returns Mifi list COMPONENT
 */
export const MifiCard = ({ setGbProduct, togglePlans }) => {

    const productHandler = (payload) => {
        // Set charge
        setGbProduct(payload)
        // Close Modal
        togglePlans()
    }

    return (
        <ScrollView vertical >
            <TouchableHighlight
                onPress={() => productHandler('1509901006')}
                style={stylesMifiCard.boxShadow}>
                <Image
                    style={stylesMifiCard.imageProduct}
                    source={require('../../res/drawable/products/mifi_1.png')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1509901007')}
                style={stylesMifiCard.boxShadow}>
                <Image
                    style={stylesMifiCard.imageProduct}
                    source={require('../../res/drawable/products/mifi_2.png')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1509901008')}
                style={stylesMifiCard.boxShadow}
            >
                <Image
                    style={stylesMifiCard.imageProduct}
                    source={require('../../res/drawable/products/mifi_3.png')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1509901009')}
                style={stylesMifiCard.boxShadow}>
                <Image
                    style={stylesMifiCard.imageProduct}
                    source={require('../../res/drawable/products/mifi_4.png')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1509901010')}
                style={stylesMifiCard.boxShadow}>
                <Image
                    style={stylesMifiCard.imageProduct}
                    source={require('../../res/drawable/products/mifi_5.png')}
                />
            </TouchableHighlight>
        </ScrollView>
    );
}
const stylesMifiCard = StyleSheet.create({
    container: {

    },
    imageProduct: {
        width: 300,
        height: 300,
        padding: 5,
        borderBottomWidth: .8,
        //borderBottomColor: styleConst.MAINCOLORSLIGHT[1],
        margin: 0,
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
 * Products List
 * @param {String} setGbProduct
 * @param {Boolean} togglePlans
 * @returns ProductCard COMPONENT
 */
export const ProductCard = ({ setGbProduct, togglePlans }) => {

    // 999 seguro aquí se va a neceistar un ref
    const productHandler = (payload) => {
        // Set charge
        console.log('[Info] Recharge - ProductCard.productHandler : ' + payload)
        setGbProduct(payload)

        // Close Modal
        togglePlans()
    }


    return (
        <ScrollView vertical >
            <TouchableHighlight
                onPress={() => productHandler('1879901017')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/1.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1809901178')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/2.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1809901013')}
                style={stylesProductCard.boxShadow}
            >
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/3.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1809901179')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/4.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1879901018')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/5.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1809901014')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/6.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1879901019')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/7.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('1809901016')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/8.jpg')}
                />
            </TouchableHighlight>
        </ScrollView>
    );
}
const stylesProductCard = StyleSheet.create({
    container: {

    },
    imageProduct: {
        width: 300,
        height: 300,
        padding: 5,
        borderBottomWidth: .8,
        //borderBottomColor: styleConst.MAINCOLORSLIGHT[1],
        margin: 0,
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
 * MODAL
 * @param {String} setGbProduct
 * @param {Boolean} main (if view)
 * @returns modal COMPONENT
 */
export const OverlayModal = ({ setGbProduct, main }) => {
    // STATES
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    let [backgroundIconColor, iconColor] = ['white', styleConst.MAINCOLORSLIGHT[1]]

    const togglePlans = () => {
        setVisible1(!visible1);
    };

    const togglePrices = () => {
        setVisible2(!visible2);
    };

    // Si es que se proviene de MAIN
    if (main) {
        backgroundIconColor = styleConst.MAINCOLORS[0];
        iconColor = styleConst.MAINCOLORS[0];
    }

    return (
        <View>
            <View style={{ alignItems: 'center' }}>
                <View style={modalStyle.iconContainer}>


                    <View style={modalStyle.icon}>
                        <JrBtnCircle
                            onPress={togglePlans}
                        />
                        <Text style={{ marginTop: 10, color: styleConst.JRGREY, textAlign: 'center', }}>Planes de Recarga</Text>
                    </View>
                    <View style={modalStyle.icon}>
                        <JrBtnCircle
                            icon='signal'
                            onPress={togglePrices}
                        />
                        <Text style={{ marginTop: 10, color: styleConst.JRGREY, textAlign: 'center', }}>¡Recarga tu MiFi!</Text>
                    </View>
                </View>
            </View>

            <Overlay fullScreen={true} isVisible={visible1} onBackdropPress={togglePlans}>
                <View style={modalStyle.headContainer}>
                    <View style={[{ flex: 1, }, modalStyle.headTextContainer]}>
                        <Text style={modalStyle.headTxt}>Recargar Saldo</Text>
                        <Text style={{ margin: 0 }}>Selecciona una compra</Text>
                    </View>
                    <View style={[modalStyle.bodyContainer, { flex: 6 }]}>
                        <ProductCard setGbProduct={setGbProduct} togglePlans={togglePlans} />
                    </View>
                    <View style={[modalStyle.footer, { width: '100%', flex: 1 }]}>
                        <View style={{ marginTop: 30 }}>
                            <Button
                                onPress={togglePlans}
                                color={styleConst.MAINCOLORS[0]}
                                title='Cerrar'
                            />
                        </View>
                    </View>
                </View>
            </Overlay>
            <Overlay fullScreen={true} isVisible={visible2} onBackdropPress={togglePrices}>
                <View style={modalStyle.headContainer}>
                    <View style={[{ flex: 1, }, modalStyle.headTextContainer]}>
                        <Text style={modalStyle.headTxt}>Recargar Saldo</Text>
                        <Text style={{ margin: 0, color: styleConst.MAINCOLORS[3] }}>Selecciona una compra</Text>
                    </View>
                    <View style={[modalStyle.bodyContainer, { flex: 6 }]}>
                        <MifiCard setGbProduct={setGbProduct} togglePlans={togglePrices} />
                    </View>
                    <View style={[modalStyle.footer, { width: '100%', flex: 1 }]}>
                        <View style={{ marginTop: 30 }}>
                            <Button
                                onPress={togglePrices}
                                color={styleConst.MAINCOLORS[0]}
                                title='Cerrar'
                            />
                        </View>
                    </View>
                </View>
            </Overlay>
        </View>
    );
};
const modalStyle = StyleSheet.create({
    headContainer: {
        flex: 1,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    headTextContainer: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'

    },
    bodyContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'


    },
    footer: {
        margin: 20,
        paddingTop: 0
    },
    headTxt: {
        fontWeight: 'bold',
        color: styleConst.MAINCOLORS[1]
    },
    iconContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20
    },
    icon: {
        alignItems: 'center',
        flexBasis: '35%',
    },
});

/**
 * Componente RECAHRGE
 * @param {chargeResume, navigation, route (Params)}
 * @returns RECHARGE
 */
const Recharge = ({ navigation, chargeResume, route }) => {

    // STATES
    const { idSubscriber, isRegister, isJr, sendPayload, canChangeNumber } = route.params;
    const [isMifi, setIsMifi] = useState()
    const [gbProduct, setGbProduct] = useState()
    let payload;

    // Cargar payload dependiendo el view anterior
    useEffect(() => {
        if (sendPayload) {
            console.log('[Info] Recharge - sendPayload : ' + sendPayload)
            setGbProduct(sendPayload)
        }
    }, [])

    /**
     *  Se pone fuera del useEffect y en esta posición 
     *  para que se pueda actualizar forzosamente.
     */
    payloadArray = setProductType(gbProduct)
    payload = payloadArray.title


    // Verificar si es MIFI
    useEffect(() => {
        if (payload.indexOf('MiFi') != -1) {
            setIsMifi(true)
        } else {
            setIsMifi(false)
        }
    }, [payload])

    return (
        <>
            <ReturnHeader title='Recarga de saldo' navigation={navigation} />
            <ScrollView style={styles.container} >

                <View style={{ flex: 1 }}>
                    <View style={styles.promoContainer}>
                        <Text style={{ fontWeight: 'bold', color: styleConst.MAINCOLORS[1] }}>Los mejores paquetes y opciones en telefonía para ti.</Text>
                    </View>
                    <View style={styles.headContainer}>
                        <LetterCircle insightData={1} />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ color: styleConst.MAINCOLORS[3] }}>Ingresa tu número JRmóvil y el tipo de compra.</Text>
                        </View>
                    </View>
                    <RechargeOneCard
                        idSubscriber={idSubscriber}
                        isRegister={isRegister}
                        isMifi={isMifi}
                        isJr={isJr}
                        navigation={navigation}
                        setGbProduct={setGbProduct}
                        canChangeNumber={canChangeNumber}
                    />
                    <View style={styles.registerContainer}>
                        <Text>Carga seleccionada:</Text>
                        <TouchableOpacity>
                            <Text style={{ color: styleConst.MAINCOLORS[0], fontWeight: 'bold' }}>{payload}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headContainer}>
                        <View style={{ marginLeft: 5 }}>
                            <LetterCircle insightData={2} color={1} />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ color: styleConst.MAINCOLORS[3] }}>Realiza tu pago.</Text>
                        </View>
                    </View>
                    <View style={styles.cardsContainer}>
                        <View style={styles.cardsLogo}>
                            <Image
                                style={{ height: 50, width: 50 }}
                                source={require('../../res/drawable/logo/cards/mc.jpg')}
                            />
                        </View>
                        <View style={[styles.cardsLogo, { height: 40 }]}>
                            <Image
                                style={{ height: 20, width: 60 }}
                                source={require('../../res/drawable/logo/cards/visa.png')}
                            />
                        </View>
                        <View style={styles.cardsLogo}>
                            <Image
                                style={{ height: 30, width: 50, marginLeft: 15 }}
                                source={require('../../res/drawable/logo/cards/ae.jpg')}
                            />
                        </View>
                        <Text></Text>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    promoContainer: {
        marginLeft: 15,
        marginBottom: 5,
        marginTop: 30,
    },
    headContainer: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerContainer: {
        alignItems: 'center',
        margin: 10
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

    cardsContainer: {
        marginTop: 0,
        marginLeft: 40,
        flexDirection: 'row',
        alignItems: 'center'

    },
    cardsLogo: {
        width: 50,
        height: 50,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Recharge;