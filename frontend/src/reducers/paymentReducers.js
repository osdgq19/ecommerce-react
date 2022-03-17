import { PAYMENT_METHOD_FAIL, PAYMENT_METHOD_REQUEST, PAYMENT_METHOD_SUCCESS } from "../constants/cartConstants"

export const paymentReducer = (state = {loading: true, payMethod: [] }, action) => {



    switch (action.type) {


        case PAYMENT_METHOD_REQUEST:
            return {loading: true}

        case PAYMENT_METHOD_SUCCESS:
            return { loading: false,  payMethod: action.payload }

        case PAYMENT_METHOD_FAIL:
            return {  loading: false, error: action.payload }


        default:
            return state;


    }


}