import React, { useReducer } from 'react';

import RecargasReducer from './RecargasReducer';
import RecargasContext from './RecargasContext';
import { LOG_INFO } from '../../app/res/values/strings/Strings';
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

        // Safe clear
        if ( dataProduct == 'clear'){
            dispatch({
                type: PREFERENCE_ID,
                payload: undefined
            });
            return
        }
        console.log("[Info] Recargas State - get_preference **")
        console.log(LOG_INFO('RecargasState', 'get_preference.title')+dataProduct.title)


        let result;
    
        let myPromise = new Promise( (resolve) => {
    
            try {
                get_api_preference(dataProduct).then((response) => {
                    // Response
                    // Storage
                    resolve(result = response)
                    console.log(LOG_INFO('RecargasState', 'get_preference - Obteniendo iframe mercado pago')+response)
                    
                }).catch(error => {
                    result = error
                    console.error('[Error] RecargasState - RecargasState'+error.message);
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