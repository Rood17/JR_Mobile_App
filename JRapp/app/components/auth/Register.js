import React, { useState, useEffect } from 'react';
import DisplayLogo from '../elements/DisplayLogo';
import IntentBtn from '../elements/IntentBtn';
import Help from '../elements/Help';
import * as constants from '../../utils/constants/Constants';
import * as styleConst from '../../res/values/styles/StylesConstants'
import * as strings from '../../res/values/strings/Strings'
import * as utils from '../../utils/Utils'
import { Icon, Input } from 'react-native-elements'
import { WarningAdvice } from '../elements/Elements';

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
let name, lastName
/**
 * Register
 * @param {navigation} navigation 
 * @param {params} route 
 * @returns Register Component
 */
const Register = ({ navigation, route }) => {

    const { idSubscriber } = route.params

    //const [name, setName] = useState('');
    //const [lastName, setLastName] = useState('');
    const [btnDisabledFlag, setBtnDisabledFlag] = useState(true)
    const [keyBoardIsOpen, setKeyBoardIsOpen] = useState(false);
    const [error, setError] = useState(false);    
    
    const onChangeName = (inputName, inputLastName) => {
        setError('')
        if (inputName != null)
            if (inputName.length >= 3) {
                name = inputName
            }else{
                name = ''
            }
        if (inputLastName != null)
            if (inputLastName.length >= 3) {
                lastName = inputLastName
            }  else {
                lastName = ''
            }

        if (name != undefined && lastName != undefined && 
            (name.length >= 3 && lastName.length >= 3))
            setBtnDisabledFlag(false)
        else
            setBtnDisabledFlag(true)
        
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

    const registerHandler = () => {

        console.log('[Info] Regsiter - registerHandler.name : '+ name)
        console.log('[Info] Regsiter - registerHandler.lastName : '+lastName)

        if (name != undefined && lastName != undefined && 
            name.length >= 3 && lastName.length >= 3)
            navigation.navigate('Register_2', {
                idSubscriber: idSubscriber,
                name: name,
                lastName: lastName
            })
        else
            setError(true)
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={utils.quitKeyboard}>
                <ScrollView>
                    <View style={styles.logoContainer}>
                        <DisplayLogo stylesLogo={styles.logo} />
                    </View>
                    <View style={styles.btnActionContainer}>
                        <Text style={{color:styleConst.SECONDARY_TXT_COLOR}}>Para entrar a tu portal "JRmóvil" es necesario que introduzcas tus datos.</Text>
                        <>
                            {error 
                                ? <WarningAdvice type={2} warningText='Favor de llenar los campos correctamente.' />
                                : null }
                        </>
                        <View>
                            <Input
                                placeholder="Nombre(s)"
                                autoComplete='name'
                                maxLength={20}
                                secureTextEntry={false}
                                leftIcon={{ type: 'font-awesome', name: 'user', size: 18, color: 'grey' }}
                                onChangeText={name => onChangeName(name, null)}
                            />
                            <Input
                                placeholder="Apellido(s)"
                                secureTextEntry={false}
                                leftIcon={{ type: 'font-awesome', name: 'user', size: 18, color: 'grey' }}
                                onChangeText={lastName => onChangeName(null, lastName)}
                            />
                        </View>
                        <View>
                            <Button
                                //style={stylesBtn == null ? btnNormal() : stylesBtn}
                                onPress={() => registerHandler()}
                                color={styleConst.MAINCOLORS[0]}
                                disabled={btnDisabledFlag}
                                btnParams={{ idSubscriber: idSubscriber, name: name, lastName: lastName }}
                                title='Continuar'
                            />
                            {!btnDisabledFlag ?
                            <>
                            <Text style={styles.privacidad}>
                                Al continuar el usuario reconoce que ha ledio y está de
                                acuerdo tanto con los 
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('Terminos')}>
                                    <Text style={styles.privacidadLinks}> Términos y Condiciones, </Text>
                                </TouchableWithoutFeedback>
                                 como con los
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('Privacidad')}>
                                <Text style={styles.privacidadLinks}> Avisos de Privacidad </Text>
                                </TouchableWithoutFeedback>
                                 de JRmóvil.
                                
                                </Text>
                            </>
                            :
                            <>
                            </>
                            }
                        </View>



                    </View>


                </ScrollView>
            </TouchableWithoutFeedback>
            {keyBoardIsOpen ? null : <Help navigation={navigation} />
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
    helpContainer: {
        flex: 1,
        marginTop: '48%'
    },
    logo: {
        flex: 1,
        height: 90,
        margin: 50,
        marginTop:100,
        marginBottom:80
    },
    phoneTxt: {
        color: styleConst.MAINCOLORS[1],
        fontSize: 15,
        fontWeight: '600',
        margin: 10
    },
    privacidad: {
        margin:20,
        textAlign:'center',
        fontSize: 12,
        color:styleConst.PRIMARY_TXT_COLOR
    },
    privacidadLinks:{
        color:styleConst.COLOR_LINK[0]
    }

});

export default Register;
