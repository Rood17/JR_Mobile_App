import React, { useReducer } from 'react';

import UserReducer from './UserReducer';
import UserContext from './UserContext';
import {getPerfilUf, getDataJson, getPaquetes} from '../../app/utils/services/get_services'

import { GET_USER_DATA, USER_INFO, SIM_DATA, SIM_SMS, SIM_MIN } from "../../types";



const userArray = {userInfo:{}, simData:{}, simSMS:{}, simMIN:{} }
const paquetes = getPaquetes()

const filterArray = (userData) => {
    // Get User Data
    let expireDate,initialAmt,unusedAmt, offeringId, ofertaActual = 0;
    let expireDateSMS,initialAmtSMS,unusedAmtSMS, offeringIdSMS = 0;
    let expireDateMIN,initialAmtMIN,unusedAmtMIN = 0;

    
    //offeringId
    Object.values(paquetes).map((item) => {
        //console.log(item.offerId)
        Object.values(userData).map((item) => {
            // Freeeunits
            if ( item.freeUnits != undefined){
                item.freeUnits.map((i) => {
                    // Catch Plans Data
                    if ( i.name == SIM_DATA)
                    {
                        expireDate = i.detailOfferings[0].expireDate;
                        initialAmt = i.detailOfferings[0].initialAmt;
                        unusedAmt = i.detailOfferings[0].unusedAmt;
                        offeringId = i.detailOfferings[0].offeringId
                    }
                    // Catch SMS Data
                    if ( i.name == SIM_SMS)
                    {
                        expireDateSMS = i.detailOfferings[0].expireDate;
                        initialAmtSMS = i.detailOfferings[0].initialAmt;
                        unusedAmtSMS = i.detailOfferings[0].unusedAmt;
                        offeringIdSMS = i.detailOfferings[0].offeringId
                    }
                    // Catch SMS Data
                    if ( i.name == SIM_MIN)
                    {
                        expireDateMIN = i.detailOfferings[0].expireDate;
                        initialAmtMIN = i.detailOfferings[0].initialAmt;
                        unusedAmtMIN = i.detailOfferings[0].unusedAmt;
                    }
                })
            }
        })

        // Get oferta actual
        if (offeringId == item.offerId)
            ofertaActual = item.name
    })
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
    console.log("User State ")

    const getJson = () => {
        
        const result = getDataJson()
        

        filterArray(result)
        console.log("User State > userArray **  : " + userArray)
        dispatch({
            type: GET_USER_DATA,
            payload: userArray
        });
    }
    // Función que se ejecuta para traer los productos
    const getUserData = async (number) => {
            let dataX;
         // Call Local Hc       
            const response = await getPerfilUf(number)
                .then(function (response) {
                    //console.log(response.userData)
                    dataX = response.userData;
            
                    // Tenemos resultados de la base de datos
                    dispatch({
                        type: GET_USER_DATA,
                        payload: dataX
                    });
                })
                .catch(function (error) {
                    console.log(error);
                    console.error(error.message);
                }).finally(() => {
                    //console.log("finally")
                });
        
    }



return (
    <UserContext.Provider
        value={{
            userData: state.userData,
            getJson,
        }}
    >
        {props.children}
    </UserContext.Provider>
)
}

export default UserState;