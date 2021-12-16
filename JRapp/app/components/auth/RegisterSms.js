/**
 * -- Register JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';

import DisplayLogo from '../elements/DisplayLogo';
import IntentBtn from '../elements/IntentBtn';
import Help from '../elements/Help';
import * as constants from '../../utils/constants/Constants';
import * as styleConst from '../../res/values/styles/StylesConstants'
import * as strings from '../../res/values/strings/Strings'
import * as utils from '../../utils/Utils'
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
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Btn Disabled Flaf Team
const RegisterSms: () => Node = () => {

    const [pass1, setPass1] = useState(false);
    const [pass2, setPass2] = useState(true);
    const [btnDisabledFlag, setBtnDisabledFlag] = useState(true)
    const [numberAgain, setNumberAgain] = useState(false);
    const codeBase = 666
    const numberBaseData = 88555
    // console.log("Intro Log : " + MAIN_CONTAINER_STYLE)


    const onChangeCode = (code) => {
        if (code === codeBase) {
            setPass1(true)
        } else {
            setPass1(false)
        }
    }

    const onChangeNumber = (number) => {
        if (numberBaseData.toString().indexOf(number) != -1) {
            setPass2(true)
            // send sms
        } else {
            setPass2(false)
        }
    }

    useEffect(() => {
        if (pass1 && pass2)
            setBtnDisabledFlag(false)
        else
            setBtnDisabledFlag(true)
    });

    // Si viene de recuperar pwd no se muestra introducir número de nuevo

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={utils.quitKeyboard}>
            <ScrollView >
                <View style={styles.logoContainer}>
                    <DisplayLogo stylesLogo={styles.logo} />
                </View>
                <View style={styles.btnActionContainer}>
                    <Text>Favor de ingresar el código enviado por SMS.</Text>
                    <View>
                        <Input
                            placeholder="Código SMS"
                            keyboardType='number-pad'
                            maxLength={constants.MAX_NUMBER_LENGTH}
                            secureTextEntry={false}
                            leftIcon={{ type: 'font-awesome', name: 'key', size: 18, color: 'grey' }}
                            onChangeText={code => onChangeCode(code)}
                        />
                        {numberAgain ?
                            <Input
                                placeholder="Apellido(s)"
                                secureTextEntry={false}
                                leftIcon={{ type: 'font-awesome', name: 'mobile', size: 24, color: 'grey' }}
                                onChangeText={number => onChangeNumber(number)}
                                maxLength={constants.MAX_NUMBER_LENGTH}
                            />
                            : null}
                        {!pass2 ?
                            <View style={{alignItems:'center'}}>
                                <Text>Este número ya está registrado.
                                    <TouchableWithoutFeedback>
                                        <Text> Ingresar</Text>
                                    </TouchableWithoutFeedback></Text>
                            </View>
                            : null}

                    </View>
                    <View>
                        <IntentBtn
                            isDisabled={btnDisabledFlag}
                            intent='goToMain'
                            btnText='Siguiente' />
                        <TouchableOpacity onPress={() => setNumberAgain(true)} style={{alignItems:'center'}}>
                        <Text style={styles.phoneTxt}>Introducir otro número</Text>

                        </TouchableOpacity>
                    </View>



                </View>

                
            </ScrollView>
        </TouchableWithoutFeedback>
        <Help />
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
        alignItems: 'center',
    },

    btnActionContainer: {
        padding: 20,
        flex: 1,
    },
    helpContainer: {
        flex: 1,
        marginTop: '48%'
    },
    logo: {
        flex: 1,
        height: 65,
        margin: 105

    },
    phoneTxt: {
        color: styleConst.MAINCOLORSLIGHT[1],
        fontSize: 15,
        fontWeight: 'bold',
        margin: 1
    },
});

export default RegisterSms;
