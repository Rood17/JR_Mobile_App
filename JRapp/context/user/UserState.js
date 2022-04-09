import React, { useReducer } from 'react';

import UserReducer from './UserReducer';
import UserContext from './UserContext';
import { LOG_INFO } from '../../app/res/values/strings/Strings';
import {getPerfilUf, get_api_isJr, get_user_email, getPerfilUfAPI,
    getDataJson, getPaquetesApi} from '../../app/utils/services/get_services'

import { GET_IS_JR,GET_USER_DATA, GET_USER_EMAIL,USER_INFO, SIM_DATA, SIM_SMS, SIM_MIN, SIM_DATA_EXTRA} from "../../types";



const userArray = {userInfo:{}, simData:{}, simSMS:{}, simMIN:{} }
const paquetes = getPaquetesApi()
let expireDateFinal= 0;

let aver = 0;
const filterArray = (userData) => {
    // Get User Data
    let expireDate,initialAmt,unusedAmt, offeringId, ofertaActual = 0;
    let expireDateSMS,initialAmtSMS,unusedAmtSMS, offeringIdSMS = 0;
    let expireDateMIN,initialAmtMIN,unusedAmtMIN = 0;
    let dataFlag = false;
    let initialAmtExtra,unusedAmtExtra; 
    
    //offeringId
    Object.values(paquetes).map((paquete) => {
        //console.log(item.offerId)
        if (userData.responseSubscriber != undefined ){
            Object.values(userData.responseSubscriber.freeUnits).map((item) => {
                // Freeeunits
                
                if ( item != undefined){

                    // Data
                    // freeunit info
                    
                    if ( item.name.indexOf('FU_Data_Altan') != -1){

                        console.log( ' ******** : ' + item.name )
                        console.log( ' ******** x : ' + item.name.indexOf('FU_Data_Altan') )

                        offeringId = item.detailOfferings[0].offeringId
                        initialAmt = parseInt(item.freeUnit.totalAmt);
                        unusedAmt = parseInt(item.freeUnit.unusedAmt);


                        console.log( ' ******** initialAmt : ' + initialAmt )

                        // fechas
                        Object.values(item.detailOfferings).map((data) => {
                            if (parseInt(data.expireDate) > expireDateFinal )
                                expireDateFinal = parseInt(data.expireDate)
                        })

                        // set
                        expireDate = expireDateFinal.toString();

                        aver += initialAmt

                    } else {
                        dataFlag = true
                    }
    
                    if ( item.name == '88888'){
                        if (dataFlag) {
                            console.log(' ======= 1 data extra ' + dataFlag)
                            
                            offeringId = item.detailOfferings[0].offeringId;
                            initialAmtExtra = item.freeUnit.totalAmt;
                            unusedAmtExtra = parseInt(item.freeUnit.unusedAmt);

                            // fechas
                            Object.values(item.detailOfferings).map((data) => {
                                if (parseInt(data.expireDate) > expireDateFinal )
                                    expireDateFinal = parseInt(data.expireDate)
                            })

                            // set
                            expireDate = expireDateFinal.toString();
                            console.log('[Info] UserState - expireDateFinal Final *')
                        }
                    }
    
                    if ( item.name == SIM_SMS)
                    {
                        expireDateSMS = item.detailOfferings[0].expireDate;
                        initialAmtSMS = item.detailOfferings[0].initialAmt;
                        unusedAmtSMS = item.detailOfferings[0].unusedAmt;
                        offeringIdSMS = item.detailOfferings[0].offeringId
                    }
                    // Catch SMS Data
                    if ( item.name == SIM_MIN)
                    {
                        expireDateMIN = item.detailOfferings[0].expireDate;
                        initialAmtMIN = item.detailOfferings[0].initialAmt;
                        unusedAmtMIN = item.detailOfferings[0].unusedAmt;
                    }
                }
            })
        }
        

        // Get oferta actual
        if (offeringId == paquete.offerId)
            ofertaActual = paquete.name
    })

    // SET DAT AMOUNT
    if (initialAmt == undefined ) {
        initialAmt = initialAmtExtra;
    }
    else {
        console.log( ' ******* 1 : ' +initialAmt )
        initialAmt +=  parseInt(initialAmt);
        
    }
    if (unusedAmt == undefined ) {
        unusedAmt = unusedAmtExtra;
    } else {
        unusedAmt +=  parseInt(unusedAmt);
    }


    console.log( ' ******* 2 : ' +aver )
    // Setting Array
    userArray.simData = {
        expireData: expireDate,
        initialAmt : initialAmt,
        unusedAmt : unusedAmt,
        offeringId : offeringId,
        ofertaActual:ofertaActual
    }
    userArray.simSMS = {
        'expireData': expireDateSMS,
        'initialAmt' : initialAmtSMS,
        'unusedAmt' : unusedAmtSMS,
        'offeringId' : offeringIdSMS,
    }
    userArray.simMIN = {
        'expireData': expireDateMIN,
        'initialAmt' : initialAmtMIN,
        'unusedAmt' : unusedAmtMIN,
    }
}

const UserState = (props) => {

    // Crear state inicial
    const initialState = {
        userData: [],
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [state, dispatch] = useReducer(UserReducer, initialState);
    console.log('[Info] UserState **')

    const getJson = () => {
        
        const result = getDataJson()
        

        filterArray(result)
        console.log(LOG_INFO('UserState', 'getJson.result')+result)
        dispatch({
            type: GET_USER_DATA,
            payload: userArray
        });
    }
    // Función que se ejecuta para traer los productos
    const getAPIUserData = async (number) => {
            let resultFlag = false;
            let result, final;
         // Call Local Hc
         let myPromise = new Promise(function (resolve) {
            resolve(getPerfilUfAPI(number).then((response) => {
                    //filterArray(response.userData)
                    result = response.userData
                }).catch((error) => {
                    console.error('[Error] UserState - getAPIUserData'+error.message);
                }).finally(() => {

                    dispatch({
                        type: GET_USER_DATA,
                        payload: result
                    });
                })
            );

          })
         
          final = await myPromise
          return resultFlag

    }

    const userIsJr = (number) => {
        get_api_isJr(number).then( (response) => {
            dispatch({
                type: GET_IS_JR,
                payload: response
            });
        })
    }


    const getUserEmail = async (idSubscriber) => {
        let resultFlag = false;
        let final, result;
     // Call Local Hc
     let myPromise = new Promise(function (resolve) {
        resolve(
            get_user_email(idSubscriber).then( (response) => {
            result = response
        }).catch((error) => {
                console.error('[Error] UserState - getUserEmail'+error.message);
            }).finally(() => {
                console.log(LOG_INFO('UserState', 'getUserEmail.result')+result)
                dispatch({
                    type: GET_USER_DATA,
                    payload: result
                });
            })
        );
      })
     
      final = await myPromise
      return myPromise

}



return (
    <UserContext.Provider
        value={{
            userData: state.userData,
            getJson,
            getAPIUserData,
            userIsJr,
            getUserEmail
        }}
    >
        {props.children}
    </UserContext.Provider>
)
}

export default UserState;