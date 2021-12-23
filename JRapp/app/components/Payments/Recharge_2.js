/**
 * -- Asistance JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import { LetterCircle, ReturnHeader, WarningAdvice } from "../elements/Elements";
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
export const RechargeTwoCard = ({ title, subtitle, subtitleColor, pasar }) => {
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [displayColor, setDisplayColor] = useState(styleConst.MAINCOLORSLIGHT[1]);
    const [errorMsg, setErrorMsg] = useState('');
    const [cardDisplay, setCardDisplay] = useState();
    let { displayMaster, displayVisa, displayAmerican } = 'flex';

    const materCard = 888
    const visa = 777
    const american = 666


    // Validate if Number account exist
    const onChangeCard = (card) => {



        if (card.length === 16) {
            if (isMasterCard(card) || isVisa(card) || isAmerican(card)) {
                setDisabledBtn(false)
            } else {
                setDisplayColor('red')
                setDisabledBtn(true)
                setErrorMsg(<WarningAdvice type={2} warningText='El número de tarjeta no existe' />)
            }
        }
        else {
            setDisabledBtn(true)
            setDisplayColor(styleConst.MAINCOLORSLIGHT[1])
            setErrorMsg('')
            setCardDisplay(9)
        }

    }

    const isMasterCard = (card) => {
        if (card.toString().indexOf(materCard) != -1) {
            console.log('pasando')
            setCardDisplay(0)
            return true;
        }

        return false
    }

    const isVisa = (card) => {
        if (card.toString().indexOf(visa) != -1) {
            setCardDisplay(1)
            return true;
        }

        return false
    }

    const isAmerican = (card) => {
        if (card.toString().indexOf(american) != -1) {
            setCardDisplay(2)
            return true;
        }

        return false
    }

    // Detect wich card will pay
    switch (cardDisplay) {
        case 0:
            displayMaster = 'flex';
            displayVisa = 'none';
            displayAmerican = 'none'
            break;
        case 1:
            displayMaster = 'none';
            displayVisa = 'flex';
            displayAmerican = 'none'
            break;
        case 2:
            displayMaster = 'none';
            displayVisa = 'none';
            displayAmerican = 'flex'
            break;
        case 9:
            displayMaster = 'flex';
            displayVisa = 'flex';
            displayAmerican = 'flex'
            break;
        default:
            displayMaster = 'flex';
            displayVisa = 'flex';
            displayAmerican = 'flex'

    }

    return (
        <>
            <View style={styles.cardsContainer}>
                <View style={[styles.cardsLogo, { display: displayMaster }]}>
                    <Image
                        style={{ height: 50, width: 50 }}
                        source={require('../../res/drawable/logo/cards/mc.jpg')}
                    />
                </View>
                <View style={[styles.cardsLogo, { height: 40, display: displayVisa }]}>
                    <Image
                        style={{ height: 20, width: 60 }}
                        source={require('../../res/drawable/logo/cards/visa.png')}
                    />
                </View>
                <View style={[styles.cardsLogo, { display: displayAmerican }]}>
                    <Image
                        style={{ height: 30, width: 50, marginLeft: 15 }}
                        source={require('../../res/drawable/logo/cards/ae.jpg')}
                    />
                </View>
                <Text></Text>
            </View>
            <View>
                <View style={stylesMainCard.boxShadow}>

                    <View style={stylesMainCard.inputContainer}>
                        <Text>Introduce el número a recargar</Text>
                        <Input
                            placeholder="Tarjeta (16 dígitos)"
                            keyboardType='number-pad'
                            textContentType='telephoneNumber'
                            errorMessage={errorMsg}
                            leftIcon={{ type: 'font-awesome', name: 'credit-card', size: 18, color: displayColor }}
                            maxLength={16}
                            onChangeText={card => onChangeCard(card)}
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
            </View>
        </>
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


// Main
const Recharge_2 = ({ navigation, route }) => {

    const { chargeId, numToCharge } = route.params;



    return (
        <>
            <ScrollView style={styles.container} >
                <ReturnHeader title='Recarga de saldo' nav={navigation} />
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
                            <Text style={{ color: styleConst.MAINCOLORS[0] }}>{JSON.stringify(chargeId)}</Text>
                        </TouchableOpacity>
                        <Text>Número JR Movil:</Text>
                        <TouchableOpacity>
                            <Text style={{ color: styleConst.MAINCOLORS[0] }}>{JSON.stringify(numToCharge)}</Text>
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
                    <RechargeTwoCard />
                    <View style={styles.registerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
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