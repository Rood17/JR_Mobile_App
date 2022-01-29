import React, { useReducer } from 'react';

import firebase from '../../firebase';
import FirebaseReducer from './FirebaseReducer';
import FirebaseContext from './FirebaseContext';


const FirebaseState = props => {

    // Crear state inicial
    const initialState = {
        usuarios: []
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [ state, dispatch ] = useReducer(FirebaseReducer, initialState);



    return (
        <FirebaseContext.Provider
            value={{
                usuarios: state.usuarios,
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;