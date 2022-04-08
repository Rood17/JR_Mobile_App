import React, { useEffect, useState, useContext } from 'react';
import { Card, ReturnHeader, WarningAdvice} from "../elements/Elements";
import * as styleConst from '../../res/values/styles/StylesConstants'
import { Icon, Input } from 'react-native-elements'
import * as constants from '../../utils/constants/Constants'
import IntentBtn from '../elements/IntentBtn';
import UserContext from '../../../context/user/UserContext';
import {send_recovery_email} from '../../utils/services/get_services'
import { LOG_INFO } from '../../res/values/strings/Strings';

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
export const PwdRecoveryCard = ({ navigation, idSubscriber }) => {
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [displayColor, setDisplayColor] = useState(styleConst.MAINCOLORSLIGHT[1]);
    const [errorMsg, setErrorMsg] = useState('');
    const [rcvryEmail, setRcvryEmail] = useState();
    const [rcvryResponse, setRecvryResponse] = useState()
    const [countPass, setCountPass] = useState(0)
    const [countDown, setCountDown] = useState();
    
    console.log(' *********** 1 ')
    // Validate if Number account exist
    const onChangeEmail = (email) => {
        console.log(' *********** 1 b ')
        if (email == userData) {
            
            if (email == userData) {
                setDisabledBtn(false)
                setDisplayColor(styleConst.MAINCOLORSLIGHT[1])
                setErrorMsg('')
                setRcvryEmail(email)
            } else {
                setDisplayColor('red')
                setDisabledBtn(true)
                setErrorMsg('Este no es el mail con el que te registraste.')
            }

        }
        else {
            setDisabledBtn(true)
            setDisplayColor(styleConst.MAINCOLORSLIGHT[1])
            setErrorMsg('')
        }

    }
    console.log(' *********** 2 ')
    const rcvry_btn_handler = () => {
        console.log(' *********** 2 b')
        const myPromise = new Promise(function (resolve) {
            resolve(send_recovery_email(idSubscriber, rcvryEmail)
            .then((response) => {
                console.log(LOG_INFO('RecoveryEmail', 'rcvry_btn_handler.send_recovery_email')+response)
                    if(response){
                        setDisabledBtn(true)
                        setRecvryResponse(<WarningAdvice type={3} warningText='El mail se envió con éxito.' />)
                        // Counting
                        if (countPass == 0){
                            setCountDown(55)
                            setCountPass(1)
                        }
                        if (countPass > 0){
                            setCountDown(156)
                            setCountPass(2)
                        }
                        if (countPass > 1){
                            setCountDown(null)
                            setCountPass(3)
                        }
                    } else {
                        setRecvryResponse(<WarningAdvice type={2} warningText='Favor de probar más tarde.' />)
                    }
                }
            ))
        })
    }
    console.log(' *********** 3 ')
    const { userData, getUserEmail } = useContext(UserContext);
    const [secretEmail, setSecretEmail] = useState()
    let secretString = '*';
    console.log(' *********** 4 ')
    useEffect( () => {
        const userEmailD = getUserEmail(idSubscriber)
        if (userEmailD!= undefined)
            console.log(LOG_INFO('RecoveryEmail', 'PwdRecoveryCard.userEmailD')+userEmailD)

    }, [])
    console.log(' *********** 5 ')
    useEffect( () => {
        if (userData && userData != undefined) {
            let aIndex = userData.indexOf('@')
            let mainEmail = userData.slice(aIndex -3 ,aIndex.length);
            for (var i=0; i < aIndex; i++ ) {
                secretString += '*'
            }
            setSecretEmail(secretString + mainEmail)
        }
    }, [userData])


    // CountDown
    // Count Down
    console.log(' *********** 6 ')
    useEffect( () => {
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
                setDisabledBtn(false)
            }

        }, 1000);
    }, [countDown])


    console.log(' *********** 7 ')
    return (

        <View style={stylesMainCard.boxShadow}>
            <View style={{ paddingLeft: 15, paddingRight: 15, marginTop: 35 }}>
                <Text style={{color : styleConst.SECONDARY_TXT_COLOR}}>Ingresa el mail con el que te registraste, con terminación "{secretEmail}".</Text>
            </View>
            <View style={stylesMainCard.inputContainer}>
                <Input
                    placeholder="Email"
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    errorMessage={errorMsg}
                    secureTextEntry={false}
                    leftIcon={{ type: 'font-awesome', name: 'envelope', size: 18, color: styleConst.SECONDARY_TXT_COLOR }}
                    onChangeText={email => onChangeEmail(email)}
                />
                {rcvryResponse 
                ? <Text>{rcvryResponse}</Text>
                : null}
                
            </View>
            <View style={{ marginBottom: 30, width:'80%' }}>
                <Button
                    //style={stylesBtn == null ? btnNormal() : stylesBtn}
                    disabled={disabledBtn}
                    onPress={() => rcvry_btn_handler()}
                    color={styleConst.MAINCOLORS[0]}
                    title={countDown ? 'volver a enviar en ('+countDown.toString()+')' : 'Enviar'}
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

const RecoveryEmail = ({navigation, route}) => {

    const { idSubscriber } = route.params;
    // header, text, icon
    return (
        <>
            <View style={styles.container} >
                <ReturnHeader title='Recuperar contraseña' navigation={navigation}/>
                <View style={{ flex: 1 }}>
                    <PwdRecoveryCard 
                    navigation={navigation}
                    idSubscriber={idSubscriber}
                    />
                    <View style={styles.registerContainer}>
                        <Text style={{color:styleConst.SECONDARY_TXT_COLOR}}>Espera un momento a que te llegue el mail.</Text>
                        <Text style={{color:styleConst.SECONDARY_TXT_COLOR}}>Si no ves el mail, revisa la bandeja de "Spam".</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{color: styleConst.MAINCOLORS[0]}}>¿Ya recibiste el correo?... Regresa.</Text>
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

export default RecoveryEmail;