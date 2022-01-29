/**
 * -- Asistance JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import { UserImg, ReturnHeader, WarningAdvice } from "../elements/Elements";
import { Icon, Input } from 'react-native-elements'
import * as styleConst from '../../res/values/styles/StylesConstants'
import IntentBtn from '../elements/IntentBtn'
import {updateEmail} from '../../context/AuthProvider'; '../../context/AuthProvider';
import * as constants from '../../utils/constants/Constants'
import { NewPwd } from '../auth/Register_2';
import { clearStorage, getUserName,  storeUserData, storeUserString,
    getUserEmail, getUserId, getUserLastName, getSecret } from '../../utils/Storage'
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Switch,
    TouchableOpacity,
} from 'react-native';

// Card
export const CardPerfil = () => {
    const [name, setName] = useState(getUserName());
    const [lastName, setLastName] = useState(getUserLastName());
    const [email, setEmail] = useState(getUserEmail());
    const [pwd, setPwd] = useState(getSecret());
    const [idPass, setIdPass] = useState(true);
    const [error, setError] = useState('')
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    let dataArray = [{idSubscriber:getUserId() ,name:name, email:email, lastName: lastName, pwd:pwd}]
    const letter = name.slice(0,1 - name.length);
    const oldEmail = getUserEmail();
    const oldPwd = 'Prueba123';


    function onChangeName(inputname) {
        //nameInput.clear()
        setName(inputname);
        setIdPass(false)
        //uthProvider.call()
    }

    const onChangeLastName = (lastname) => {
        //nameInput.clear()
        setLastName(lastname)
        setIdPass(false)
        dataArray[0].lastName = lastname
    }

    const onChangeEmail = (email) => {
        //nameInput.clear()
        setEmail(email)
        setIdPass(false)
        dataArray[0].email = email
    }

    const onChangeNumber = (pwd) => {
        //nameInput.clear()
        setIdPass(false)
        if (pwd.length == 8 )
            if ( pwd == getSecret() ){
                setError('')
                setIdPass(true)
                dataArray[0].pwd = pwd
            }
            else {
                setError(<WarningAdvice type={2} warningText='El número o contraseña es incorrecto.' />)
            }
        else
            setError('')
    }

    const updateHandler = () => {
        console.log("XXXXXXXX*** email : " + email)
        console.log("XXXXXXXX*** oldMail : " + oldEmail)
        if ( email.toString() != oldEmail){}
            //updateEmail()

        //if ( pwd != oldPwd )
        //updatePwd()
    }

    const reauthenticate = (currentPassword) => {
        var user = auth().currentUser;
        var cred = auth.EmailAuthProvider.credential(
            oldEmail, 'Prueba123');
        return user.reauthenticateWithCredential(cred);
      }

    function updateEmail() {
        let email =  dataArray[0].email
        let pwd = 'Prueba123'
        

        if ( !isEnabled ){
            console.log("****************  ")
            console.log("*** pwd : " + pwd)
            console.log("*** oldPwd : " + oldPwd)
            console.log("*** email : " + email)
            console.log("*** oldMail : " + oldEmail)
            console.log("*** idSubscriber : " + dataArray[0].idSubscriber)
            console.log("*** name : " + dataArray[0].name)
            console.log("*** lastName : " + dataArray[0].lastName)

            email = email.toLowerCase();
            console.log("array : " + auth().authCurrentUser)  

            try {

                reauthenticate().then(() => {
                    var user = auth().currentUser;
                    user.updateEmail(email).then(() => {
                    console.log("Email updated!");
                    // Clear Storage
                    clearStorage();
                    // Open Modal
                    // Store New Data
                    storeUserData(dataArray);
                    // User Just Register
                    storeUserString('lastView', 'Main') 
    

                }).catch(error => {
                    if (error.code === 'auth/user-not-found') {
                    console.log('No existe el usuario!');
                    setError(<WarningAdvice type={2} warningText='Este email ya está registrado.' />)
                    setIsBtnDisable(true);
                    }
                
                    if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    setError(<WarningAdvice type={2} warningText='El mail no es válido.' />)
                    setIsBtnDisable(true);
                    }
                
                    console.error(error);
                });
            }).catch(error => {
                console.log(error)
            })
            } catch {
                alert('Error al crear la cuenta - Compruebe el estado de su conexión.')
                
            }
        }            
    }

    function updatePwd() {
        let email =  dataArray[0].email
        let pwd = 'Prueba123'
        

        if ( !isEnabled ){

            console.log("****************  ")
            console.log("*** pwd : " + pwd)
            console.log("*** oldPwd : " + oldPwd)
            console.log("*** email : " + email)
            console.log("*** oldMail : " + oldEmail)
            console.log("*** idSubscriber : " + dataArray[0].idSubscriber)
            console.log("*** name : " + dataArray[0].name)
            console.log("*** lastName : " + dataArray[0].lastName)

            email = email.toLowerCase();
            console.log("array : " + auth().authCurrentUser)  

            

            try {

                reauthenticate().then(() => {
                    var user = auth().currentUser;
                    user.updatePassword(pwd).then(() => {
                    console.log("Pwd updated!");
                }).catch(error => {
                    if (error.code === 'auth/user-not-found') {
                    console.log('No existe el usuario!');
                    setError(<WarningAdvice type={2} warningText='Este email ya está registrado.' />)
                    setIsBtnDisable(true);
                    }
                
                    if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    setError(<WarningAdvice type={2} warningText='El mail no es válido.' />)
                    setIsBtnDisable(true);
                    }
                
                    console.error(error);
                });
            }).catch(error => {
                console.log(error)
            })
            } catch {
                alert('Error al crear la cuenta - Compruebe el estado de su conexión.')
                
            }
        }            
    }

    const storgaeUpdate = () => {
        // Clear Storage
        clearStorage();
        // Open Modal
        // Store New Data
        storeUserData(dataArray);
        // User Just Register
        storeUserString('lastView', 'Main') 
    }

    
    
    
    return (

        <View style={stylesCardPerfil.boxShadow}>
            <View style={stylesCardPerfil.headerContainer}>
                <View style={stylesCardPerfil.iconContainer}>
                    <UserImg
                        txt={letter}
                        medium
                        backColor={styleConst.MAINCOLORS[2]}
                        colorTxt='white' />
                </View>
            </View>
            <View style={stylesCardPerfil.infoContainer}>

                <View style={stylesCardPerfil.headContainer}>
                    <Input
                        placeholder="Nombre del Titular"
                        autoComplete='name'
                        value={name}
                        secureTextEntry={false}
                        leftIcon={{ type: 'font-awesome', name: 'user', size:18, color:'grey' }}
                        onChangeText={name => onChangeName(name)}
                    />
                    <Input
                        placeholder="Apellido(s)"
                        secureTextEntry={false}
                        value={lastName}
                        leftIcon={{ type: 'font-awesome', name: 'user', size:18, color:'grey'  }}
                        onChangeText={lastname => onChangeLastName(lastname)}
                    />
                    <Input
                        placeholder="Email"
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        value={email}
                        secureTextEntry={false}
                        autoComplete='email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope', size:18, color:'grey'  }}
                        onChangeText={email => onChangeEmail(email)}
                    />
                    <View style={stylesCardPerfil.pwdContainer}>
                        <Text>Cambio de Contraseña</Text>
                        <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    </View>
                    
                {isEnabled ?
                <NewPwd 
                    emailPass={true}
                    dataArray={dataArray}
                    goToIntent='guardar'
                    btnTxt='Guardar'
                    label='Ingrese Nueva Contraseña'
                />
                :
                <Button
                    //style={stylesBtn == null ? btnNormal() : stylesBtn}
                    onPress={() => updateHandler()}
                    title='Continuar'
                    disabled={idPass}
                    color={styleConst.MAINCOLORS[0]}
                />
                }
                    


                </View>
                <View>
                    
                </View>
            </View>
        </View>

    );
}

const stylesCardPerfil = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        margin: 15,
        borderBottomWidth: .5,
        borderBottomColor: styleConst.MAINCOLORSLIGHT[1],
        alignItems: 'center',
    },
    iconContainer: {
        padding: 15,
    },
    headContainer: {
        padding: 15,
        flex: 1,
        textAlign: 'justify'
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    btnContainer: {
        flexDirection: 'column',
        margin: 15
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pwdContainer:{
        marginTop: 30,
        marginLeft: 0,
        marginRight: 20,
        marginBottom: 30,
        borderBottomWidth: .5,
        borderBottomColor: styleConst.MAINCOLORSLIGHT[1],
    },
    headerTxt: {
        color: styleConst.MAINCOLORSLIGHT[1],
        fontWeight: 'bold'
    },
    cardHeadTxt: {
        color: styleConst.MAINCOLORSLIGHT[2],
        fontWeight: 'bold'
    },
    boxShadow: {
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 30,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        flexDirection: 'column'
    }
});
// END Card

const MiPerfil = ({navigation}) => {
    // header, text, icon
    return (
        <ScrollView style={styles.container} >
            <ReturnHeader title='Administrar mi perfil' navigation={navigation}/>
            <CardPerfil />
        </ScrollView>

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

export default MiPerfil;