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

let monthFlag, yearFlag, secretFlag, postalFlag, emailFlag;

// Modal
const OverlayModal = ({ isRegister,payload, idSubscriber, navigation, safeCard, disabledBtn, fail }) => {
    const [visible, setVisible] = useState(false);
    const [safePaymentSuccess, setSafePaymentSuccess] = useState(true);

    const toggleResume = () => {
        setVisible(!visible);
    };

    // Set safe card
    safeCard = 'xxxx xxxx xxxx ' + safeCard.toString().slice(12);

    const safePaymentHandler = () => {
        if (safePaymentSuccess) {
            navigation.navigate('Recharge_3', {
                payload: payload,
                idSubscriber: idSubscriber,
                isRegister:isRegister
            })
        } else {
            toggleResume()
            fail('Error')
        }
    }




    return (
        <View>

            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 5 }}>

                <Button
                    //style={stylesBtn == null ? btnNormal() : stylesBtn}
                    onPress={toggleResume}
                    color={styleConst.MAINCOLORS[0]}
                    title='Continuar'
                    disabled={false}
                />
            </View>


            <Overlay isVisible={visible} onBackdropPress={toggleResume}>
                <View style={modalStyle.containerModal}>
                    <View style={modalStyle.headContainer}>
                        <Text style={modalStyle.headTxt}>Resumen de compra</Text>
                    </View>

                    <View style={modalStyle.bodyContainer}>
                        <Text style={{ margin: 5 }}>Recarga :
                            <Text style={{ color: styleConst.MAINCOLORSLIGHT[1] }}>{payload}</Text>
                        </Text>
                        <Text style={{ margin: 5 }}>Número :
                            <Text style={{ color: styleConst.MAINCOLORSLIGHT[1] }}>{idSubscriber}</Text>
                        </Text>
                        <Text style={{ margin: 5 }}>Tarjeta :
                            <Text style={{ color: styleConst.MAINCOLORSLIGHT[1] }}>{safeCard}</Text>
                        </Text>
                    </View>

                    <View style={modalStyle.footer}>
                        <Button
                            //style={stylesBtn == null ? btnNormal() : stylesBtn}

                            onPress={safePaymentHandler}
                            color={styleConst.MAINCOLORS[0]}
                            title='Pagar'
                        />
                    </View>
                </View>
            </Overlay>
        </View>
    );
};
const modalStyle = StyleSheet.create({
    containerModal: {
        margin: 20
    },
    headContainer: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyContainer: {
        alignItems: 'flex-start',
        margin: 20,
        justifyContent: 'center'
    },
    footer: {
        margin: 10
    },
    headTxt: {
        fontWeight: 'bold',
        color: styleConst.MAINCOLORS[1]
    },
});

// MainCard
export const RechargeTwoCard = ({ isRegister, payload, idSubscriber, navigation }) => {
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [displayColor, setDisplayColor] = useState(styleConst.MAINCOLORSLIGHT[1]);
    const [errorMsg, setErrorMsg] = useState('');
    const [cardDisplay, setCardDisplay] = useState();
    const [cardData, setCardData] = useState(false);
    const [safeCard, setSafeCard] = useState(5555);
    let { displayMaster, displayVisa, displayAmerican } = 'flex';

    const materCard = 888
    const visa = 777
    const american = 666


    // Validate if Number account exist
    const onChangeCard = (card) => {
        if (card.length === 16) {
            if (isMasterCard(card) || isVisa(card) || isAmerican(card)) {
                setCardData(true)
                setSafeCard(card)

            } else {
                setDisplayColor('red')
                setDisabledBtn(true)
                setCardData(false)
                setErrorMsg(<WarningAdvice type={2} warningText='El número de tarjeta no existe' />)
            }
        }
        else {
            setDisabledBtn(true)
            setDisplayColor(styleConst.MAINCOLORSLIGHT[1])
            setErrorMsg('')
            setCardData(false)
            setCardDisplay(9)
        }
    }

    function setMonth(month) {
        if (month.length == 2)
            monthFlag = true;
        else
            monthFlag = false;

        runVerification()
    }
    function setYear(year) {
        if (year.length == 4)
            yearFlag = true;
        else
            yearFlag = false;

        runVerification()
    }
    function setSecret(secret) {
        if (secret.length === 3)
            secretFlag = true;
        else
            secretFlag = false;

        runVerification()
    }
    function setPostal(postal) {
        if (postal.length > 5)
            postalFlag = true;
        else
            postalFlag = false;

        runVerification()
    }
    function setEmail(email) {
        if (email.length > 5 && email.indexOf('@') != -1 && email.lastIndexOf('.') != -1)
            emailFlag = true;
        else
            emailFlag = false;

        runVerification();
    }
    function runVerification() {
        if (monthFlag && yearFlag && secretFlag && postalFlag && emailFlag) {
            setDisabledBtn(false)

        }
        else {
            setDisabledBtn(true)
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
            {safeCard === 'Error' ?
                <View style={{marginLeft:20, marginRight:20}}>
                    <WarningAdvice type={1} warningText='No se pudo realizar el pago, favor de intentar de nuevo.' />
                </View>
                :
                null
            }
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
                        {cardData ?
                            <View style={[stylesMainCard.dataUserContainer, { paddingLeft: 15, paddingRight: 15 }]}>
                                <View style={{ flex: 1 }}>
                                    <Input
                                        placeholder="MM"
                                        keyboardType='number-pad'
                                        maxLength={2}
                                        style={{ borderBottomColor: displayColor, color: displayColor, textAlign: 'center' }}
                                        onChangeText={month => setMonth(month)}
                                    />

                                </View>
                                <View style={{ flex: 0, alignItems: 'center', alignContent: 'center' }}>
                                    <Text style={{ fontSize: 25, marginBottom: 25 }}>/</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Input
                                        placeholder="YYYY"
                                        keyboardType='number-pad'
                                        maxLength={4}
                                        style={{ borderBottomColor: displayColor, color: displayColor, textAlign: 'center' }}
                                        onChangeText={year => setYear(year)}
                                    />

                                </View>
                                <View style={{ flex: 1.5 }}>
                                    <Input
                                        placeholder="CVV"
                                        keyboardType='number-pad'
                                        secureTextEntry={true}
                                        maxLength={3}
                                        style={{ borderBottomColor: displayColor, color: displayColor }}
                                        onChangeText={secret => setSecret(secret)}
                                    />
                                </View>
                            </View>
                            : null}

                        <View style={stylesMainCard.dataUserContainer}>
                            <View style={stylesMainCard.inputsRow}>
                                <Input
                                    placeholder="Código Postal"
                                    keyboardType='number-pad'
                                    maxLength={7}
                                    style={{ borderBottomColor: displayColor, color: displayColor }}
                                    onChangeText={postal => setPostal(postal)}
                                />
                            </View>
                            <View style={stylesMainCard.inputsRow}>
                                <Input
                                    placeholder="Email"
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
                                    autoComplete='email'
                                    secureTextEntry={false}
                                    onChangeText={email => setEmail(email)}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 30, width: '100%', flex: 1 }}>
                        <OverlayModal
                            navigation={navigation}
                            idSubscriber={idSubscriber}
                            payload={payload}
                            safeCard={safeCard}
                            fail={setSafeCard}
                            disabledBtn={disabledBtn}
                            isRegister={isRegister}
                        />
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
        flexDirection: 'row',
        alignItems: 'center'
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

    const { idSubscriber, sendPayload, isRegister } = route.params;
    const payload = sendPayload;

    return (
        <>
            <ReturnHeader title='Recarga de saldo' navigation={navigation} />
            <ScrollView style={styles.container} >

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
                            <Text style={{ color: styleConst.MAINCOLORS[0], fontWeight: 'bold' }}>{JSON.stringify(payload)}</Text>
                        </TouchableOpacity>
                        <Text>Número JR Movil:</Text>
                        <TouchableOpacity>
                            <Text style={{ color: styleConst.MAINCOLORS[0] }}>{JSON.stringify(idSubscriber)}</Text>
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
                    <RechargeTwoCard 
                        isRegister={isRegister} 
                        payload={payload} 
                        idSubscriber={idSubscriber} 
                        navigation={navigation} 
                    />
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