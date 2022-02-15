import React, { useReducer } from 'react';

import PaquetesReducer from './PaquetesReducer';
import PaquetesContext from './PaquetesContext';
import firebase from '../../firebase/index'
import { getFirestore, collection, getDocs, firestore, addDoc } from 'firebase/firestore';
import {getPaquetesApi} from '../../app/utils/services/get_services'

import { GET_PAQUETES } from "../../types";



const PaquetesState = props => {

    // Crear state inicial
    const initialState = {
        paquetes: [],
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [state, dispatch] = useReducer(PaquetesReducer, initialState);
    console.log("Paquetes State ")



    // Función que se ejecuta para traer los productos
    const getPaquetes = async () => {

        // from services
        const paquetes = getPaquetesApi()
        


        // Tenemos resultados de la base de datos
        dispatch({
            type: GET_PAQUETES,
            payload: paquetes
        });


    }



return (
    <PaquetesContext.Provider
        value={{
            paquetes: state.paquetes,
            getPaquetes
        }}
    >
        {props.children}
    </PaquetesContext.Provider>
)
}

export default PaquetesState;