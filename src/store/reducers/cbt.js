import {GET_CBTs} from "../actions/actionTypes";


const initialState = {
    collectiveBasedTasks: [],
    pigletId: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CBTs:
            return {
                ...state,
                collectiveBasedTasks: action.payload,
                pigletId: action.pigletId
            };
        default:
            return initialState;
    }
}