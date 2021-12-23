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
import { WarningAdvice } from '../elements/Elements';


// Global Vars
let isNumberRegister = false;

const PwdInput = ({ nav }) => {
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
                navigation={nav}
                intent='Main'
                btnText='Ingresar' />
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.phoneTxt}>¿Olvidaste tu contraseña?</Text>
            </View>

        </>
    )

}

const PassOrRegister = ({ numberFlag, navigation }) => {
    return (
        <>
            {numberFlag ?
                <PwdInput nav={navigation} />
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
                        navigation={navigation}
                        btnText='Registrarse' />
                </View>
            }
        </>
    );
}

const PhoneIsNotJr = ({flag}) => {
    return (
        <>
            {flag ?
                <WarningAdvice warningText='Este no es un número JR Móvil.'/>
                :
                null
            }
        </>
    );
}

const LoginBody = ({ nav }) => {
    const [phoneIsCorrect, setPhoneIsCorrect] = useState(false);
    const [jrAlert, setJrAlert] = useState(false);

    const isJR = '888'
    const isRegister = '56'


    const onChangeNumber = (number) => {

        // Validate if is Jr Movil
        if (number.length == constants.MAX_NUMBER_LENGTH ) {
            // Validate if es JR
            if (number.toString().indexOf(isJR) != -1){
                setJrAlert(false)
                setPhoneIsCorrect(true)
                // Is register??
                if (number.toString().indexOf(isRegister) != -1)
                    isNumberRegister = true
                else
                    isNumberRegister = false
            } else {
                setJrAlert(true)
            }
                
            
        }
        if (number.length < constants.MAX_NUMBER_LENGTH) {
            setPhoneIsCorrect(false)
            setJrAlert(false)
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
                            placeholder="Número JRmovil (10 dígitos)"
                            keyboardType='number-pad'
                            textContentType='telephoneNumber'
                            leftIcon={{ type: 'font-awesome', name: 'mobile', size: 18 }}
                            maxLength={constants.MAX_NUMBER_LENGTH}
                            onChangeText={number => onChangeNumber(number)}
                        />
                        {phoneIsCorrect ?
                            <PassOrRegister numberFlag={isNumberRegister} navigation={nav} />
                            :
                            <PhoneIsNotJr flag={jrAlert}/>
                        }

                    </View>
                </ScrollView>
            </ TouchableWithoutFeedback>
            <View style={styles.lineContainer}>
                <Line color='grey' />
                <View style={styles.iconContainer}>
                    <View style={styles.icon}>
                        <Icon
                            raised
                            name='mobile'
                            type='font-awesome'
                            color={styleConst.MAINCOLORSLIGHT[1]}
                            onPress={() => nav.navigate('Recharge')} />
                        <Text>Recarga</Text>
                    </View>
                    <View style={styles.icon}>
                        <Icon
                            raised
                            name='file'
                            type='font-awesome'
                            color={styleConst.MAINCOLORSLIGHT[1]}
                            onPress={() => nav.navigate('Consulting')} />
                        <Text>Consulta</Text>
                    </View>


                </View>
            </View>
            <Help navigation={nav} />
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
    lineContainer: {
        flex: 1.5,
        padding: 35,
        justifyContent: 'center'
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
    txtError: {
        margin: 10,
        color: 'red'
    }
});

export default Login;
