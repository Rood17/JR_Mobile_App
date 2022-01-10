/**
 * -- Register JR App --
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
import Help from '../elements/Help';
import * as constants from '../../utils/constants/Constants';
import * as styleConst from '../../res/values/styles/StylesConstants'
import * as strings from '../../res/values/strings/Strings'
import * as utils from '../../utils/Utils'
import { Icon, Input, Overlay } from 'react-native-elements'

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
    TouchableWithoutFeedback,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Btn Disabled Flaf Team
let pass1, pass2, pass3, isBold1, isBold2, isBold3, i;

export const NewPwd = ({ emailPass, goToIntent, btnTxt, label, navigation, dataArray }) => {


    const [chackColor, setChackColor] = useState('grey');
    const [chackColor2, setChackColor2] = useState('grey');
    const [chackColor3, setChackColor3] = useState('grey');
    const [btnDisabledFlag, setBtnDisabledFlag] = useState(true);

    if (!btnTxt)
        btnTxt = 'Texto'

    const onChangeText = (text) => {

        i = text.length;
        console.log(text.length)
        if (utils.CheckUppercase(text)) {
            setChackColor(styleConst.MAINCOLORS[0]);
            isBold1 = 'bold'
            // solo pase la primera vez
            if (pass1 === undefined)
                pass1 = i
        }
        else {
            setChackColor('grey');
            isBold1 = 'normal'
            if (i === pass1 - 1) {
                pass1 = undefined
            }
        }
        if (utils.checkIfHasNum(text)) {
            setChackColor2(styleConst.MAINCOLORS[0]);
            isBold2 = 'bold'
            // solo pase la primera vez
            if (pass2 === undefined)
                pass2 = i
        }
        else {
            setChackColor2('grey');
            isBold2 = ''
            if (i === pass2 - 1)
                pass2 = undefined
        }
        if (text.length > 7) {
            setChackColor3(styleConst.MAINCOLORS[0]);
            isBold3 = 'bold'
            if (pass3 === undefined)
                pass3 = i
        }
        else {
            setChackColor3('grey');
            isBold3 = 'normal'
            if (i === pass3 - 1)
                pass3 = undefined
        }

        // Open the portal
        if (pass1 != undefined && pass2 != undefined && pass3 != undefined && emailPass)
            setBtnDisabledFlag(false)
        else
            setBtnDisabledFlag(true)
    }
    console.log(btnDisabledFlag)


    return (
        <>
            <View>
                <Input
                    placeholder={label}
                    textContentType='password'
                    maxLength={constants.MAX_NUMBER_LENGTH}
                    secureTextEntry={true}
                    leftIcon={{ type: 'font-awesome', name: 'lock', size: 18, color: styleConst.MAINCOLORSLIGHT[1] }}
                    color={styleConst.MAINCOLORS[1]}
                    onChangeText={text => onChangeText(text)}
                />
                <Text>Favor de Introducir como mínimo los siguientes criterios:</Text>
                <View style={{ margin: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{
                            flex: 1, paddingLeft: 5,
                            color: chackColor, fontWeight: isBold1
                        }}>Una Mayúscula</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{
                            flex: 1, paddingLeft: 5,
                            color: chackColor2, fontWeight: isBold2
                        }}>Un Número</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{
                            flex: 1, paddingLeft: 5,
                            color: chackColor3, fontWeight: isBold3
                        }}>8 caracteres</Text>
                    </View>
                </View>


                <OverlayModal
                    btnText={btnTxt}
                    isDisabled={btnDisabledFlag}
                    navigation={navigation}
                    fail={btnDisabledFlag}
                    dataArray={dataArray}
                />
            </View>

        </>
    )

}

// Modal
const OverlayModal = ({ btnDisabledFlag, navigation, fail,dataArray }) => {
    const [visible, setVisible] = useState(false);
    const [safePaymentSuccess, setSafePaymentSuccess] = useState(true);

    const toggleResume = () => {
        setVisible(!visible);
    };

    const safePaymentHandler = () => {
        if (safePaymentSuccess) {
            navigation.navigate('Main', {
                userArray: dataArray,
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
                    title='Continuar 55'
                    disabled={btnDisabledFlag}
                />

            </View>


            <Overlay isVisible={visible} onBackdropPress={toggleResume}>
                <View style={modalStyle.containerModal}>
                    <View style={modalStyle.headContainer}>
                        <Text style={modalStyle.headTxt}>¡Gracias {dataArray.passName}!</Text>
                        <Text >Tu cuenta se ha registrado exitosamente.</Text>
                    </View>



                    <View style={modalStyle.footer}>
                        <Button
                            //style={stylesBtn == null ? btnNormal() : stylesBtn}

                            onPress={safePaymentHandler}
                            color={styleConst.MAINCOLORS[0]}
                            title='Ir a tu portal'
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

const Register_2: () => Node = ({ recovery, navigation, route }) => {

    // Params
    const { passName, passLastName } = route.params;
    const [emailIsCorrect, setEmailIsCorrect] = useState(false);

    const onChangeEmail = (email) => {
        if (email.indexOf('@') != -1 && email.indexOf('.') != -1) {
            setEmailIsCorrect(true)
            console.log('dentro : ' + emailIsCorrect)
        } else {
            setEmailIsCorrect(false)
            console.log('dentro : ' + emailIsCorrect)
        }


    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={utils.quitKeyboard}>
                <ScrollView >
                    <View style={styles.logoContainer}>
                        <DisplayLogo stylesLogo={styles.logo} />
                    </View>
                    <View style={styles.btnActionContainer}>
                        {!recovery ?
                            <>
                                <Text>
                                    Para entrar a tu portal "JR movil" es necesario que
                                    introduzcas tus datos.
                                </Text>
                                <View>
                                    <Input
                                        placeholder="Email"
                                        textContentType='emailAddress'
                                        keyboardType='email-address'
                                        autoComplete='email'
                                        secureTextEntry={false}
                                        leftIcon={{ type: 'font-awesome', name: 'envelope', size: 18, color: 'grey' }}
                                        onChangeText={email => onChangeEmail(email)}
                                    />
                                </View>
                            </>
                            :
                            <Text style={{ marginBottom: 20 }}>
                                Ingresa una nueva contraseña segura, para poder ingresar a tu portal JR Movil.
                            </Text>
                        }


                        <NewPwd
                            label='Ingresar Nueva Contraseña'
                            goToIntent='Register_Sms'
                            btnTxt='Registrarse'
                            navigation={navigation}
                            emailPass={emailIsCorrect}
                            dataArray={{passName:passName, passLastName:passLastName}}
                        />

                    </View>



                </ScrollView>
            </TouchableWithoutFeedback>
            <Help navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    helpContainer: {
        flex: 1,
        marginTop: '20%'
    },
    logo: {
        flex: 2,
        height: 65,
        margin: 105

    },
    btnActionContainer: {
        padding: 20,
        flex: 3
    },
    phoneTxt: {
        color: styleConst.MAINCOLORS[1],
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10
    }
});

export default Register_2;
