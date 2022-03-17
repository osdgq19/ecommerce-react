import { BITACORA_FAIL, BITACORA_REQUEST, BITACORA_SUCCESS, GET_BITACORA_FAIL, GET_BITACORA_REQUEST, GET_BITACORA_SUCCESS } from "../constants/BitacoraConstants";

export const postBitacoraReducer = (state = {}, action) => {

    switch(action.type) {


           case BITACORA_REQUEST:
               return {loading: true}

           case BITACORA_SUCCESS:
               return {loading: false}

           case BITACORA_FAIL:
               return {loading: false, error: action.payload}  
                 

           default:
               return state;


    }

}


export const getBitacoraReducer = (state = {}, action) => {

    switch(action.type) {


           case GET_BITACORA_REQUEST:
               return {loading: true}

           case GET_BITACORA_SUCCESS:
               return {loading: false, bitacoraInfo: action.payload}

           case GET_BITACORA_FAIL:
               return {loading: false, error: action.payload}  
                 

           default:
               return state;


    }

}