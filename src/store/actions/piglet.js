import axios from "axios";
import {GET_PIGLETS} from "./actionTypes";
import {VIEW_PIGLET} from "./actionTypes";

export const getPiglets = () => async dispatch => {

    axios.get("/api/piglet/all")
        .then(res => {
            dispatch({
                type: GET_PIGLETS,
                payload: res.data
            });
        }).catch(e => {
        console.log(e)
    });
};

export const newPiglet = (piglet, history) => {
    return () => {
        axios.post("/api/piglet/save", piglet)
            .then(() => {
                history.push("/");
            }).catch(e => {
            console.log(e);
        })
    }
};

export const viewPiglet = (piglet, history) => {
    history.push(`/piglet/${piglet.id}`);
    return {
        type: VIEW_PIGLET,
        payload: piglet
    };
};