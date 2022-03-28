import React, { useState } from 'react';
import type { Node } from 'react';
import { Card, ReturnHeader } from "../elements/Elements";
import * as styleConst from '../../res/values/styles/StylesConstants'
import { Icon, Input } from 'react-native-elements'
import * as constants from '../../utils/constants/Constants'
import IntentBtn from '../elements/IntentBtn';

import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
} from 'react-native';


// MainCard
export const PwdRecoveryCard = ({ navigation, title, subtitle, subtitleColor }) => {
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [displayColor, setDisplayColor] = useState(styleConst.MAINCOLORSLIGHT[1]);
    const [errorMsg, setErrorMsg] = useState('');
    const [idSubscriber, setIdSubscriber] = useState();
    const numberExist = 888

    // Validate if Number account exist
    const onChangeNumber = (number) => {
        if (number.length === constants.MAX_NUMBER_LENGTH) {
            if (number.toString().indexOf(numberExist) != -1) {
                setDisabledBtn(false)
                setDisplayColor(styleConst.MAINCOLORSLIGHT[1])
                setErrorMsg('')
                setIdSubscriber(number)
            } else {
                setDisplayColor('red')
                setDisabledBtn(true)
                setErrorMsg('Este número aún no tiene una cuenta registrada.')
            }

        }
        else {
            setDisabledBtn(true)
            setDisplayColor(styleConst.MAINCOLORSLIGHT[1])
            setErrorMsg('')
        }

    }

    return (

        <View style={stylesMainCard.boxShadow}>
            <View style={{ paddingLeft: 15, paddingRight: 15, marginTop: 35, color:styleConst.MAINCOLORS[3] }}>
                <Text>Ingresa tu nùmero JRmóvil, para enviarte un còdigo de autentificaciòn.</Text>
            </View>
            <View style={stylesMainCard.inputContainer}>
                <Input
                    placeholder="Número JRmóvil (10 dígitos)"
                    keyboardType='number-pad'
                    textContentType='telephoneNumber'
                    errorMessage={errorMsg}
                    leftIcon={{ type: 'font-awesome', name: 'mobile', size: 18, color: displayColor }}
                    maxLength={constants.MAX_NUMBER_LENGTH}
                    style={{ borderBottomColor: displayColor, color: displayColor }}
                    onChangeText={number => onChangeNumber(number)}
                />
            </View>
            <View style={{ marginBottom: 30, width:'80%' }}>
                <IntentBtn
                    isDisabled={disabledBtn}
                    intent='RegisterSms'
                    btnParams={{idSubscriber:idSubscriber}}
                    btnText='Enviar'
                    navigation={navigation}
                />
            </View>
        </View>

    );
}
const stylesMainCard = StyleSheet.create({
    inputContainer: {
        width: '100%',
        padding: 20
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

const ForgottenPwd = ({navigation}) => {
    // header, text, icon
    return (
        <>
            <View style={styles.container} >
                <ReturnHeader title='Recuperar contraseña' navigation={navigation}/>
                <View style={{ flex: 1 }}>
                    <PwdRecoveryCard 
                    navigation={navigation}
                    />
                    <View style={styles.registerContainer}>
                        <Text>Si aún no estás registrado,</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{color: styleConst.MAINCOLORS[0]}}>¿Qué esperas?... ¡Es gratis!</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        padding: 20,
        flex: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    registerContainer: {
        alignItems: 'center',
        margin: 10
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
});

export default ForgottenPwd;