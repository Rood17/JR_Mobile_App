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
import { LetterCircle, ReturnHeader, WarningAdvice } from "../elements/Elements";
import * as styleConst from '../../res/values/styles/StylesConstants'
import { Icon, Input, Overlay } from 'react-native-elements'
import * as constants from '../../utils/constants/Constants'
import IntentBtn from '../elements/IntentBtn';

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

let payload;
// MainCard
export const RechargeOneCard = ({ title, subtitle, subtitleColor, navigation, setGbProduct }) => {
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [displayColor1, setDisplayColor1] = useState(styleConst.MAINCOLORSLIGHT[2]);
    const [displayColor2, setDisplayColor2] = useState(styleConst.MAINCOLORSLIGHT[2]);
    const [errorMsg, setErrorMsg] = useState('');
    const [errorMsg2, setErrorMsg2] = useState('');
    const [initNumber, setInitNumber] = useState();

    const numberExist = 888


    // Validate if Number account exist
    const onChangeNumber = (number) => {

        // Set number
        setInitNumber(number);

        if (number.length === constants.MAX_NUMBER_LENGTH) {
            if (number.toString().indexOf(numberExist) != -1) {
                setDisplayColor1(styleConst.MAINCOLORSLIGHT[1])
                setErrorMsg(<WarningAdvice type={3} warningText='Número correcto' />)
            } else {
                setDisplayColor1('red')
                setDisabledBtn(true)
                setErrorMsg(<WarningAdvice type={2} warningText='El número no es Jr' />)
            }

        }
        else {
            setDisabledBtn(true)
            setDisplayColor1(styleConst.MAINCOLORSLIGHT[2])
            setErrorMsg('')
        }

    }

    // Validate if Number account exist
    const onChangeNewNumber = (number) => {
        if (number.length === constants.MAX_NUMBER_LENGTH) {
            if (number === initNumber) {
                setDisabledBtn(false)
                setDisplayColor2(styleConst.MAINCOLORSLIGHT[1])
                setErrorMsg2('')
            } else {
                setDisplayColor2('red')
                setDisabledBtn(true)
                setErrorMsg2(<WarningAdvice type={2} warningText='el número no coincide' />)
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
                <Text>Introduce el número a recargar</Text>
                <Input
                    placeholder="Número JRmovil (10 dígitos)"
                    keyboardType='number-pad'
                    textContentType='telephoneNumber'
                    errorMessage={errorMsg}
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
                        chargeId: payload,
                        numToCharge: initNumber,
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
export const MoneyCard = ({ setGbProduct, togglePrices }) => {

    // handle money bby
    const moneyHandler = (payloadCode) => {
        // set pay charge
        setGbProduct(payloadCode)
        // Close modal
        togglePrices()
    }

    return (
        <View style={stylesMoneyCard.boxShadow} >
            <View style={stylesMoneyCard.horizontalCard}>
                <TouchableOpacity
                    style={stylesMoneyCard.box}
                    onPress={() => moneyHandler(20)}
                >
                    <Text>$20</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesMoneyCard.box}
                    onPress={() => moneyHandler(30)}
                >
                    <Text>$30</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesMoneyCard.box}
                    onPress={() => moneyHandler(50)}
                >
                    <Text>$50</Text>
                </TouchableOpacity>
            </View>
            <View style={stylesMoneyCard.horizontalCard}>
                <TouchableOpacity
                    style={stylesMoneyCard.box}
                    onPress={() => moneyHandler(100)}
                >
                    <Text>$100</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesMoneyCard.box}
                    onPress={() => moneyHandler(150)}
                >
                    <Text>$150</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesMoneyCard.box}
                    onPress={() => moneyHandler(200)}
                >
                    <Text>$200</Text>
                </TouchableOpacity>
            </View>
            <View style={stylesMoneyCard.horizontalCard}>
                <TouchableOpacity
                    style={stylesMoneyCard.box}
                    onPress={() => moneyHandler(300)}
                >
                    <Text style={{ alignItems: 'center' }}>$300</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesMoneyCard.box}
                    onPress={() => moneyHandler(400)}
                >
                    <Text>$400</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesMoneyCard.box}
                    onPress={() => moneyHandler(500)}
                >
                    <Text>$500</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const stylesMoneyCard = StyleSheet.create({
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
export const ProductCard = ({ setGbProduct, togglePlans }) => {


    // 999 seguro aquí se va a neceistar un ref
    const productHandler = (payload) => {
        // Set charge
        setGbProduct(payload)
        // Close Modal
        togglePlans()
    }

    return (
        <ScrollView horizontal >
            <TouchableHighlight
                onPress={() => productHandler('A')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/2.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('B')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/3.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('C')}
                style={stylesProductCard.boxShadow}
            >
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/4.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => productHandler('D')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/5.jpg')}
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
const OverlayModal = ({ setGbProduct }) => {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const togglePlans = () => {
        setVisible1(!visible1);
    };

    const togglePrices = () => {
        setVisible2(!visible2);
    };

    return (
        <View>
            <View style={{ alignItems: 'center' }}>
                <View style={modalStyle.iconContainer}>
                    <View style={modalStyle.icon}>
                        <Icon
                            raised
                            name='dropbox'
                            type='font-awesome'
                            color={styleConst.MAINCOLORSLIGHT[1]}
                            onPress={togglePlans} />
                        <Text>Planes JR</Text>
                    </View>
                    <View style={modalStyle.icon}>
                        <Icon
                            raised
                            name='dollar'
                            type='font-awesome'
                            color={styleConst.MAINCOLORSLIGHT[1]}
                            onPress={togglePrices} />
                        <Text>Cargar saldo</Text>
                    </View>
                </View>
            </View>

            <Overlay isVisible={visible1} onBackdropPress={togglePlans}>
                <View style={modalStyle.headContainer}>
                    <Text style={modalStyle.headTxt}>Planes JR</Text>
                </View>

                <View style={modalStyle.bodyContainer}>
                    <Text style={{ margin: 15 }}>Slecciona una compra</Text>
                    <ProductCard setGbProduct={setGbProduct} togglePlans={togglePlans} />
                </View>

                <View style={modalStyle.footer}>
                    <Button
                        //style={stylesBtn == null ? btnNormal() : stylesBtn}
                        onPress={togglePlans}
                        color={styleConst.MAINCOLORS[0]}
                        title='Cerrar'
                    />
                </View>
            </Overlay>
            <Overlay isVisible={visible2} onBackdropPress={togglePrices}>
                <View style={modalStyle.headContainer}>
                    <Text style={modalStyle.headTxt}>Recarga Saldo</Text>
                    <View style={[modalStyle.bodyContainer, { width: '100%', marginTop: 20 }]}>
                        <Text style={{ margin: 15, width: '100%' }}>Selecciona una compra</Text>
                        <MoneyCard setGbProduct={setGbProduct} togglePrices={togglePrices} />
                    </View>
                    <View style={[modalStyle.footer, { width: '100%' }]}>
                        <Button
                            //style={stylesBtn == null ? btnNormal() : stylesBtn}
                            onPress={togglePrices}
                            color={styleConst.MAINCOLORS[0]}
                            title='Cerrar'
                        />
                    </View>
                </View>
            </Overlay>
        </View>
    );
};
const modalStyle = StyleSheet.create({
    headContainer: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center'


    },
    footer: {
        margin: 20
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

// Compute recharge type
export const setProductType = (payloadCode) => {

    payload = 'Plan JR10 - $99';
    // Feed the caharge resume
    if (typeof payloadCode == 'string') {
        switch (payloadCode) {
            case 'A':
                payload = 'Plan JR5 - $49';
                break;
            case 'B':
                payload = 'Plan JR10 - $99';
                break;
            case 'C':
                payload = 'Plan JR20 - $199';
                break;
            case 'D':
                payload = 'Plan JR50 - $449';
                break;
            default:
                payload = 'Plan JR10 - $99';
        }
    }
    if (typeof payloadCode == 'number') {
        switch (payloadCode) {
            case 20:
                payload = 'Carga - $20';
                break;
            case 30:
                payload = 'Carga - $30';
                break;
            case 50:
                payload = 'Carga - $50';
                break;
            case 100:
                payload = 'Carga - $100';
                break;
            case 150:
                payload = 'Carga - $150';
                break;
            case 200:
                payload = 'Carga - $200';
                break;
            case 300:
                payload = 'Carga - $300';
                break;
            case 400:
                payload = 'Carga - $400';
                break;
            case 500:
                payload = 'Carga - $500';
                break;
            default:
                payload = 'Plan JR10 - $99';
        }
    }

    return payload;
}

const Recharge = ({ navigation, chargeResume }) => {

    const [gbProduct, setGbProduct] = useState()

    payload = setProductType(gbProduct)


    return (
        <>
        <ReturnHeader title='Recarga de saldo' nav={navigation} />
            <ScrollView style={styles.container} >
                
                <View style={{ flex: 1 }}>
                    <View style={styles.promoContainer}>
                        <Text style={{ fontWeight: 'bold', color: styleConst.MAINCOLORS[1] }}>Los mejores paquetes y opciones en telefonía para ti.</Text>
                    </View>
                    <View style={styles.headContainer}>
                        <LetterCircle insightData={1} />
                        <View style={{ marginLeft: 15 }}>
                            <Text>Ingresa tu número JR Movil y el tipo de compra.</Text>
                        </View>
                    </View>
                    <RechargeOneCard navigation={navigation} setGbProduct={setGbProduct} />
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