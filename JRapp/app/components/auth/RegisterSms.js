import React, { useState, useEffect } from 'react';


import DisplayLogo from '../elements/DisplayLogo';
import IntentBtn from '../elements/IntentBtn';
import Help from '../elements/Help';
import * as constants from '../../utils/constants/Constants';
import * as styleConst from '../../res/values/styles/StylesConstants'
import * as strings from '../../res/values/strings/Strings'
import * as utils from '../../utils/Utils'
import { Icon, Input, countDown } from 'react-native-elements'
import { NavigationContainer, CommonActions } from '@react-navigation/native';


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

// Global Vars
let countPass = 0;
let countNewNumberPass = 0;
const numberBaseDatos = '666';
const oldNumber = 5555555555;
const codeBase = 6666;
const numberBaseData = 555;

const TouchableBtn = ({ text, finish, countDown, action, disabledSms }) => {
    let sendAgainColor = '';
    let disabled = false;

    if (countDown != null || finish) {
        disabled = true
    }
    else {
        disabled = false;
    }

    if (disabledSms != null) {
        if (disabledSms) {
            disabled = true
        } else {
            disabled = false
        }
    }

    // Set Colors
    if (disabled)
        sendAgainColor = styleConst.MAINCOLORSLIGHT[2]
    else
        sendAgainColor = styleConst.MAINCOLORSLIGHT[1]



    return (
        <>
            {disabled ?
                <Text style={[styles.phoneTxt, { color: sendAgainColor, textAlign: 'center' }]}>{text} {countDown}</Text>
                :
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={action}
                >
                    <Text style={[styles.phoneTxt, { color: sendAgainColor }]}>{text} {countDown}</Text>
                </TouchableOpacity>
            }
        </>
    );
}


// Btn Disabled Flaf Team
const RegisterSms: () => Node = ({ navigation, route }) => {

    const [pass1, setPass1] = useState(false);
    const [pass2, setPass2] = useState(true);
    const [btnDisabledFlag, setBtnDisabledFlag] = useState(true)
    const [numberAgain, setNumberAgain] = useState(false);
    const [returnRegister, setReturnRegister] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [smsSendDisabled, setSmsSendDisabled] = useState(true)
    const [btnText, setBtnText] = useState('Siguiente');
    const [countDown, setCountDown] = useState(15);
    const [value, setValue] = useState()

    const { idSubscriber } = route.params;
    //setSafeName(name)

    // Cheat 999
    setTimeout(() => {
        setValue('45J56')
        navigation.navigate('Register', { idSubscriber: idSubscriber  })
    }, 2000);

    const onChangeCode = (code) => {
        console.log('[Info] RegisterSMS - onChangeCode.code : ' + code)
        if (code == codeBase) {
            setPass1(true)
        } else {
            setPass1(false)
        }
    }

    // Verify Number
    const verifyNumber = (number) => {

        if (number.length == constants.MAX_NUMBER_LENGTH) {
            if (number == oldNumber) {
                setSmsSendDisabled(true)
                setReturnRegister(true)
                return
            } else {
                setReturnRegister(false)
            }
            if (number.toString().indexOf(numberBaseDatos.toString()) != -1)
                setSmsSendDisabled(false)
            else
                setSmsSendDisabled(true)
        } else {
            setSmsSendDisabled(true)
        }

    }

    const onChangeNumber = (number) => {
        if (numberBaseData.toString().indexOf(number) != -1) {
            setPass2(true)
            // send sms
            if (numberAgain) {
                setBtnText('Siguiente')
                setNumberAgain(false)
            }
        } else {
            setPass2(false)
        }
    }

    // Authomatic pass after inserting the correct code
    useEffect(() => {
        if (pass1) {
            setBtnDisabledFlag(false)
            navigation.navigate('Register', { idSubscriber: idSubscriber  })
        }
        else { setBtnDisabledFlag(true) }

        // Count Down
        setTimeout(() => {

            // Finish
            if (countDown === 99)
                return

            // If count is valid
            if (countDown > 0) {
                setCountDown(countDown - 1);
            }

            // Set color btn send sms txt
            if (countDown == 0) {
                setCountDown(null);
            }

        }, 1000);



    });

    // SMS Handler
    const smsHandler = (action) => {

        // Set other number
        if (action === 'Return') {
            countPass = 0;
            navigation.goBack()
        }
        // ReachLimit to send sms
        if (isLimitReached(countPass))
            return
        // Sending again SMS
        if (action === 'SendAgain') {
            //alert('send SMS')
            setCountDown(60)
            countPass += 1;
        }
        if (action === 'SendAgain2') {
            //alert('send SMS')
            setSmsSendDisabled(true)
            setNumberAgain(false)
        }
        // Set other number
        if (action === 'NumberAgain') {

            setNumberAgain(true)
            setBtnText('Mandar Sms')
        }
    }

    const isLimitReached = (countPass) => {

        // Limit to send sms
        if (countPass === 1) {
            setReturnRegister(true)
            setIsFinish(true)
            return true
        }

        return false
    }





    // Si viene de recuperar pwd no se muestra introducir número de nuevo

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={utils.quitKeyboard}>
                <ScrollView >
                    <View style={styles.logoContainer}>
                        <DisplayLogo stylesLogo={styles.logo} />
                    </View>
                    <View style={styles.btnActionContainer}>

                        <View>

                            {numberAgain ?
                                <>
                                    <Text>Favor de ingresar de nuevo un número.</Text>
                                    <Input
                                        placeholder="Número JRmóvil"
                                        secureTextEntry={false}
                                        keyboardType='number-pad'
                                        leftIcon={{ type: 'font-awesome', name: 'mobile', size: 24, color: 'grey' }}
                                        onChangeText={number => verifyNumber(number)}
                                        maxLength={constants.MAX_NUMBER_LENGTH}
                                    />
                                </>
                                :
                                <>
                                    <Text>Favor de ingresar el código enviado por SMS.</Text>
                                    <Input
                                        placeholder="Código SMS"
                                        keyboardType='number-pad'
                                        maxLength={4}
                                        value={value}
                                        secureTextEntry={false}
                                        leftIcon={{ type: 'font-awesome', name: 'key', size: 18, color: 'grey' }}
                                        onChangeText={code => onChangeCode(code)}
                                    />
                                </>
                            }


                        </View>
                        <View>
                            {numberAgain ?
                                null
                                :
                                <>
                                    <IntentBtn
                                        isDisabled={btnDisabledFlag}
                                        intent='Register'
                                        navigation={navigation}
                                        btnText='Continuar' />
                                </>
                            }
                            <View style={{ alignItems: 'center' }}>
                                {!numberAgain ?
                                    <View style={styles.btnsContainer}>
                                        <TouchableBtn
                                            text='Mandar SMS de nuevo'
                                            finish={isFinish}
                                            countDown={countDown}
                                            action={() => smsHandler('SendAgain')}
                                        />
                                        <Text>  /  </Text>
                                        <TouchableBtn
                                            text='Introducir otro número'
                                            finish={isFinish}
                                            action={() => smsHandler('NumberAgain')}
                                        />
                                    </View>
                                    : <TouchableBtn
                                        text='Mandar SMS'
                                        disabledSms={smsSendDisabled}
                                        action={() => smsHandler('SendAgain2')}
                                    />}
                                {returnRegister ?
                                    <View style={styles.btnsContainer}>
                                        <TouchableOpacity onPress={() => smsHandler('Return')} style={{ alignItems: 'center' }}>
                                            <Text style={[styles.phoneTxt]}>Regresar</Text>
                                        </TouchableOpacity>

                                    </View>
                                    :
                                    null}
                            </View>
                        </View>
                        {!pass2 ?
                            <View style={{ alignItems: 'center' }}>
                                <Text>Este número ya está registrado.
                                    <TouchableWithoutFeedback>
                                        <Text style={{ color: styleConst.MAINCOLORS[0] }}> Ingresar</Text>
                                    </TouchableWithoutFeedback></Text>
                            </View>
                            : null}
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
    btnsContainer: {
        flexDirection: 'row',
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
