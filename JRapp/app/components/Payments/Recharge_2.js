import React, { useState, useEffect, useContext } from 'react';
import { LetterCircle, Loader, ReturnHeader, WarningAdvice } from "../elements/Elements";
import * as styleConst from '../../res/values/styles/StylesConstants'
import { Icon, Input, Overlay } from 'react-native-elements'
import * as constants from '../../utils/constants/Constants'
import IntentBtn from '../elements/IntentBtn';
import RecargasContext from '../../../context/recargas/RecargasContext';
import { getUserEmail } from '../../utils/Storage';
import {get_api_preference} from '../../utils/services/get_services'
import { LOG_INFO } from '../../res/values/strings/Strings';

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

let monthFlag, yearFlag, secretFlag, postalFlag;

// Modal
const OverlayModal = ({ payloadArray, isRegister, payload, idSubscriber, navigation, safeCard, disabledBtn, fail }) => {
    const [visible, setVisible] = useState(false);
    const [safePaymentSuccess, setSafePaymentSuccess] = useState(true);

    const toggleResume = () => {
        setVisible(!visible);
    };

    // All data ready for API
    // Set safe card
    safeCard = 'xxxx xxxx xxxx ' + safeCard.toString().slice(12);

    const safePaymentHandler = () => {
        if (safePaymentSuccess) {
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'Recharge_3',
                        params: { 
                            idSubscriber: idSubscriber, 
                            isRegister: isRegister,
                            payload: payload,
                        },
                    },
                ],
            })
        } else {
            toggleResume()
            fail('Error')
        }
    }

    /**
     * Aquí debe llamarse a paquetes
     * obtener el ofertid y las fechas
     * y llamar a la API EN POST
     */

    return (
        <View>

            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 5 }}>

                <Button
                    //style={stylesBtn == null ? btnNormal() : stylesBtn}
                    onPress={toggleResume}
                    color={styleConst.MAINCOLORS[0]}
                    title='Continuar'
                    disabled={disabledBtn}
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
export const RechargeTwoCard = ({ mercadoPago, payloadArray, isRegister, payload, idSubscriber, navigation }) => {
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [displayColor, setDisplayColor] = useState(styleConst.MAINCOLORSLIGHT[1]);
    const [errorMsg, setErrorMsg] = useState('');
    const [cardDisplay, setCardDisplay] = useState();
    const [cardData, setCardData] = useState(false);
    const [safeCard, setSafeCard] = useState(5555);
    const [showError, setShowError] = useState(false)
    const [cardDetailData, setCardDetailData] = useState()
    const [errorTxt, SetErrorTxt] = useState('');
    const [emailFlag, setEmailFlag] = useState(false)
    let { displayMaster, displayVisa, displayAmerican } = 'flex';
    const [cardMonth, setCardMonth] = useState(false)
    const [cardYear, setCardYear] = useState(false)
    const [cardSeret, setCardSecret] = useState(false)
    const [disabledEmail, setDisabledEmail] = useState(false)
    const [isLoading, setisLoading] = useState(false);
    const [mercadoEmail, setMercadoEmail] = useState();

    // Constantes de prueba
    const materCard = 888
    const visa = 777
    const american = 666
    
    // Context
    const { recargas, get_preference } = useContext(RecargasContext);
    const price = clearPrice(payloadArray.price)

    /**
     * Array que se enviará a la API de MP    * 
     */
    const productArray = {
        'idSubscriber': idSubscriber,
        'title': payloadArray.title,
        'price': price,
        'email': mercadoEmail == undefined ? getUserEmail() : mercadoEmail,
    }

    /**
     * Capturar el mail del usuario no registrado    * 
     */
    useEffect( () => {
        if (mercadoEmail)
            productArray.email = mercadoEmail
    }, [mercadoEmail])

    // si el usuario ya esta loggeado se saca el email de storgae
    useEffect( () => {
        console.log(LOG_INFO('Recharge_2', 'RechargeTwoCard.isRegister')+isRegister)
        if (isRegister){
            setMercadoEmail(getUserEmail())
            setDisabledEmail(true);
            setEmailFlag(true); 
        }
    },[])
    
    // si el mail está listo se llama a get preference
    // preference debe ser llamada en el último state
    useEffect(() => {
        // si preference esta lista se avanza
        console.log(LOG_INFO('Recharge_2', 'RechargeTwoCard.emailFlag')+emailFlag)
        if (emailFlag){
            const mercadoUrl = get_preference(productArray).then(
                (response) => {
                    console.log(LOG_INFO('Recharge_2', 'RechargeTwoCard.get_preference')+response)
                    setisLoading(false);
                }
            )
        }
    }, [emailFlag])

    // Mercado Handler Email
    const mercadoEndHandler = () => {
        if ( mercadoEmail != undefined && mercadoEmail.indexOf('@') != -1) {
            setisLoading(true)
            setEmailFlag(true)
        } else {
            setEmailFlag(false)
        }
    }

    const mercadoHandlerEmail = (email) => {
        console.log(LOG_INFO('Recharge_2', 'mercadoHandlerEmail.email')+email)
        if ( email != undefined && email.indexOf('@') != -1) {
            setMercadoEmail(email)
        } else {
            setMercadoEmail(undefined)
        }
    }

    // Ir a mercado pago
    const mercadoHandler = () => {
        if ( recargas != undefined && recargas.init_point && !isLoading && emailFlag ){
            navigation.navigate('MercadoP', 
                {
                    'init_point' : recargas.init_point,
                    'pago_id' : recargas.pago_id
                })
            get_preference('clear')
        }
    }

    /**
     * Funciones de la interface para cobro.
     * Por el momento no se utilizan 24/03/22
     * En su lugar se utiliza la interface de MP
     */
    // Email validations 
    const mercadoEmailValidation = (email) => {
        if (email.length > 2 && email.indexOf('@') != -1 ) {
            // Validations 
            setMercadoEmail(email); 
            setEmailFlag(true); 
            setDisabledEmail(false);
            setShowError(false); 
            SetErrorTxt('');
            
        }
        else { 
            // Validations
            setEmailFlag(false); 
            setDisabledEmail(true)
            setShowError(true); 
            SetErrorTxt('El mail no es correcto.') 
        }
    }
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
    const monthVal = (month) => {
        if (month.length == 2) {
            setShowError(false); 
            SetErrorTxt('') 
        }
        else { 
            setShowError(true); 
            SetErrorTxt('Favor de introducir el mes.') 
        }
        runVerification()
    }
    const yearVal = (year) => {
        if (year.length == 4) { 
            setShowError(false); 
            SetErrorTxt('') 
        }
        else { detailPass = false;
             setShowError(true); 
             SetErrorTxt('Favor de introducir el año.'); 
        }
        runVerification()
    }
    const secretVal = (secret) => {
        if (secret.length == 3) { 
            setShowError(false); 
            SetErrorTxt('') 
        }
        else {
            setShowError(true); 
            SetErrorTxt('Favor de introducir el CVV.') 
        }
        runVerification()
    }
    function setEmail(email) {
        if (email.length > 2 && email.indexOf('@') != -1 ) { setEmailFlag(true); setShowError(false); SetErrorTxt('') }
        else { setEmailFlag(false); setDisabledBtn(true);setShowError(true); SetErrorTxt('El mail no es correcto.') }

        runVerification();
    }

    function runVerification() {
        if (!showError && emailFlag) {
            setDisabledBtn(false)
        }
        else {
            setDisabledBtn(true)
        }
    }
    const isMasterCard = (card) => {
        if (card.toString().indexOf(materCard) != -1) {
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
    // Seleccionar tarjeta
    useEffect( () => {
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
    }, [cardDisplay])
    /*** */

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
                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <WarningAdvice type={1} warningText='No se pudo realizar el pago, favor de intentar de nuevo.' />
                </View>
                :
                null
                }
                {mercadoPago 
                ?
                <>
                <View style={[stylesMainCard.boxShadow, {padding:30}]}>
                        <Text style={{color:styleConst.SECONDARY_TXT_COLOR}}>Email de Verificación</Text>
                        {isRegister
                        ? 
                        <Input
                            placeholder="Email de verificación"
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            value={mercadoEmail}
                            disabled={disabledEmail}
                        />
                        :
                        <Input
                            placeholder="Email de verificación"
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            secureTextEntry={false}
                            disabled={disabledEmail}
                            onChangeText={email => mercadoHandlerEmail(email)}
                            onEndEditing={() => mercadoEndHandler()}
                        />}
                        {isLoading
                    ? <Loader isText={false} marginTop='0%' marginBottom={20} />
                    : <Button disabled={!emailFlag} title="Realizar Pago" onPress={() => mercadoHandler()}/>         
                    }
              
                    </View>
                </>       
                :
                    <View>
                        <View style={stylesMainCard.boxShadow}>
                        {/** Aquí un spinner en lo que esta listo el iframe */}
                        <>
                            <View style={stylesMainCard.inputContainer}>
                                <Text style={{color:styleConst.SECONDARY_TXT_COLOR}}>Introduce el número a recargar</Text>
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
                                                onChangeText={month => monthVal(month)}
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
                                                onChangeText={year => yearVal( year)}
                                            />

                                        </View>
                                        <View style={{ flex: 1.5 }}>
                                            <Input
                                                placeholder="CVV"
                                                keyboardType='number-pad'
                                                secureTextEntry={true}
                                                maxLength={3}
                                                style={{ borderBottomColor: displayColor, color: displayColor }}
                                                onChangeText={secret => secretVal(secret)}
                                            />
                                        </View>
                                    </View>
                                    : null}

                                <View style={stylesMainCard.dataUserContainer}>
                                    <View style={stylesMainCard.inputsRow}>
                                        <Input
                                            placeholder="Código Postal"
                                            keyboardType='number-pad'
                                            maxLength={6}
                                            style={{ borderBottomColor: displayColor, color: displayColor }}
                                        />
                                    </View>
                                    <View style={stylesMainCard.inputsRow}>
                                        <Input
                                            placeholder="Email"
                                            textContentType='emailAddress'
                                            keyboardType='email-address'
                                            secureTextEntry={false}
                                            onChangeText={email => setEmail(email)}
                                        />
                                    </View>
                                </View>
                                {showError ?
                                    <WarningAdvice type={2} warningText={errorTxt} />
                                    : null}
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
                                    payloadArray={payloadArray}
                                />
                            </View>
                        </>
                        </View>
                    </View>
                }
            
            
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
    const payload = sendPayload.title;
    const mercadoPago = true;

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
                            <Text style={{color:styleConst.MAINCOLORS[3]}}>Ingresa tu número JRmóvil y el tipo de compra.</Text>
                        </View>
                    </View>
                    <View style={styles.registerContainer}>
                        <Text style={{color:styleConst.SECONDARY_TXT_COLOR}}>Carga seleccionada:</Text>
                        <TouchableOpacity>
                            <Text style={{ color: styleConst.MAINCOLORS[0], fontWeight: 'bold' }}>{JSON.stringify(payload)}</Text>
                        </TouchableOpacity>
                        <Text style={{color:styleConst.SECONDARY_TXT_COLOR}}>Número JRmóvil:</Text>
                        <TouchableOpacity>
                            <Text style={{ color: styleConst.MAINCOLORS[0] }}>{JSON.stringify(idSubscriber)}</Text>
                        </TouchableOpacity>


                    </View>
                    <View style={styles.headContainer}>
                        <View style={styles.inline}>
                            <LetterCircle insightData={2} />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{color:styleConst.MAINCOLORS[3]}}>Realiza tu pago.</Text>
                        </View>
                    </View>
                    <RechargeTwoCard
                        isRegister={isRegister}
                        payload={payload}
                        idSubscriber={idSubscriber}
                        navigation={navigation}
                        payloadArray={sendPayload}
                        mercadoPago={mercadoPago}
                    />
                    <View style={styles.registerContainer}>
                        <TouchableOpacity style={{marginTop:10}} onPress={() => navigation.goBack()}>
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
        margin: 20
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

const clearPrice = (price) => {
    return parseInt(price.slice(1, price.length))
}