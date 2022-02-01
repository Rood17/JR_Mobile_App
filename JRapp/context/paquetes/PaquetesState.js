import React, { useReducer } from 'react';

import PaquetesReducer from './PaquetesReducer';
import PaquetesContext from './PaquetesContext';
import firebase from '../../firebase/index'
import { getFirestore, collection, getDocs, firestore, addDoc } from 'firebase/firestore';


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

        const paquetes = [
            {
                offerId :'1509901006',
                name : 'JR5 MiFi 5',
                precio : '$99'
            },
            {   offerId :'1509901007',
                name : 'JR10 MiFi 10',
                precio : '$175'
            },
            {   offerId :'1509901008',
                name : 'JR5 MiFi 20',
                precio : '$300'
            },
            {   offerId :'1509901009',
                name : 'JR5 MiFi 30',
                precio : '$399'
            },
            {   offerId :'1509901010',
                name : 'JR5 MiFi 50',
                precio : '$499'
            },
            {   offerId :'1509901017',
                name : 'Plan JR5',
                precio : '$49'
            },
            {   offerId :'1509901018',
                name : 'Plan JR10',
                precio : '$99'
            },
            {   offerId :'1509901019',
                name : 'Plan JR20',
                precio : '$199'
            },
            {   offerId :'1509901013',
                name : 'Plan JR5+',
                precio : '$75'
            },
            {   offerId :'1509901014',
                name : 'Plan JR10+',
                precio : '$149'
            },
            {   offerId :'1509901015',
                name : 'Plan JR20+',
                precio : '$260'
            },
            {   offerId :'1509901016',
                name : 'Plan JR Master',
                precio : '$449'
            },
            {   offerId :'1809901178',
                name : 'Plan JR Básico',
                precio : '$99'
            },
            {   offerId :'1809901179',
                name : 'Plan JR Total',
                precio : '$149'
            },
        
        ]
        


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