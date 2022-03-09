import React, { useReducer } from 'react';

import RecargasReducer from './RecargasReducer';
import RecargasContext from './RecargasContext';
import { PREFERENCE_ID } from "../../types";
import {get_api_preference} from '../../app/utils/services/get_services'



const RecargasState = props => {

    // Crear state inicial
    const initialState = {
        recargas: [],
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [ state, dispatch ] = useReducer(RecargasReducer, initialState);

    const get_preference = async (dataProduct) => {

        console.log("**************** get_preference  ")
        console.log("****************  ")
        console.log("*** idSubscriber : " + dataProduct.idSubscriber)
        console.log("*** idSubscriber : " + dataProduct.email)
        console.log('*** name ' + dataProduct.title)
        console.log('*** price ' + dataProduct.price)
        console.log("****************  ")
        console.log("****************   ")
        let result;
    
        let myPromise = new Promise( (resolve) => {
    
            try {
                get_api_preference(dataProduct).then((response) => {
                    // Response
                    // Storage
                    resolve(result = response)
                    console.log('Obteniendo iframe mercado pago! ' + response );
                    
                }).catch(error => {
                    result = error
                    console.error("Register error - " + error);
                }).finally(() => {
                    dispatch({
                        type: PREFERENCE_ID,
                        payload: result
                    });
                })
            } catch {
                alert('El producto no existe.')
    
            }
        });
    
        // necesit saber por que result es indefinido???
    
        const FinalResult = await myPromise
        return result
        
    }

    return (
        <RecargasContext.Provider
            value={{
                recargas: state.recargas,
                get_preference
            }}
        >
            {props.children}
        </RecargasContext.Provider>
    )
}

export default RecargasState;