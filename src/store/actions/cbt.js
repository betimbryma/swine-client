import axios from "axios";
import {GET_CBTs} from "./actionTypes";

export const getCBTs = (id) => async dispatch => {
    axios.get("/api/piglet/cbt/"+id)
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_CBTs,
                payload: res.data,
            });
        }).catch(e => {
            console.log("error"+id, e);
    });
};