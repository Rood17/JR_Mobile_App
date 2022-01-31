import React, { useReducer } from 'react';

import RecargasReducer from './RecargasReducer';
import RecargasContext from './RecargasContext'


const RecargasState = props => {

    // Crear state inicial
    const initialState = {
        recargas: [],
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [ state, dispatch ] = useReducer(RecargasReducer, initialState);



    return (
        <RecargasContext.Provider
            value={{
                recargas: state.usuarios,
            }}
        >
            {props.children}
        </RecargasContext.Provider>
    )
}

export default RecargasState;