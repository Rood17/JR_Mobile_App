import { GET_USER_DATA } from "../../types";

export default (state, action) => {

    switch (action.type) {
        case GET_USER_DATA:
            console.log("ddd : " + action.payload)
            return {
                
                ...state,
                userData: action.payload
            }

        default:
            return state;
    }
}