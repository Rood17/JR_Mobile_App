/**
 * -- Login JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
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


// Global Vars
let isNumberJr = false;

const PwdInput = () => {
    const [pwdFail, setPwdFail] = useState(false)
    const [disabledBtn, setDisabledBtn] = useState(true)

    const onChangeText = (pwd) => {
        if (pwd.length > 0)
            setDisabledBtn(false)
        else
            setDisabledBtn(true)
    }
    return (
        <>
            <Input
                placeholder="Contraseña"
                textContentType='password'
                autocomplete='password'
                maxLength={constants.MAX_NUMBER_LENGTH}
                secureTextEntry={true}
                leftIcon={{ type: 'font-awesome', name: 'lock', size: 18 }}
                onChangeText={pwd => onChangeText(pwd)}
            />
            {pwdFail ?
                <Text style={styles.txtError}>*La contraseña o el número es incorrecto.</Text>
                :
                null}
            <IntentBtn
                isDisabled={disabledBtn}
                intent='goToMain'
                btnText='Ingresar' />
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.phoneTxt}>¿Olvidaste tu contraseña?</Text>
            </View>

        </>
    )

}

const PassOrRegister = ({ numberFlag }) => {
    return (
        <>
            {numberFlag ?
                <PwdInput />
                :
                <View style={{ marginBottom: 40, }}>
                    <Text style={{ textAlign: 'center', }}>
                        Hemos detectado que aún no tienes una cuenta,
                        si gustas puedes registrarte para aglizar tus consultas
                        y recargas.
                    </Text>
                    <Text style={{ textAlign: 'center', }}>¡Es totalmente gratuito!</Text>
                    <IntentBtn
                        intent='goToRegister'
                        btnText='Registrarse' />
                </View>
            }
        </>
    );
}

const LoginBody = () => {
    const [phoneIsCorrect, setPhoneIsCorrect] = useState(false);
    const [keyboardIsOpen, setKeyBoardIsOpen] = useState(false);

    const isJR = '888'

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


    const onChangeNumber = (number) => {

        // Validate if is Jr Movil
        if (number.length == constants.MAX_NUMBER_LENGTH) {
            // Validate if es JR
            if (number.toString().indexOf(isJR) != -1)
                isNumberJr = true
            else
                isNumberJr = false
            setPhoneIsCorrect(true)
        }
        if (number.length < constants.MAX_NUMBER_LENGTH) {
            setPhoneIsCorrect(false)
        }
    }


    return (

        <TouchableWithoutFeedback onPress={utils.quitKeyboard}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <DisplayLogo stylesLogo={styles.logo} />
                </View>
                <View style={styles.btnActionContainer}>
                    <Input
                        placeholder="Número JRmovil (10 dígitos)"
                        keyboardType='number-pad'
                        textContentType='telephoneNumber'
                        leftIcon={{ type: 'font-awesome', name: 'mobile', size: 18 }}
                        maxLength={constants.MAX_NUMBER_LENGTH}
                        onChangeText={number => onChangeNumber(number)}
                    />
                    {phoneIsCorrect ?
                        <PassOrRegister numberFlag={isNumberJr} />
                        :
                        null
                    }

                </View>
                {!keyboardIsOpen ?
                    <>
                        <View style={styles.lineContainer}>
                            <Line color='grey' />
                            <View style={styles.iconContainer}>
                                <View style={styles.icon}>
                                    <Icon
                                        raised
                                        name='mobile'
                                        type='font-awesome'
                                        color={styleConst.MAINCOLORSLIGHT[1]}
                                        onPress={() => alert("Agrega saldo bro")} />
                                    <Text>Recarga</Text>
                                </View>
                                <View style={styles.icon}>
                                    <Icon
                                        raised
                                        name='file'
                                        type='font-awesome'
                                        color={styleConst.MAINCOLORSLIGHT[1]}
                                        onPress={() => alert("Consulta saldo bro")} />
                                    <Text>Consulta</Text>
                                </View>


                            </View>
                        </View>
                        <View>
                            <Help />
                        </View>
                    </>
                    : null}
            </View>
        </ TouchableWithoutFeedback>

    );

}

const Login: () => Node = () => {

    return (
        <>
            <LoginBody />
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
        padding: 20,
        flex: 1
    },
    phoneTxt: {
        color: styleConst.MAINCOLORSLIGHT[1],
        fontSize: 15,
        fontWeight: 'bold',
        margin: 1
    },
    lineContainer: {
        flex: 1,
        padding: 35,
        justifyContent: 'center'
    },
    iconContainer: {
        flexDirection: 'row',
        padding: 35,
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    icon: {
        alignItems: 'center',
        flexBasis: '35%',
    },
    txtError: {
        margin: 10,
        color: 'red'
    }
});

export default Login;
