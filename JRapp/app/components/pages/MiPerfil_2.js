import React, { useState } from 'react';
import { UserImg, ReturnHeader, WarningAdvice } from "../elements/Elements";
import { Icon, Input } from 'react-native-elements'
import * as styleConst from '../../res/values/styles/StylesConstants'
import IntentBtn from '../elements/IntentBtn'
import { editUser } from '../../context/AuthProvider';
import * as constants from '../../utils/constants/Constants'
import { NewPwd } from '../auth/Register_2';
import { LOG_INFO } from '../../res/values/strings/Strings';
import {
    clearStorage, getUserName, storeUserData, storeUserString,
    getUserEmail, getUserId, getUserLastName, getSecret
} from '../../utils/Storage'
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
export const CardPerfil = ({ navigation }) => {
    // User Combo
    const [newName, setNewName] = useState(getUserName());
    const [newLastName, setNewLastName] = useState(getUserLastName());
    const [newEmail, setNewEmail] = useState(getUserEmail());
    const [newPwd, setNewPwd] = useState(getSecret());
    const [onPwdChange, setOnPwdChange] = useState(false);
    const [editNameToSend, setEditNameToSend] = useState(false);
    const [editLastNameToSend, setEditLastNameToSend] = useState(false);
    const [editEmailToSend, setEditEmailToSend] = useState(false);


    const [error, setError] = useState('');

    // Switch
    const [newPwdOn, setnewPwdOn] = useState(false);
    const toggleSwitch = () => {
        setAllData()
        setnewPwdOn(previousState => !previousState)
    }

    // Current Data
    const letter = newName.slice(0, 1 - newName.length);
    const oldName = getUserName();
    const oldLastName = getUserLastName();
    const oldEmail = getUserEmail().toString();
    const oldPwd = getSecret();
    const idSubscriber = getUserId();

    let dataArray = [{ idSubscriber: idSubscriber, name: newName, email: newEmail, lastName: newLastName, pwd: newPwd }]
    let disabledBtn = true;
    let editName = oldName;
    let editLastName = oldLastName;
    let editEmail = oldEmail;
    let editPwd = oldPwd;

    // Name Validations
    if ((newName.length > 3 && (oldName !== newName)) ||
        (newLastName.length > 3 && oldLastName !== newLastName) ||
        (newEmail.length > 3 && oldEmail !== newEmail)) {
        disabledBtn = false
        //setdisabledBtn(false)
    } else {
        //setdisabledBtn(true)
        disabledBtn = true
    }

    console.log(LOG_INFO('MiPerfil_2', 'CardPerfil.editName') + editName)
    console.log(LOG_INFO('MiPerfil_2', 'CardPerfil.editLastName') + editLastName)
    console.log(LOG_INFO('MiPerfil_2', 'CardPerfil.editEmail') + editEmail)
    console.log(LOG_INFO('MiPerfil_2', 'CardPerfil.editPwd') + editPwd)

    const setAllData = () => {

        setNewEmail(newEmail.toLowerCase());

        if ( oldName != newName)
            editName = newName
        if ( oldLastName != newLastName)
            editLastName = newLastName;

        if ( oldEmail != newEmail)
            editEmail = newEmail
        if ( oldPwd != newPwd)
            editPwd = newPwd;


        setEditNameToSend(editName)
        setEditLastNameToSend(editLastName)
        setEditEmailToSend(editEmail)
    }

    const updateHandler = () => {

        // Ash  
        setAllData()
    
    if (!newPwdOn && !disabledBtn) {
        if (oldName != newName || oldLastName != newLastName || 
            oldEmail != newEmail || oldPwd !=  newPwd || onPwdChange) {
                editUser(navigation, idSubscriber, 
                    editName, editLastName, editEmail, editPwd)
        }
    }

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
                        value={newName}
                        disabled={newPwdOn ? true : false}
                        secureTextEntry={false}
                        leftIcon={{ type: 'font-awesome', name: 'user', size: 18, color: 'grey' }}
                        onChangeText={name => setNewName(name)}
                    />
                    <Input
                        placeholder="Apellido(s)"
                        secureTextEntry={false}
                        disabled={newPwdOn ? true : false}
                        value={newLastName}
                        leftIcon={{ type: 'font-awesome', name: 'user', size: 18, color: 'grey' }}
                        onChangeText={lastname => setNewLastName(lastname)}
                    />
                    <Input
                        placeholder="Email"
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        disabled={newPwdOn ? true : false}
                        value={newEmail}
                        secureTextEntry={false}
                        autoComplete='email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope', size: 18, color: 'grey' }}
                        onChangeText={email => setNewEmail(email)}
                    />
                    <View style={stylesCardPerfil.pwdContainer}>
                        <Text style={{color : styleConst.SECONDARY_TXT_COLOR}}>Cambio de Contraseña</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={newPwdOn ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={newPwdOn}
                        />
                    </View>

                    {newPwdOn ?
                        <NewPwd
                            navigation={navigation}
                            emailPass={true}
                            dataArray={dataArray}
                            goToIntent='guardar'
                            btnTxt='Guardar'
                            label='Ingrese Nueva Contraseña'
                            update
                            setNewPwd={setNewPwd}
                            setOnPwdChange={setOnPwdChange}
                            editName={editNameToSend}
                            editLastName = {editLastNameToSend}
                            editEmail = {editEmailToSend}
                        />
                        :
                        <Button
                            //style={stylesBtn == null ? btnNormal() : stylesBtn}
                            onPress={() => updateHandler()}
                            title='Guardar'
                            disabled={disabledBtn}
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
    pwdContainer: {
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
        color: styleConst.SECONDARY_TXT_COLOR,
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

const MiPerfil = ({ navigation }) => {
    // header, text, icon
    return (
        <ScrollView style={styles.container} >
            <ReturnHeader title='Administrar mi perfil' navigation={navigation} />
            <CardPerfil navigation={navigation} />
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