import { MANTENIMIENTO_FAIL, MANTENIMIENTO_REQUEST, MANTENIMIENTO_SUCCESS } from "../constants/mantenimientoConstants";

export const mantenimientoReducer = (state = {}, action) => {

    switch(action.type) {


           case  MANTENIMIENTO_REQUEST:
               return {loading: true}

           case MANTENIMIENTO_SUCCESS:
               return {loading: false , message: action.payload}

           case MANTENIMIENTO_FAIL:
               return {loading: false, error: action.payload}  
                 

           default:
               return state;


    }

}