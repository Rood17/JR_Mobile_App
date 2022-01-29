/**
 * -- Login JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useContext, useEffect } from 'react';
import type { Node } from 'react';

import DisplayLogo from '../elements/DisplayLogo';
import IntentBtn from '../elements/IntentBtn';
import Help from '../elements/Help'
import * as constants from '../../utils/constants/Constants';
import * as styleConst from '../../res/values/styles/StylesConstants'
import * as strings from '../../res/values/strings/Strings'
import * as utils from '../../utils/Utils'
import Line from '../elements/Elements/'
import { Icon, Input } from 'react-native-elements'
import { login, isUserLog } from '../../context/AuthProvider';
import {  storeUserString } from '../../utils/Storage'


import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { WarningAdvice } from '../elements/Elements';


// Global Vars
let isNumberRegister = false;
let numberInput = React.createRef();

const PwdInput = ({ setIsPwdOk, nav, idSubscriber }) => {
    const [pwdFail, setPwdFail] = useState(false)
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [error, setError] = useState()
    const [loginSuccess, setLoginSuccess] = useState(false)

    let pwdInput = React.createRef();

    const onChangeText = (pwd) => {
        if (pwd.length > 0) {
            setDisabledBtn(false);
            setIsPwdOk(true)
        }
        else {
            setDisabledBtn(true)
            setIsPwdOk(false)
        }
    }

    const loginHandler = () => {
        // Let´s see
        //login('carlos@zz.ss', 'Prueba123', setError, setLoginSuccess)
    }


    useEffect(() => {

        if (error === 500)
            setError(<WarningAdvice type={2} warningText='El número o contraseña es incorrecto.' />)

        if (loginSuccess) {
            nav.navigate('Main',
                { idSubscriber: idSubscriber, isRegister: true });

            // Set LastView
            storeUserString('lastView', 'login')

            // Reset values
            setDisabledBtn(true);
            setLoginSuccess(false);
            pwdInput.clear()
            numberInput.clear()
        }
    })


    return (
        <>
            <Input
                ref={input => { pwdInput = input }}
                placeholder="Contraseña"
                textContentType='password'
                autocomplete='password'
                errorMessage={error}
                maxLength={constants.MAX_NUMBER_LENGTH}
                secureTextEntry={true}
                leftIcon={{ type: 'font-awesome', name: 'lock', size: 18 }}
                onChangeText={pwd => onChangeText(pwd)}
            />
            {pwdFail ?
                <Text style={styles.txtError}>*La contraseña o el número es incorrecto.</Text>
                :
                null}
            <Button
                //style={stylesBtn == null ? btnNormal() : stylesBtn}
                onPress={() => loginHandler()}
                title='Ingresar'
                disabled={disabledBtn}
                color={styleConst.MAINCOLORS[0]}
            />
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.phoneTxt}>¿Olvidaste tu contraseña?</Text>
            </View>

        </>
    )

}

const PassOrRegister = ({ setIsPwdOk, numberFlag, navigation, idSubscriber }) => {
    return (
        <>
            {numberFlag ?
                <PwdInput
                    setIsPwdOk={setIsPwdOk}
                    nav={navigation}
                    idSubscriber={idSubscriber}
                />
                :
                <View style={{ marginBottom: 0, }}>
                    <Text style={{ textAlign: 'center', }}>
                        Hemos detectado que aún no tienes una cuenta,
                        si gustas puedes registrarte para aglizar tus consultas
                        y recargas.
                    </Text>
                    <Text style={{ textAlign: 'center', }}>¡Es totalmente gratuito!</Text>
                    <IntentBtn
                        intent='Register'
                        btnParams={{ idSubscriber: idSubscriber, isRegister: true }}
                        navigation={navigation}
                        btnText='Registrarse' />
                </View>
            }
        </>
    );
}

const PhoneIsNotJr = ({ flag, errorText }) => {
    return (
        <>
            {flag ?
                <WarningAdvice warningText={errorText} />
                :
                null
            }
        </>
    );
}

const LoginBody = ({ nav }) => {
    const [phoneIsCorrect, setPhoneIsCorrect] = useState(false);
    const [jrAlert, setJrAlert] = useState(false);
    const [keyboardIsOpen, setKeyBoardIsOpen] = useState(false);
    const [iconFlex, setIconFlex] = useState(1.5)
    const [errorStr, setErrorStr] = useState('')
    const [idSubscriber, setIdSubscriber] = useState(0)
    const [isPwdOk, setIsPwdOk] = useState(false)
    const [dinamicColor, setDinamicColor] = useState(styleConst.MAINCOLORSLIGHT[1])
    const [clear, setClear] = useState(null)


    const isJR = '888'
    const isRegister = '56'

    // Auth handler
    const onChangeNumber = (number) => {
        setIdSubscriber(number)

        // Validate if is Jr Movil
        if (number.length == constants.MAX_NUMBER_LENGTH) {

            // Clear input error
            setErrorStr('')

            // Validate if es JR
            if (number.toString().indexOf(isJR) != -1) {
                setJrAlert(false)
                setPhoneIsCorrect(true)
                setIconFlex(4)
                // Is register??
                if (number.toString().indexOf(isRegister) != -1) {
                    isNumberRegister = true
                    setIconFlex(5)
                }
                else {
                    isNumberRegister = false
                }
            } else {
                setJrAlert(true)
                setErrorStr('Este no es un número JR Móvil.')
                setIconFlex(1.5)
            }


        }
        // Clear
        if (number.length < constants.MAX_NUMBER_LENGTH) {
            setPhoneIsCorrect(false)
            setJrAlert(false)
            setIconFlex(1.5)
            setErrorStr('')
            setIsPwdOk(false)
        }
    }

    // Keyboard Listener for disapear icons
    Keyboard.addListener('keyboardDidShow',
        () => {
            setKeyBoardIsOpen(true);
        },
    );

    Keyboard.addListener('keyboardDidHide',
        () => {
            setKeyBoardIsOpen(false);
        },
    );

    // Consulta handler
    const iconActionHandler = (intent) => {
        // If is JR Movil
        console.log("Login > isRegister : " + isPwdOk)
        if (intent !== 'Recharge' && !jrAlert && idSubscriber.length == constants.MAX_NUMBER_LENGTH) {

            nav.navigate(intent, {
                idSubscriber: idSubscriber,
                isRegister: isPwdOk,
                isJr: phoneIsCorrect
            })
            setErrorStr('')

        } else if (intent === 'Recharge') {
            console.log("Login > inside else if iconactionhandler idSubscriber : " + idSubscriber)
            console.log(isPwdOk)

            nav.navigate(intent, {
                idSubscriber: idSubscriber,
                isRegister: isPwdOk,
                isJr: phoneIsCorrect
            })
        } else {
            setJrAlert(true);
            setErrorStr('Favor de Ingresar un Número JR')
        }

    }


    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={utils.quitKeyboard}>
                <ScrollView>
                    <View style={styles.logoContainer}>
                        <DisplayLogo stylesLogo={styles.logo} />
                    </View>
                    <View style={styles.btnActionContainer}>
                        <Input
                            ref={input => {numberInput = input}}
                            placeholder="Número JRmovil (10 dígitos)"
                            keyboardType='number-pad'
                            textContentType='telephoneNumber'
                            leftIcon={{ type: 'font-awesome', name: 'mobile', size: 18 }}
                            maxLength={constants.MAX_NUMBER_LENGTH}
                            onChangeText={number => onChangeNumber(number)}
                        />
                        {phoneIsCorrect ?
                            <PassOrRegister
                                setIsPwdOk={setIsPwdOk}
                                idSubscriber={idSubscriber}
                                numberFlag={isNumberRegister}
                                navigation={nav}
                            />
                            :
                            <PhoneIsNotJr flag={jrAlert} errorText={errorStr} />
                        }

                    </View>



                </ScrollView>
            </ TouchableWithoutFeedback>
            {keyboardIsOpen ?
                null :
                <>
                    <View style={[styles.lineIconContainer, { flex: iconFlex }]}>
                        <Line color='grey' />
                        <View style={styles.iconContainer}>
                            <View style={styles.icon}>
                                <Icon
                                    raised
                                    name='mobile'
                                    type='font-awesome'
                                    color={dinamicColor}
                                    onPress={() => iconActionHandler('Recharge')} />
                                <Text style={styles.icon_text}>Recarga</Text>
                            </View>
                            <View style={styles.icon}>
                                <Icon
                                    raised
                                    name='file'
                                    type='font-awesome'
                                    color={dinamicColor}
                                    onPress={() => iconActionHandler('DetailLogOut')} />
                                <Text style={styles.icon_text}>Consulta</Text>
                            </View>
                        </View>
                    </View>
                    <Help navigation={nav} />
                </>
            }
        </View>

    );

}

const Login = ({ navigation }) => {

    return (
        <>
            <LoginBody nav={navigation} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    logo: {
        flex: 1,
        height: 60,
        margin: 90

    },
    btnActionContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1
    },
    phoneTxt: {
        color: styleConst.MAINCOLORSLIGHT[1],
        fontSize: 15,
        fontWeight: 'bold',
        margin: 1
    },
    lineIconContainer: {
        //Flex dinámico
        padding: 35,
        justifyContent: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        padding: 35,
        flexWrap: 'wrap',
        justifyContent: 'center',
        flex: 1
    },
    icon: {
        alignItems: 'center',
        flexBasis: '35%',
    },
    icon_text: {
        color: styleConst.P_LIGHT_THEME[3]
    },
    txtError: {
        margin: 10,
        color: 'red'
    }
});

export default Login;
