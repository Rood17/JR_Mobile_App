import React, { useState, useEffect, useContext } from 'react';
import DisplayLogo from '../elements/DisplayLogo';
import { WarningAdvice } from '../elements/Elements'
import Help from '../elements/Help';
import * as constants from '../../utils/constants/Constants';
import * as styleConst from '../../res/values/styles/StylesConstants'
import * as strings from '../../res/values/strings/Strings'
import * as utils from '../../utils/Utils'
import { Icon, Input, Overlay } from 'react-native-elements'
import { clearStorage, getUserId, storeUserData, storeUserString } from '../../utils/Storage';
import { createUser, registerUser, editUser } from '../../context/AuthProvider';
import FirebaseContext from '../../../context/firebase/FirebaseContext';
import RNRestart from 'react-native-restart'; 
import AuthContext from '../../../context/auth/AuthContext';
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
    Keyboard,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Btn Disabled Flaf Team
let pass1, pass2, pass3, i;
let { isBold1, isBold2, isBold3 } = '500'

/**
 * NewPwd
 * @param {state} setOnPwdChange, setNewPwd, setError
 * @param {Boolean} emailPass 
 * @param {String} goToIntent, btnTxt, label, editName, editLastName, editEmail
 * @param {navigation} navigation 
 * @param {Array} dataArray 
 * @returns Component NewPwd
 */
export const NewPwd = ({ setOnPwdChange,setNewPwd, 
    update, setError, emailPass, goToIntent, btnTxt, 
    label, navigation, dataArray,
    editName, editLastName, editEmail }) => {

    // Context
    const { registerResponse, registerUser } = useContext(AuthContext);

    // States
    const [chackColor, setChackColor] = useState(styleConst.SECONDARY_TXT_COLOR);
    const [chackColor2, setChackColor2] = useState(styleConst.SECONDARY_TXT_COLOR);
    const [chackColor3, setChackColor3] = useState(styleConst.SECONDARY_TXT_COLOR);
    const [btnDisabled, setbtnDisabled] = useState(true);
    const [leftIcon, setLeftIcon] = useState('eye')
    const [secureText, setSecureText] = useState(false)
    const [pwd, setPwd] = useState()
    const [btnText, setBtnText] = useState(!update ? 'Registrarse' : 'Guardar')

    console.log("[Info] Register_2 - NewPwd **")
    console.log("[Info] Register_2 - NewPwd setNewPwd  " + setNewPwd)
    console.log("[Info] Register_2 - NewPwd editName  " + editName)
    console.log("[Info] Register_2 - NewPwd editLastName   " + editLastName)
    console.log("[Info] Register_2 - NewPwd editEmail   " + editEmail)

    
    const onChangeText = (text) => {
        setOnPwdChange(true)
        i = text.length;
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
        if (text.length > 4 && text.length < 13) {
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
        if (pass1 != undefined && pass2 != undefined && pass3 != undefined && emailPass) {
            setbtnDisabled(false)
            setLeftIcon('eye-slash')
            // set pwd
            dataArray[0].pwd = text;
            setPwd(dataArray[0].pwd)
            //console.log("[Info] Register_2 - onChangeText.secret : " + pwd)
        }
        else { setbtnDisabled(true) }
    }

    const registerHandler = () => {
        register()
    }

    // User Register??
    async function register () {
        let email = dataArray[0].email
        dataArray[0].pwd = pwd

        console.log("[Info] Register_2 - register ** ")
        console.log("[Info] Register_2 - register.pwd : " + pwd)
        console.log("[Info] Register_2 - register.email : " + email)
        console.log("[Info] Register_2 - register.idSubscriber : " + dataArray[0].idSubscriber)
        console.log("[Info] Register_2 - register.name : " + dataArray[0].name)
        console.log("[Info] Register_2 - register.pwd : " + dataArray[0].lastName)


        email = email.toLowerCase();
        let newSecret = pwd

        // Handle type of action
        let registerResponse2;
        if ( !update){
            let myPromiseCreate = new Promise( ( resolve ) => {
                //resolve(registerUser(dataArray,))
                
                resolve(registerUser(dataArray))
            })
            const create = await myPromiseCreate.finally(
                () => {
                    console.log("[Info] Register_2 - register.registerUser Fin *")
                }
            )
            registerResponse2 = create           
            
        } else {
            const edit = editUser(navigation, dataArray[0].idSubscriber, editName, editLastName, editEmail, newSecret)
        }

        if (registerResponse2 =='Error: Request failed with status code 400' ) {
            setError(<WarningAdvice type={2} warningText='Este mail ya se encuentra registrado.' />)
        }
        else if (registerResponse2 =='Error: Network Error') {
            setError(<WarningAdvice type={2} warningText='Favor de revisar su conexión.' />)
        }

    }

    return (
        <>
            <View>
                <Input
                    onEndEditing={() => {setSecureText(true); setLeftIcon('eye-slash')}}
                    onTextInput={() => {setSecureText(false); setLeftIcon('eye')}}
                    placeholder={label}
                    textContentType='password'
                    maxLength={12}
                    secureTextEntry={secureText}
                    leftIcon={{ type: 'font-awesome', name: 'lock', size: 18, color: styleConst.MAINCOLORSLIGHT[1] }}
                    rightIcon={{ type: 'font-awesome', name: leftIcon, size: 18, color: styleConst.MAINCOLORSLIGHT[1] }}
                    color={styleConst.MAINCOLORS[1]}
                    onChangeText={text => onChangeText(text)}
                />
                <Text style={{color:styleConst.SECONDARY_TXT_COLOR}}>Favor de Introducir como mínimo los siguientes criterios:</Text>
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
                        }}>5 a 12 caracteres</Text>
                    </View>
                </View>

                <Button
                    //style={stylesBtn == null ? btnNormal() : stylesBtn}
                    onPress={registerHandler}
                    color={styleConst.MAINCOLORS[0]}
                    title={btnText}
                    disabled={btnDisabled}
                />
            </View>

        </>
    )

}
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
        fontWeight: '600',
        color: styleConst.MAINCOLORS[1]
    },
});

/**
 * Register_2
 * @param {Boolean} recovery 
 * @param {navigation} navigation 
 * @param {Params} route 
 * @returns Register_2 Component
 */
const Register_2 = ({ recovery, navigation, route }) => {

    // Params
    const { idSubscriber, name, lastName } = route.params;
    const dataArray = [{ idSubscriber: idSubscriber, name: name, lastName: lastName, email: null }]

    const [emailIsCorrect, setEmailIsCorrect] = useState(false);
    const [email, setEmail] = useState('none');
    const [error, setError] = useState();
    const [onPwdChange, setOnPwdChange] = useState(false);

    const [keyBoardIsOpen, setKeyBoardIsOpen] = useState();

    // Just one time
    useEffect(() => {
        if (onPwdChange) validateEmail()
    }, [onPwdChange])
    
    const validateEmail = () => {
        setError('')
        if (onPwdChange && email != undefined && email.length > 1){
            if (email.indexOf('@') != -1 && email.indexOf('.') != -1) {
                setEmailIsCorrect(true)
                setError('')
    
            } else {
                setError('')
                setError(<WarningAdvice type={2} warningText='Introduzca un email válido.' />)
                setEmailIsCorrect(false)
            }
        } else {
            setEmailIsCorrect(false)
        }
    }

    const onChangeEmail = (inputEmail) => {
        setEmailIsCorrect(false)
        setError('')
        setEmail(inputEmail)
        validateEmail()
    }
    // Set email
    dataArray[0].email = email


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
                <ScrollView >
                    <View style={styles.logoContainer}>
                        <DisplayLogo stylesLogo={styles.logo} />
                    </View>
                    <View style={styles.btnActionContainer}>
                        {!recovery ?
                            <>
                                <Text style={{color:styleConst.SECONDARY_TXT_COLOR}}>
                                    Para entrar a tu portal "JRmóvil" es necesario que
                                    introduzcas tus datos.
                                </Text>
                                <View>
                                    <Input
                                        placeholder="Email"
                                        textContentType='emailAddress'
                                        keyboardType='email-address'
                                        autoComplete='email'
                                        errorMessage={error}
                                        secureTextEntry={false}
                                        leftIcon={{ type: 'font-awesome', name: 'envelope', size: 18, color: 'grey' }}
                                        onChangeText={email => onChangeEmail(email)}
                                    />

                                </View>
                            </>
                            :
                            <Text style={{ marginBottom: 20, color:styleConst.SECONDARY_TXT_COLOR }}>
                                Introduzca una nueva contraseña segura, para poder ingresar a tu portal JRmóvil.
                            </Text>
                        }


                        <NewPwd
                            label='Ingresar Contraseña'
                            goToIntent='Register_Sms'
                            btnTxt='Registrarse'
                            navigation={navigation}
                            emailPass={emailIsCorrect}
                            dataArray={dataArray}
                            setError={setError}
                            setOnPwdChange={setOnPwdChange}
                        />

                    </View>



                </ScrollView>
            </TouchableWithoutFeedback>
            {!keyBoardIsOpen ? <Help navigation={navigation} /> : null}
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
        flex: 1,
        height: 90,
        margin: 50,
        marginTop:100,
        marginBottom:80
    },
    btnActionContainer: {
        padding: 20,
        flex: 3
    },
    phoneTxt: {
        color: styleConst.MAINCOLORS[1],
        fontSize: 15,
        fontWeight: '600',
        margin: 10
    }
});

export default Register_2;
