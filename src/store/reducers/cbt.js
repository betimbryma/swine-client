import {GET_CBTs} from "../actions/actionTypes";


const initialState = {
    cbts: [],
    piglet: null
};

export default function (state = initialState, action) {
    console.log(action);
    switch (action.type) {

        case GET_CBTs:
            return {
                ...state,
                cbts: action.payload.cbts,
                piglet: action.payload.piglet
            };
        default:
            return initialState;
    }
}