import React, { useReducer } from 'react';

import PaquetesReducer from './PaquetesReducer';
import PaquetesContext from './PaquetesContext';
import firebase from '../../firebase/index'
import { getFirestore, collection, getDocs, firestore, addDoc} from 'firebase/firestore';


import { GET_PAQUETES } from "../../types";



const PaquetesState = props => {

    // Crear state inicial
    const initialState = {
        paquetes: [],
        firebase
        
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [ state, dispatch ] = useReducer(PaquetesReducer, initialState);
    console.log("Paquetes State ")

    

    // Función que se ejecuta para traer los productos
    const getPaquetes = () => {
  
        function manejarSnapshot(snapshot) {
            let paquetes = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            // Ordenar por categoria con lodash
            paquetes = _.sortBy(paquetes, 'valor');

            console.log("Aquí los platillos!!!! " + paquetes)

            // Tenemos resultados de la base de datos
            dispatch({
                type: GET_PAQUETES,
                payload: paquetes
            });

            console.log("paquetes!! : " + paquetes)
        }
    }
     

    return (
        <PaquetesContext.Provider
            value={{
                paquetes: state.usuarios,
                firebase,
                getPaquetes
            }}
        >
            {props.children}
        </PaquetesContext.Provider>
    )
}

export default PaquetesState;