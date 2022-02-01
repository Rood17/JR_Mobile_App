import React, { useReducer } from 'react';

import UserReducer from './UserReducer';
import UserContext from './UserContext';
import {getPerfilUf, getDataJson} from '../../app/utils/services/get_services'

import { GET_USER_DATA } from "../../types";



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
        console.log("User State > getJson : " + result)
        dispatch({
            type: GET_USER_DATA,
            payload: result
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