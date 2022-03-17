import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, STATE_FAIL, STATE_REQUEST, STATE_SUCCESS } from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
    

     switch(action.type) {

            case CART_ADD_ITEM:
                return {... state,cartItems: action.payload}

             case CART_REMOVE_ITEM:
                 
                return {...state, cartItems: state.cartItems.filter(x => x.product !== action.payload)}

            case CART_SAVE_SHIPPING_ADDRESS:
                return {...state, shippingAddress: action.payload}
            
            case CART_SAVE_PAYMENT_METHOD:
                    return {...state, paymentMethod: action.payload}
                    
            case CART_EMPTY:
                return {...state, cartItems: []}        

            default: 
              return state;
     }



}

export const statesReducer = (state = {}, action) => {
    

    switch(action.type) {

           case STATE_REQUEST:
               return {loading: true}

            case STATE_SUCCESS:
               return {loading: false, estados: action.payload}

            case STATE_FAIL:
                return {loading: false, error: action.payload}

           default: 
             return state;
    }



}





