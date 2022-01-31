import { GET_PAQUETES } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case GET_PAQUETES:
            return {
                ...state,
                paquetes: action.payload
            }

        default:
            return state;
    }
}