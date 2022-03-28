import { IS_USER_LOGGED, GET_USER_DATA, REGISTER_SUCCESS } from "../../types";

export default (state, action) => {
    
    switch (action.type) {
        case IS_USER_LOGGED:
            return {
                ...state,
                authData: action.payload
            }
        case GET_USER_DATA:
            return {
                ...state,
                authData: action.payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                authData: action.payload
            }

        default:
            return state;
    }
}