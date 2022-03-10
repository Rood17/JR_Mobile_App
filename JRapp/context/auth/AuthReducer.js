import { IS_USER_LOGGED, GET_USER_DATA, REGISTER_SUCCESS } from "../../types";

export default (state, action) => {
    
    switch (action.type) {
        case IS_USER_LOGGED:
            console.log('************************ flujo IS_USER_LOGGED  ****** : ' + action.payload)
            return {
                ...state,
                authData: action.payload
            }
        case GET_USER_DATA:
            console.log('************************ flujo GET_USER_DATA  ****** : ' + action.payload)
            return {
                ...state,
                authData: action.payload
            }
        case REGISTER_SUCCESS:
            console.log('************************ flujo REGISTER_SUCCESS  ****** : ' + action.payload)
            return {
                ...state,
                authData: action.payload
            }

        default:
            return state;
    }
}