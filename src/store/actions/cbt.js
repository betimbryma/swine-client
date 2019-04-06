import axios from "axios";
import {GET_CBTs} from "./actionTypes";

export const getCBTs = (id) => async dispatch => {
    axios.get("/api/piglet/cbt/"+id)
        .then(res => {
            dispatch({
                type: GET_CBTs,
                payload: res.data,
                pigletId: id
            });
        }).catch(e => {
            console.log(e);
    });
};