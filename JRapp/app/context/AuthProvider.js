import React, { useContext, useEffect, useState } from "react";
import Auth, {
    getAuth, createUserWithEmailAndPassword,
    reauthenticateWithCredential, signInWithEmailAndPassword,
    updateEmail,
    EmailAuthProvider,
    updatePassword,
    getAdditionalUserInfo
} from "firebase/auth";
import {storeUserString, clearStorage, getUserData,getUserEmail, getUserId, storeUserData, getSecret } from '../utils/Storage'
import {getUserAuth, registerAPIUser, editAPIUser} from '../utils/services/get_services'
import RNRestart from 'react-native-restart';
import { LOG_INFO } from "../res/values/strings/Strings";
import AuthContext from "../../context/auth/AuthContext"; 
import { AppState } from "react-native";
import App from "../../App";

export const isUserLogged = (authFlag) => {
    console.log(LOG_INFO('AuthProvider', 'isUserLogged.authFlag')+authFlag)
    // Use flag
    if( authFlag != undefined ) return authFlag;
    const [isUserLogin, setIsUserLogin] = useState();
    

    getUserData().then( () => {
        if (getUserId() != undefined && getUserId().length == 10){
            setIsUserLogin(true)
        }
    }) 

    return isUserLogin;
}


// JR API
export const login = async (navigation, idSubscriber, pwd, setError, setLoginSuccess) => {
    // Set an initializing state whilst Firebase connects
    let result = false;
    
    if ( !idSubscriber || !pwd ) {
        getUserData()
        idSubscriber = getUserId()
        pwd = getSecret()
    } 

    console.log(LOG_INFO('AuthProvider', 'login.idSubscriber')+idSubscriber)

    let myPromise = new Promise(function (resolve) {
        if ( idSubscriber != undefined && pwd != undefined ) {

            getUserAuth(idSubscriber, pwd).then((response)=> {
                console.log(LOG_INFO('AuthProvider', 'login.getUserAuth.last_name')+response.last_name)

                result = response;

                // handle errors
                if ( result.toString().indexOf('Contraseña inválida') != -1) {
                    setError(500)
                } else {

                    let dataArray = [{ 
                        idSubscriber: idSubscriber, 
                        name: response.first_name, 
                        email: response.email, 
                        lastName: response.last_name, 
                        pwd: pwd }]

                    // antes de activar este es necesario
                    // que la api ed login regrese los datos del usuario
                    // y los mande al storge = 9999
                    // setLoginSuccess(true
                    // Clear Storage
                    // Store New Data
                    storageUpdate(dataArray, 'login');
                    // User Just Register
                    setError()                    
                    RNRestart.Restart();
                }

            }).catch((error) => console.error("[Error] AuthProvider - isUserLogin : " + error))
            .finally(()=>{
                console.log("[Info] AuthProvider - isUserLogin final *")
            })

        
        }
    });

    result = await myPromise
    return  result;

}
export const logout = (navigation) => {
    console.log("[Info] AuthProvider - Login out **")
    const user = false;
    //const auth = auth();
    //const userc = auth.currentUser;

    // Hcer pruebas al usuario -- lograr guardar más datos en el auth

    //console.log("user : " + user.id)
    //console.log("user : " + user.name)
    
    clearStorage()
    //RNRestart.Restart();

}
export const registerUser = async (dataArray) => {
    console.log("[Info] AuthProvider - registerUser **")
    console.log(LOG_INFO('AuthProvider', 'registerUser.pwd')+dataArray[0].pwd)
    console.log(LOG_INFO('AuthProvider', 'registerUser.idSubscriber')+dataArray[0].idSubscriber)

    let result;

    const email = dataArray[0].email.toLowerCase();
    let myPromise = new Promise( (resolve) => {


        try {
            registerAPIUser(dataArray, email).then((response) => {
                
                // Response
                // Storage
                result = response.data
        
                console.log(LOG_INFO('AuthProvider', 'registerAPIUser - ser account created & signed in! - ')+dataArray[0].idSubscriber)
                //console.log('User account created & signed in! ' + response.data );
                  
                resolve(storageUpdate(dataArray, 'register'))
                RNRestart.Restart();
                
            }).catch(error => {
                result = error
                console.error("[Error] registerAPIUser error - " + error);
            });
        } catch {
            alert('El Mail ya existe.')

        }
    });

    // necesit saber por que result es indefinido???

    result = await myPromise
    return result
    
}
export const editUser = ( navigation, idSubscriber, editName, editLastName, editEmail, editPwd ) => {

    console.log(LOG_INFO('AuthProvider', 'editUser.idSubscriber')+idSubscriber)
    console.log(LOG_INFO('AuthProvider', 'editUser.editEmail')+editEmail)

    let dataArray = [{ 
        idSubscriber: idSubscriber, 
        name: editName, 
        email: editEmail, 
        lastName: editLastName, 
        pwd: editPwd }]



    let result;

    try {
        editAPIUser(idSubscriber, editName, editLastName, editEmail, editPwd)
            .then((response) => {
            storageUpdate(dataArray, 'main')
            navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Main',
                  },
                ],
              })
            // Response
            result = response.data

        }).catch(error => {
            result = error
            console.error("Register error - " + error);
        });
    } catch {
        alert('Error al crear la cuenta - Compruebe el estado de su conexión.')

    }

    return result;
}

const storageUpdate = (dataArray, view) => {
    // Clear Storage
    clearStorage();
    // Store New Data
    storeUserData(dataArray);
    // User Just Register
    storeUserString('lastView', view)
    return true;
}

// OLD REGISTER MACHINERY
export const isFireUserLog = () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    const subscriber = getAuth().onAuthStateChanged(onAuthStateChanged);

    if (user)
        return true;
    else
        return false; // unsubscribe on unmount

}
export function updateUserEmail(navigation, newEmail, currentPassword, newSecret, oldEmail, setRegisterResponse ) {

    let result = '';
    newEmail = newEmail.toLowerCase();
    try {
        signInWithEmailAndPassword(auth, getUserEmail(), currentPassword)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                updateEmail(user, newEmail).then(() => {
                    console.log("[Info] AuthProvider signInWithEmailAndPassword - email updated!");
                    result = 'Success'
                    //navigation.popToTop()
                    navigation.reset({
                        index: 0,
                        routes: [
                        {
                            name: 'Main', 
                        },
                        ],
                    })
                }).catch(error => {
                    console.error("AuthProvider - UpdateEmail : " + error);
                    result = error.code
                    //setRegisterResponse(error.code)
                });
            })
    }  catch {
        alert('Error al actualizar la información - Compruebe el estado de su conexión.')
    }
    
    return result; 
}
export const updateUserPwd = (newSecret) => {
    console.log("[Info] AuthProvider updateUserPwd");

        try {
            signInWithEmailAndPassword(auth, getUserEmail(), getSecret())
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                    updatePassword(user, newSecret).then(() => {
                        console.log("[Info] AuthProvider Pwd updated!");
                        //navigation.popToTop()
                    }).catch(error => {
                        console.error("[Error] AuthProvider - UpdatePwd: " + error);
                        //setRegisterResponse(error.code)
                    });
                })
        }  catch {
            alert('Error al actualizar la información - Compruebe el estado de su conexión.')
        }


}
export const reauthenticate = (currentPassword, oldEmail) => {
    var user = getAuth();
    var cred = EmailAuthProvider.credential(
        'carlos@zz.ss', 'Prueba123').catch(error => {
            console.error("[Error] AuthProvider - reauthenticate: " + error);
        });
    return reauthenticateWithCredential(user, cred);
}
export const registerFireUser = (email, pwd, setRegisterResponse) => {

    email = email.toLowerCase();
    console.log(LOG_INFO('AuthProvider', 'registerFireUser.setRegisterResponse')+setRegisterResponse)
    try {
        createUserWithEmailAndPassword(auth, email, 'Prueba123').then(() => {
            console.log("[Info] AuthProvider - createUserWithEmailAndPassword - User account created & signed in!");

            // Response
            setRegisterResponse('success')

        }).catch(error => {
            setRegisterResponse(error)
            console.error('[Error] AuthProvider - registerFireUser'+error);
        });
    } catch {
        alert('Error al crear la cuenta - Compruebe el estado de su conexión.')

    }
}
export const Firelogin = (email, pwd, setError, setLoginSuccess) => {


    signInWithEmailAndPassword(auth, email, 'Prueba123').then(() => {

        // This one yes
        setLoginSuccess(true)
        //setSuccess(true)
        // Finalizar

    }).catch(error => {
        if (error.code === 'auth/user-not-found') {
            setError(500)
            alert('El usuario no existe');

        }

        if (error.code === 'auth/invalid-email') {
            setError(<WarningAdvice type={2} warningText='El mail no es válido.' />)
        }

        console.error('[Error] AuthProvider - Firelogin'+error);

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

}