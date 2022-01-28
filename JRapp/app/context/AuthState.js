import React, {useReducer} from "react";

import AuthReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
//import firebaseExt from "../firebase/firebase";
import auth from '@react-native-firebase/auth';


const AuthState = props => {
    //console.log(firebaseExt)
    // Init State
    const initialState = {
        auth : []
        
    }

    // UseReducer con dispatch pra regresar funciones
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const login = (email, password) => {
        return authentication.signInWithEmailAndPassword(email, password);
      };
    

    return (
        <AuthContext.Provider
            value={{
                auth: state.auth,
                login
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;