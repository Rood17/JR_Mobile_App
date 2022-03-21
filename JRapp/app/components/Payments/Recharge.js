/**
 * -- Asistance JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useState, useEffect } from 'react';
import { JrBtnCircle,DisplayLogo, LetterCircle, ReturnHeader, WarningAdvice } from "../elements/Elements";
import * as styleConst from '../../res/values/styles/StylesConstants'
import { Icon, Input, Overlay } from 'react-native-elements'
import * as constants from '../../utils/constants/Constants'
import IntentBtn from '../elements/IntentBtn';
import { setProductType } from '../../utils/Utils'
import { Avatar } from 'react-native-elements';
import PaquetesContext from '../../../context/paquetes/PaquetesContext';
import UserContext from '../../../context/user/UserContext';

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

let payload;
let payloadArray;
// MainCard
export const RechargeOneCard = ({ canChangeNumber, isMifi, isJr, idSubscriber, isRegister, title, subtitle, subtitleColor, navigation, setGbProduct }) => {
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [displayColor1, setDisplayColor1] = useState(styleConst.MAINCOLORSLIGHT[2]);
    const [displayColor2, setDisplayColor2] = useState(styleConst.MAINCOLORSLIGHT[2]);
    const [errorMsg, setErrorMsg] = useState('');
    const [errorMsg2, setErrorMsg2] = useState('');
    const [initNumber, setInitNumber] = useState(idSubscriber);
    const [pass1, setPass1] = useState(false);

    /**
     * Si se bloquea el idSubscriber
     * llamar change number 1
     */
    const [autoFlag, setAutoFlag] = useState(true);

    // UserState
    const { userData, userIsJr } = useContext(UserContext);

    // El número es Jr y la carga es móvil 
 

    // MIFI
    useEffect( () => {
        if( isMifi ){
            setAutoFlag(false)
            onChangeNumber(initNumber)
        }
    }, [isMifi])

    // CAN CHANGE NUMBER
    useEffect( () => {
        if( canChangeNumber ){
            setAutoFlag(false)
            onChangeNumber(initNumber)
        }
    }, [])

    // IsRegister
    if (isJr) {
        // Set input value
        phoneValue = initNumber
    }

    const numberExist = 888
    let phoneValue;

    // Validate if Number account exist
    const onChangeNumber = (number) => {
        // Set number
        setInitNumber(number);

        if (number.length === constants.MAX_NUMBER_LENGTH) {
            console.log(' * ************************************')
            console.log(' * *******userIsJr(number) ****    : ' + number )
            console.log(' * *******userIsJr(number) ****    : ' + userIsJr(number) )
            console.log(' * ************************************')
            if (number.toString().indexOf(numberExist) != -1 || userIsJr(number) ) {
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
                ? <Text>Introduce el número MIFI a recargar</Text>
                : <Text>Introduce el número móvil a recargar</Text>
                }
                <Input
                    placeholder="Número JRmovil (10 dígitos)"
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
// END MainCard

// Money List
export const MifiMoneyCard = ({ setGbProduct, togglePrices }) => {

    // handle money bby
    const moneyHandler = (payloadCode) => {
        // set pay charge
        setGbProduct(payloadCode)
        // Close modal
        togglePrices()
    }

    return (
        <View style={stylesMifiMoneyCard.boxShadow} >
            <View style={stylesMifiMoneyCard.horizontalCard}>
                <TouchableOpacity
                    style={stylesMifiMoneyCard.box}
                    onPress={() => moneyHandler(20)}
                >
                    <Text>8GB</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesMifiMoneyCard.box}
                    onPress={() => moneyHandler(30)}
                >
                    <Text>10GB</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesMifiMoneyCard.box}
                    onPress={() => moneyHandler(50)}
                >
                    <Text>13GB</Text>
                </TouchableOpacity>
            </View>
            <View style={stylesMifiMoneyCard.horizontalCard}>
                <TouchableOpacity
                    style={stylesMifiMoneyCard.box}
                    onPress={() => moneyHandler(100)}
                >
                    <Text>20GB</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesMifiMoneyCard.box}
                    onPress={() => moneyHandler(150)}
                >
                    <Text>23GB</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesMifiMoneyCard.box}
                    onPress={() => moneyHandler(200)}
                >
                    <Text>33GB</Text>
                </TouchableOpacity>
            </View>
            <View style={stylesMifiMoneyCard.horizontalCard}>
                <TouchableOpacity
                    style={stylesMifiMoneyCard.box}
                    onPress={() => moneyHandler(300)}
                >
                    <Text style={{ alignItems: 'center' }}>50GB</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesMifiMoneyCard.box}
                    onPress={() => moneyHandler(400)}
                >
                    <Text>53GB</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesMifiMoneyCard.box}
                    onPress={() => moneyHandler(500)}
                >
                    <Text>100GB</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const stylesMifiMoneyCard = StyleSheet.create({
    container: {

    },
    horizontalCard: {
        flexDirection: 'row',

    },
    box: {
        borderColor: styleConst.MAINCOLORSLIGHT[3],
        padding: 5,
        borderWidth: .8,
        width: 70,
        height: 70,
        alignItems: 'center',
        backgroundColor: styleConst.MAINCOLORSLIGHT[0],
        justifyContent: 'center',

    },
    boxShadow: {
        marginTop: 10,
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
        alignItems: 'center'
    }
});

// Products List
export const MifiCard = ({ setGbProduct, togglePlans }) => {

    // get Paquetes Contex

    //console.log("paquetes : " + paquetes)

    // 999 seguro aquí se va a neceistar un ref
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

// Products List
export const ProductCard = ({ setGbProduct, togglePlans }) => {

    // get Paquetes Contex

    //console.log("paquetes : " + paquetes)

    // 999 seguro aquí se va a neceistar un ref
    const productHandler = (payload) => {
        // Set charge
        console.log('*** tracking - productHandler : ' + payload)
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


// Modal
export const OverlayModal = ({ setGbProduct, main }) => {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    let [backgroundIconColor, iconColor] = ['white', styleConst.MAINCOLORSLIGHT[1]]

    const togglePlans = () => {
        setVisible1(!visible1);
    };

    const togglePrices = () => {
        setVisible2(!visible2);
    };

    // If we are in main
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
                        <Text style={{ marginTop: 10 }}>Planes de Recarga</Text>
                    </View>
                    <View style={modalStyle.icon}>
                    <JrBtnCircle 
                        icon='signal' 
                        onPress={togglePrices} 
                    />
                        <Text style={{ marginTop: 10 }}>¡Recarga por GB!</Text>
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
                        <Text style={{ margin: 0 }}>Selecciona una compra</Text>
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

const Recharge = ({ navigation, chargeResume, route }) => {

    
    const { idSubscriber, isRegister, isJr, sendPayload, canChangeNumber } = route.params;
    
    const [isMifi, setIsMifi] = useState()
    const [gbProduct, setGbProduct] = useState()
    let payload;
    // Set the prodcut type
    /**
     * Aquí debe llamarse a paquetes state para
     * alimentar los paquetes
     */
    // console.log("Recharge - sendPayload : " + sendPayload)
    // console.log("Recharge - gbProduct : " + gbProduct)

    useEffect(() => {
        console.log(' Recharge > sendPayload !! ' + typeof sendPayload)
        if (sendPayload){
            console.log(' Recharge > sendPayload dentroo  !! ' + sendPayload)
            setGbProduct(sendPayload)
        }
    }, [])
    
    /**
     *  Se pone fuera del useEffect y en esta posición 
     *  para que se pueda actualizar.
     */
    payloadArray = setProductType(gbProduct)
    payload = payloadArray.title


    // Verify if it´s MIFI
    useEffect( () => {
        if (payload.indexOf('MiFi') != -1){
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
                            <Text>Ingresa tu número JRmóvil y el tipo de compra.</Text>
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
                        <View style={styles.inline}>
                            <LetterCircle insightData={2} color={1} />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text>Realiza tu pago.</Text>
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