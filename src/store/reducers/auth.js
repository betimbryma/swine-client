import {AUTHENTICATE} from "../actions/actionTypes";

const initialState = {
    peer: null,
    token: null
};

export default function(state = initialState, action){
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                peer: action.peer,
                token: action.token
            };
        default:
            return state;
    }
}