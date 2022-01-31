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
    Keyboard
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Btn Disabled Flaf Team
const Register: () => Node = ({navigation, route}) => {

    const  {idSubscriber} = route.params

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [btnDisabledFlag, setBtnDisabledFlag] = useState(true)
    const [keyBoardIsOpen, setKeyBoardIsOpen] = useState(false);
    // console.log("Intro Log : " + MAIN_CONTAINER_STYLE)


    const onChangeName = (inputName) => {
        if (inputName.length >= 3) {
            setName(inputName)
        } else {
            setName("")
        }
    }

    const onChangeLastName = (inputLastName) => {
        if (inputLastName.length >= 3 && name.length >= 3) {
            setLastName(inputLastName)
        } else {
            setLastName("")
        }
    }

    useEffect(() => {
        // Name super verification
        if (name.length >= 3 && lastName.length >= 3)
            setBtnDisabledFlag(false)
        else
            setBtnDisabledFlag(true)
    });
 
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
                            maxLength={20}
                            secureTextEntry={false}
                            leftIcon={{ type: 'font-awesome', name: 'user', size: 18, color: 'grey' }}
                            onChangeText={name => onChangeName(name)}
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
                            navigation={navigation}
                            intent='Register_2'
                            btnParams={{idSubscriber:idSubscriber, name : name, lastName : lastName}}
                            btnText='Ingresar' />
                    </View>



                </View>

                    
            </ScrollView>
        </TouchableWithoutFeedback>
        { keyBoardIsOpen ? null  : <Help navigation={navigation}/>
    }
        
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
        fontWeight: '600',
        margin: 10
    }
});

export default Register;
