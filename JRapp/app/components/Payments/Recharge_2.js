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
import { LetterCircle, ReturnHeader } from "../elements/Elements";
import * as styleConst from '../../res/values/styles/StylesConstants'
import { Icon, Input, Overlay } from 'react-native-elements'
import * as constants from '../../utils/constants/Constants'
import IntentBtn from '../elements/IntentBtn';

import {
    Button,
    SafeAreaView,
    ScrollView,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    TouchableOpacity,
} from 'react-native';


// MainCard
export const RechargeTwoCard = ({ title, subtitle, subtitleColor }) => {
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [displayColor, setDisplayColor] = useState(styleConst.MAINCOLORSLIGHT[1]);
    const [errorMsg, setErrorMsg] = useState('');

    const materCard = 888
    const visa = 888
    const american = 888

    // Validate if Number account exist
    const onChangeCard = (number) => {
        if (number.length === constants.MAX_NUMBER_LENGTH) {
            if (number.toString().indexOf(materCard) != -1) {
                setDisabledBtn(false)
                setDisplayColor(styleConst.MAINCOLORSLIGHT[1])
                setErrorMsg('')
            } else {
                setDisplayColor('red')
                setDisabledBtn(true)
                setErrorMsg('El número de tarjeta es incorrecto.')
            }

        }
        else {
            setDisabledBtn(true)
            setDisplayColor(styleConst.MAINCOLORSLIGHT[1])
            setErrorMsg('')
        }

    }

    return (

        <View style={stylesMainCard.boxShadow}>

            <View style={stylesMainCard.inputContainer}>
                <Text>Introduce el número a recargar</Text>
                <Input
                    placeholder="Tarjeta (16 dígitos)"
                    keyboardType='number-pad'
                    textContentType='telephoneNumber'
                    errorMessage={errorMsg}
                    leftIcon={{ type: 'font-awesome', name: 'credit-card', size: 18, color: displayColor }}
                    maxLength={constants.MAX_NUMBER_LENGTH}
                    style={{ borderBottomColor: displayColor, color: displayColor }}
                    onChangeText={number => onChangeCard(number)}
                />
                {!disabledBtn ?
                    <View style={stylesMainCard.dataUserContainer}>
                        <View style={stylesMainCard.inputsRow}>
                            <Input
                                placeholder="Vencimiento"
                                keyboardType='number-pad'
                                errorMessage={errorMsg}
                                maxLength={constants.MAX_NUMBER_LENGTH}
                                style={{ borderBottomColor: displayColor, color: displayColor }}
                                onChangeText={number => onChangePostalC(number)}
                            />
                        </View>
                        <View style={stylesMainCard.inputsRow}>
                            <Input
                                placeholder="CVV"
                                keyboardType='number-pad'
                                errorMessage={errorMsg}
                                maxLength={constants.MAX_NUMBER_LENGTH}
                                style={{ borderBottomColor: displayColor, color: displayColor }}
                                onChangeText={number => onChangePostalC(number)}
                            />
                        </View>
                    </View>
                    : null}

                <View style={stylesMainCard.dataUserContainer}>
                    <View style={stylesMainCard.inputsRow}>
                        <Input
                            placeholder="Código Postal"
                            keyboardType='number-pad'
                            maxLength={constants.MAX_NUMBER_LENGTH}
                            style={{ borderBottomColor: displayColor, color: displayColor }}
                            onChangeText={number => onChangePostalC(number)}
                        />
                    </View>
                    <View style={stylesMainCard.inputsRow}>
                        <Input
                            placeholder="Email"
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            autoComplete='email'
                            secureTextEntry={false}
                            onChangeText={email => onChangeEmail(email)}
                        />
                    </View>
                </View>
            </View>
            <View style={{ marginBottom: 30, width: '80%' }}>
                <IntentBtn
                    isDisabled={disabledBtn}
                    intent='goToEnterCode'
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
    dataUserContainer: {
        flexDirection: 'row'
    },
    inputsRow: {
        flex: 1
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
export const MoneyCard = () => {
    const [gbProduct, setGbProduct] = useState()

    // 999 seguro aquí se va a neceistar un ref
    console.log(gbProduct)

    return (
        <View style={stylesMoneyCard.boxShadow} >
            <View style={stylesMoneyCard.horizontalCard}>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$20</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$30</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$50</Text>
                </TouchableHighlight>
            </View>
            <View style={stylesMoneyCard.horizontalCard}>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$100</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$150</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$200</Text>
                </TouchableHighlight>
            </View>
            <View style={stylesMoneyCard.horizontalCard}>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text style={{ alignItems: 'center' }}>$300</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$400</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$500</Text>
                </TouchableHighlight>
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
export const ProductCard = () => {
    const [gbProduct, setGbProduct] = useState()

    // 999 seguro aquí se va a neceistar un ref
    console.log(gbProduct)

    return (
        <ScrollView horizontal >
            <TouchableHighlight
                onPress={() => setGbProduct(5)}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/2.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => setGbProduct(10)}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/3.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => setGbProduct(20)}
                style={stylesProductCard.boxShadow}
            >
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/4.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => setGbProduct(50)}
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
const OverlayModal = () => {
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
                    <ProductCard />
                </View>

                <View style={modalStyle.footer}>
                    <IntentBtn
                        intent='goToEnterCode'
                        btnText='Cerrar'
                        color={1} />
                </View>
            </Overlay>
            <Overlay isVisible={visible2} onBackdropPress={togglePrices}>
                <View style={modalStyle.headContainer}>
                    <Text style={modalStyle.headTxt}>Recarga Saldo</Text>
                    <View style={[modalStyle.bodyContainer, { width: '100%', marginTop: 20 }]}>
                        <Text style={{ margin: 15, width: '100%' }}>Slecciona una compra</Text>
                        <MoneyCard />
                    </View>
                    <View style={modalStyle.footer}>
                        <IntentBtn
                            intent='goToEnterCode'
                            btnText='Cerrar'
                            color={1} />
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


// Main
const Recharge_2 = (chargeResume, numToCharge, {navigation}) => {
    // header, text, icon
    chargeResume = 'Plan JR 50'
    numToCharge = '55 66 88 99'
    return (
        <>
            <ScrollView style={styles.container} >
                <ReturnHeader title='Recarga de saldo' nav={navigation}/>
                <View style={{ flex: 1 }}>
                    <View style={styles.promoContainer}>
                        <Text style={{ fontWeight: 'bold', color: styleConst.MAINCOLORS[1] }}>Los mejores paquetes y opciones en telefonía para ti.</Text>
                    </View>
                    <View style={styles.headContainer}>
                        <LetterCircle insightData={1} color={1} />
                        <View style={{ marginLeft: 15 }}>
                            <Text>Ingresa tu número JR Movil y el tipo de compra.</Text>
                        </View>
                    </View>
                    <View style={styles.registerContainer}>
                        <Text>Carga seleccionada:</Text>
                        <TouchableOpacity>
                            <Text style={{ color: styleConst.MAINCOLORS[0] }}>{chargeResume}</Text>
                        </TouchableOpacity>
                        <Text>Número JR Movil:</Text>
                        <TouchableOpacity>
                            <Text style={{ color: styleConst.MAINCOLORS[0] }}>{numToCharge}</Text>
                        </TouchableOpacity>


                    </View>
                    <View style={styles.headContainer}>
                        <View style={styles.inline}>
                            <LetterCircle insightData={2} />
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
                    <View>
                        <RechargeTwoCard />
                    </View>
                    <View style={styles.registerContainer}>
                        <TouchableOpacity>
                            <Text style={{ color: styleConst.MAINCOLORS[0] }}>Ir Atras</Text>
                        </TouchableOpacity>
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

export default Recharge_2;