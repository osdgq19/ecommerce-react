import { PRODUCT_ADD_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, MINE_ADD_ITEM, MINE_EMPTY, MINE_REMOVE_ITEM, PRODUCT_UPD_REQUEST, PRODUCT_UPD_SUCCESS, PRODUCT_UPD_FAIL } from "../constants/productConstants";



 export const productListReducer = (state = { loading: true, products: []}, action) => {

   switch(action.type) {

      case PRODUCT_LIST_REQUEST : return {loading: true}

      case PRODUCT_LIST_SUCCESS : return {loading: false, products: action.payload}
      
      case PRODUCT_LIST_FAIL: return {loading: false, error: action.payload}
       
      default: return state
   }

}


export const productDetailsReducer = (state = { loading: true, product: {}}, action) => {

   switch(action.type) {

      case PRODUCT_DETAILS_REQUEST : return {loading: true}

      case PRODUCT_DETAILS_SUCCESS : return {loading: false, product: action.payload}
      
      case PRODUCT_DETAILS_FAIL: return {loading: false, error: action.payload}
       
      default: return state
   }

}

export const productAddReducer = (state = {loading: true, product: {}},action) => {


   switch(action.type) {

      case PRODUCT_ADD_REQUEST : return {loading: true}

      case PRODUCT_ADD_SUCCESS : return {loading: false, product: action.payload}
      
      case PRODUCT_ADD_FAIL: return {loading: false, error: action.payload}
       
      default: return state
   }




}
export const productUpdReducer = (state = {loading: true, product: {}},action) => {


   switch(action.type) {

      case PRODUCT_UPD_REQUEST : return {loading: true}

      case PRODUCT_UPD_SUCCESS : return {loading: false, product: action.payload}
      
      case PRODUCT_UPD_FAIL: return {loading: false, error: action.payload}
       
      default: return state
   }




}
export const myProdReducer = (state = {mineProds: []}, action) => {
    

   switch(action.type) {

          case MINE_ADD_ITEM:             

           return { ...state, mineProds: action.payload}        

           case MINE_REMOVE_ITEM:
              return { ...state, mineProds: state.mineProds.filter(x => x.product !== action.payload)}
                  
          case MINE_EMPTY:
              return { ...state, mineProds: []}        

          default: 
            return state;
   }



}