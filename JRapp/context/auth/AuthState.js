import React, { useReducer, useState } from 'react';

import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import { LOG_INFO } from '../../app/res/values/strings/Strings';
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
    console.log("[Info] AuthState **")
    getUserData()

    const isUserLogged = async (authFlag) => {
        let resultFlag;
        let final;
        console.log(LOG_INFO('AuthState', 'authFlag')+authFlag)

        // Use fla
        if( authFlag == true || authFlag == false) {
            dispatch({
                type: IS_USER_LOGGED,
                payload: authFlag
            });
            console.log("[Info] Auth State - isUserLogged - USER LOGED OUT **")

            return authFlag;
        }
     // Call Local Hc
        let myPromise = new Promise(function (resolve) {
        resolve(getUserData().then((response) => {
                resultFlag = response

            }).catch((error) => {
                console.error('[Error] AuthState - isUserLogged'+error.message);
            }).finally(() => {
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
            
        let myPromise = new Promise(function (resolve) {
            if ( idSubscriber != undefined && pwd != undefined ) {
    
                resolve(getUserAuth(idSubscriber, pwd).then((response)=> {
                    console.log(LOG_INFO('AuthState', 'login.last_name')+response.last_name)

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
                        storeUserData(dataArray);
                        //storeUserString('login')
                        // User Just Register
                        setError()                        
                        isUserLogged(true);
                    }
    
                }).catch((error) => console.error("[Error] Error in isUserLogin : " + error))
                .finally(()=>{
                    console.log("[Info] Auth State - login - fin **")
                }))
    
            
            }
        });
        result = await myPromise
        return  result;
    
    }

    const registerUser = async (dataArray) => {

        console.log("[Info] Auth State - Register **")
        console.log(LOG_INFO('AuthState', 'registerUser.idSubscriber')+dataArray[0].idSubscriber)

        let result;
    
        const email = dataArray[0].email.toLowerCase();
        let myPromise = new Promise( (resolve) => {
    
    
            try {
                resolve(registerAPIUser(dataArray, email).then((response) => {
                    
                    // Response
                    // Storage
                    result = response.id
            
                    console.log(LOG_INFO('AuthState', 'registerUser - User account created & signed in!')+ response.id)
                      
                    storeUserData(dataArray)
                    storeUserString('register')
                    isUserLogged(true);
                    
                }).catch(error => {
                    result = error
                    console.error('[Error] AuthState - registerUser'+error.message);
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

    console.log("[Info] Auth State - editUser **")
    console.log(LOG_INFO('AuthState', 'editUser -idSubscriber')+ editPwd)


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

                console.log(LOG_INFO('AuthState', 'editUser.editAPIUser - ¡Usuario actualizado!')+true)

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
            console.error('[Error] AuthState - editUser'+error.message);
        });
    } catch {
        alert('Error al crear la cuenta - Compruebe el estado de su conexión.')

    }

    return result;
}