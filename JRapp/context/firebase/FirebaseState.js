import React, { useEffect, useReducer } from 'react';

import firebase from '../../firebase';
import FirebaseReducer from './FirebaseReducer';
import FirebaseContext from './FirebaseContext';

import {SET_USER_INFO} from '../../types/index';

const FirebaseState = props => {

    // Crear state inicial
    const initialState = {
        usuarios: [],
        firebase
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [ state, dispatch ] = useReducer(FirebaseReducer, initialState);

        // Traer la info del usuario
        const setUserData = () => {
            dispatch({
                type:SET_USER_INFO
            })
    
    
        }
    
        useEffect( () => {
            setUserData()
        }, [])



    return (
        <FirebaseContext.Provider
            value={{
                usuarios: state.usuarios,
                firebase,
                setUserData
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;