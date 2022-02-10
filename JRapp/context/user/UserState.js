import React, { useReducer } from 'react';

import UserReducer from './UserReducer';
import UserContext from './UserContext';
import {getPerfilUf, getDataJson, getPaquetesApi} from '../../app/utils/services/get_services'

import { GET_USER_DATA, USER_INFO, SIM_DATA, SIM_SMS, SIM_MIN, SIM_DATA_EXTRA} from "../../types";



const userArray = {userInfo:{}, simData:{}, simSMS:{}, simMIN:{} }
const paquetes = getPaquetesApi()

const filterArray = (userData) => {
    // Get User Data
    let expireDate,initialAmt,unusedAmt, offeringId, ofertaActual = 0;
    let expireDateSMS,initialAmtSMS,unusedAmtSMS, offeringIdSMS = 0;
    let expireDateMIN,initialAmtMIN,unusedAmtMIN = 0;
    let dataFlag = false;
    let initialAmtExtra,unusedAmtExtra; 

    console.log( ' 24A ******* : ' + userData.responseSubscriber.freeUnits)
    
    //offeringId
    Object.values(paquetes).map((paquete) => {
        //console.log(item.offerId)
        if (userData.responseSubscriber != undefined ){
            Object.values(userData.responseSubscriber.freeUnits).map((item) => {
                // Freeeunits
                if ( item != undefined){
    
                    if ( item.name == SIM_DATA){
                        expireDate = item.detailOfferings[0].expireDate;
                        initialAmt = item.detailOfferings[0].initialAmt;
                        unusedAmt = parseInt(item.detailOfferings[0].unusedAmt);
                        offeringId = item.detailOfferings[0].offeringId
                    } else {
                        dataFlag = true
                    }
    
                    console.log(' ======= 0 ' + initialAmt)
                    if ( item.name == SIM_DATA_EXTRA){
                        console.log('******* EXTRA **** ')
                        
                        initialAmtExtra = item.detailOfferings[0].initialAmt;
                        unusedAmtExtra = parseInt(item.detailOfferings[0].unusedAmt);
                        console.log(' ======= 1 ' + initialAmtExtra)
                        if (dataFlag) {
                            expireDate = item.detailOfferings[0].expireDate;
                            offeringId = item.detailOfferings[0].offeringId;
                            
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
        console.log(' ======= 2 ' + initialAmtExtra)

        initialAmt = initialAmtExtra;
    }
    else {
        console.log(' ======= ANTES initialAmt ' + initialAmt)
        initialAmt =  parseInt(initialAmt) + parseInt(initialAmtExtra);
        
        console.log(' ======= DESPUÉS initialAmt ' + parseInt(initialAmt))
    }
    if (unusedAmt == undefined ) {
        unusedAmt = unusedAmtExtra;
    } else {
        console.log(' =======  unusedAmt ' + parseInt(unusedAmt))
        console.log(' ======= unusedAmtExtra ' + parseInt(unusedAmtExtra))
        unusedAmt =  parseInt(unusedAmt) + parseInt(unusedAmtExtra);
    }

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

const UserState = props => {

    // Crear state inicial
    const initialState = {
        userData: [],
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [state, dispatch] = useReducer(UserReducer, initialState);
    console.log("Calleing User State ")

    const getJson = () => {
        
        const result = getDataJson()
        

        filterArray(result)
        console.log("User State > userArray **  : " + userArray)
        console.log("User State > result **  : " + result)
        dispatch({
            type: GET_USER_DATA,
            payload: userArray
        });
    }
    // Función que se ejecuta para traer los productos
    const getAPIUserData = async (number) => {
            let resultFlag = false;
            let final;
            console.log( ' 22A ******* : ' + number)
         // Call Local Hc
         let myPromise = new Promise(function (resolve) {
            resolve(getPerfilUf(number).then((response) => {
                    console.log( ' 23A ******* : ' + response.userData.responseSubscriber)
                    filterArray(response.userData)
                    console.log('************************ 90  userArray ' + userArray)

                }).catch((error) => {
                    console.log("UserState Error : " + error);
                    console.error("UserState Error : " + error.message);
                }).finally(() => {
                    console.log('************************ 91 userArray  ' + userArray != undefined)
                    userArray != undefined ? resultFlag = true: null
                    dispatch({
                        type: GET_USER_DATA,
                        payload: userArray

                    });
                })
            );

          })
         
          final = await myPromise
          return resultFlag

    }



return (
    <UserContext.Provider
        value={{
            userData: state.userData,
            getJson,
            getAPIUserData
        }}
    >
        {props.children}
    </UserContext.Provider>
)
}

export default UserState;