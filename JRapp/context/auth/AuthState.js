import React, { useReducer, useState } from 'react';

import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import {storeUserString, clearStorage, getUserData, getUserId, storeUserData, getSecret } from '../../app/utils/Storage'
import {getUserAuth,registerAPIUser, getPaquetesApi} from '../../app/utils/services/get_services'

import { IS_USER_LOGGED, GET_USER_DATA, REGISTER_SUCCESS} from "../../types";



const AuthState = (props) => {
    // Crear state inicial
    const initialState = {
        authData: [],
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    console.log("Calling AUTH STATE ")
    getUserData()

    const isUserLogged = async (authFlag) => {
        let resultFlag;
        let final;
        console.log( ' 22A ******* : ')
        console.log('************************ flujo 2 ****** : ')
        console.log(" ** AUTH STATE: 1 authFlag :" + authFlag)

        // Use fla
        if( authFlag == true || authFlag == false) {
            dispatch({
                type: IS_USER_LOGGED,
                payload: authFlag
            });
            console.log(" ** USER LOGED OUT **")
            return authFlag;
        }
     // Call Local Hc
        let myPromise = new Promise(function (resolve) {
        resolve(getUserData().then((response) => {
                console.log( ' 23A ******* : ' + response)
                console.log(" ** AUTH STATE 2 : " + getUserId())
                resultFlag = response

            }).catch((error) => {
                console.log("UserState Error : " + error);
                console.error("UserState Error : " + error.message);
            }).finally(() => {
                console.log( ' 23A ******* : ' + resultFlag)
                dispatch({
                    type: GET_USER_DATA,
                    payload: resultFlag

                });
            })
        );

        })
     
      final = await myPromise
      return resultFlag

    }

    const login = async (navigation, idSubscriber, pwd, setError, setLoginSuccess) => {
        // Set an initializing state whilst Firebase connects
        let result = false;
        
    
        console.log(" *** 1 getUserId : " + idSubscriber)
        console.log(" *** 1 getSecret() : " + pwd)
    
        let myPromise = new Promise(function (resolve) {
            if ( idSubscriber != undefined && pwd != undefined ) {
                console.log('************************ isUserLog : dentro del if ' )
    
                resolve(getUserAuth(idSubscriber, pwd).then((response)=> {
                    
                    console.log("AUTH PROVIDER 222 ****   : ",response);
                    console.log("AUTH PROVIDER 222 ****   : ",response.last_name);
                    console.log("AUTH PROVIDER 222 ****   : ",response.email);
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
                        console.log("calling user !!! 111 ")
                        storeUserData(dataArray);
                        storeUserString('login')
                        console.log("calling user !!! 222  ")
                        // User Just Register
                        setError()
                        console.log("calling user !!! ")
                        
                        isUserLogged(true);
                    }
    
                }).catch((error) => console.log("Error in isUserLogin : " + error))
                .finally(()=>{
                    console.log("** isAuth final  ** ")
                }))
    
            
            }
        });
    
        console.log("*************************** AUTH PROVIDER 4444 ****   : ",result);
        result = await myPromise
        return  result;
    
    }

    const registerUser = async (dataArray) => {

        console.log("**************** Register  ")
        console.log("****************  ")
        console.log("*** pwd : " + dataArray[0].pwd)
        console.log("*** email : " + dataArray[0].email)
        console.log("*** idSubscriber : " + dataArray[0].idSubscriber)
        console.log("*** name : " + dataArray[0].name)
        console.log("*** lastName : " + dataArray[0].lastName)
        console.log("****************  ")
        console.log("****************  ")
        let result;
    
        const email = dataArray[0].email.toLowerCase();
        let myPromise = new Promise( (resolve) => {
    
    
            try {
                resolve(registerAPIUser(dataArray, email).then((response) => {
                    
                    // Response
                    // Storage
                    result = response.id
            
                    
                    console.log('User account created & signed in! ' + response.id );
                      
                    storeUserData(dataArray)
                    storeUserString('register')
                    isUserLogged(true);
                    
                }).catch(error => {
                    result = error
                    console.error("Register error - " + error);
                }).finally(() => {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        payload: result
                    });
                }))
            } catch {
                alert('El Mail ya existe.')
    
            }
        });
    
        // necesit saber por que result es indefinido???
    
        const FinalResult = await myPromise
        return result
        
    }

return (
    <AuthContext.Provider
        value={{
            authData: state.authData,
            isUserLogged,
            login,
            registerUser
        }}
    >
        {props.children}
    </AuthContext.Provider>
)
}

export default AuthState;


export const editUser = ( navigation, idSubscriber, editName, editLastName, editEmail, editPwd ) => {

    console.log("*** idSubscriber : " + idSubscriber)
    console.log("*** editName : " + editName)
    console.log("*** editLastName : " + editLastName)
    console.log("*** editEmail : " + editEmail)
    console.log("*** editPwd : " + editPwd)
    console.log("****************  ")
    console.log("**************** editUser AUTH  ")
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
            console.log('User actualization!!');
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