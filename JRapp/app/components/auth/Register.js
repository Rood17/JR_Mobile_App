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
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Btn Disabled Flaf Team
const Register: () => Node = () => {

    const [pass1, setPass1] = useState(false);
    const [pass2, setPass2] = useState(false);
    const [btnDisabledFlag, setBtnDisabledFlag] = useState(true)
    // console.log("Intro Log : " + MAIN_CONTAINER_STYLE)


    const onChangeName = (txt) => {
        if (txt.length >= 4) {
            setPass1(true)
        } else {
            setPass1(false)
        }
    }

    const onChangeLastName = (lastName) => {
        if (lastName.length > 4 && pass1) {
            setPass2(true)
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

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={utils.quitKeyboard}>
            <ScrollView>
                <View style={styles.logoContainer}>
                    <DisplayLogo stylesLogo={styles.logo} />
                </View>
                <View style={styles.btnActionContainer}>
                    <Text>Para entrar a tu portal "JR movil" es necesario que introduzcas tus datos.</Text>
                    <View>
                        <Input
                            placeholder="Nombre(s)"
                            autoComplete='name'
                            maxLength={constants.MAX_NUMBER_LENGTH}
                            secureTextEntry={false}
                            leftIcon={{ type: 'font-awesome', name: 'user', size: 18, color: 'grey' }}
                            onChangeText={text => onChangeName(text)}
                        />
                        <Input
                            placeholder="Apellido(s)"
                            secureTextEntry={false}
                            leftIcon={{ type: 'font-awesome', name: 'user', size: 18, color: 'grey' }}
                            onChangeText={text => onChangeLastName(text)}
                        />
                    </View>
                    <View>
                        <IntentBtn
                            isDisabled={btnDisabledFlag}
                            intent='goToMain'
                            btnText='Ingresar' />
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
    helpContainer :{
        flex: 1,
        marginTop:'48%'
    },
    logo: {
        flex: 1,
        height: 65,
        margin: 105

    },
    phoneTxt: {
        color: styleConst.MAINCOLORS[1],
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10
    }
});

export default Register;
