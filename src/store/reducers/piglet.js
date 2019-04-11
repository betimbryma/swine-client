import {GET_PIGLETS, VIEW_PIGLET} from "../actions/actionTypes";

const initialState = {
    piglets: [],
    piglet: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PIGLETS:
            console.log(action);
            return {
                ...state,
                piglets: action.payload
            };
        case VIEW_PIGLET:
            return {
                ...state,
                piglet: action.payload
            };
        default:
            return initialState;
    }
}