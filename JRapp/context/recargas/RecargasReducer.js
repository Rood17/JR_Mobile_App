import { GET_PAQUETES, PREFERENCE_ID } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case GET_PAQUETES:
            return {
                ...state,
                recargas: action.payload
            }
        case PREFERENCE_ID:
            console.log('************************ flujo PREFERENCE_ID  ****** : ' + action.payload)
            return {
                ...state,
                recargas: action.payload
            }

        default:
            return state;
    }
}