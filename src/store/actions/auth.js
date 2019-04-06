import axios from "axios";
import {AUTHENTICATE} from "./actionTypes";
import jwt_decode from "jwt-decode";


export const authenticate = (peer, process, history) => async dispatch => {
    axios.post("/api/peers/"+process, peer)
        .then(res => {
            const token = res.data;
            if(token) {
                axios.defaults.headers.common["Authorization"] = token;
                localStorage.setItem("jwt", token);
                const decoded = jwt_decode(token);
                dispatch({
                    type: AUTHENTICATE,
                    peer: decoded.id,
                    token: token
                });
                history.push("/home");
            }
        });

};

export const logout = () => async dispatch => {
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"];

    dispatch({
        type: AUTHENTICATE,
        payload: {},
        token: null
    });

};