import { GET_USER_DATA, GET_IS_JR, GET_USER_EMAIL } from "../../types";

export default (state, action) => {

    switch (action.type) {
        case GET_USER_DATA:
            return {
                
                ...state,
                userData: action.payload
            }
        case GET_IS_JR:
            return {
                
                ...state,
                userData: action.payload
            }
        case GET_USER_EMAIL:
            console.log('***    reducer : ' + action.payload)
            return {

                ...state,
                userData: action.payload
            }

        default:
            return state;
    }
}