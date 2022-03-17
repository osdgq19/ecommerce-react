import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer, statesReducer } from './reducers/cartReducers.js';
import { productAddReducer, productDetailsReducer, productListReducer, myProdReducer, productUpdReducer } from './reducers/productReducers'
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducers.js';
import { paymentReducer } from './reducers/paymentReducers.js';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer, stockReducer } from './reducers/orderReducers.js';
import {getReportReducer} from './reducers/reportReducer'
import {getBitacoraReducer, postBitacoraReducer} from './reducers/bitacoraReducer'
import { postBitacora } from './actions/BitacoraActions.js';
import { mantenimientoReducer } from './reducers/MantenimientoReducer.js';
import { categoriaAddReducecer, categoriaAddReducer, categoriaReducer } from './reducers/categoriaReducer.js';

const initialState = {

    userSignin: {

        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },

    cart: {

        cartItems:   localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : []
    },
  myProds: {
      mineProds: localStorage.getItem('mineProds') ? JSON.parse(localStorage.getItem('mineProds')) : []
  },

estados: {
    mineProds: localStorage.getItem('estados') ? JSON.parse(localStorage.getItem('estados')) : []
}
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    prodAdd: productAddReducer,
    ProdUpd: productUpdReducer,
    cart: cartReducer,
    statesInfo: statesReducer,
    categoriasInfo: categoriaReducer,
    categoriasAddInfo: categoriaAddReducer,
    myProds: myProdReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    paymentMethod: paymentReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    reportInfo: getReportReducer,
    bitacoraInfo: getBitacoraReducer,
    bitacoraPost: postBitacoraReducer,
    MantenimientoInfo: mantenimientoReducer,
    stockReduce: stockReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store