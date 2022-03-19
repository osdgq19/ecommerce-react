import Axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  STATE_FAIL,
  STATE_REQUEST,
  STATE_SUCCESS,
} from '../constants/cartConstants'

export const addToCart =
  (productID, qty, user, mensaje) => async (dispatch, getState) => {
    console.log(mensaje)
    const dato = await Axios.post('/api/cartlist/add', {
      user,
      productID,
      qty,
      mensaje,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

export const getCart = user => async (dispatch, getState) => {
  const {data} = await Axios.post('/api/cartlist/get', {user})
  console.log(data)
  try {
    dispatch({
      type: CART_ADD_ITEM,
      payload: data,
    })
  } catch (error) {}

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart =
  (productID, userID) => async (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productID})
    //localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    try {
      const {data} = await Axios.post('/api/cartlist/remove', {
        productID,
        userID,
      })
    } catch (error) {}
  }

export const saveShippingAddress = data => async dispatch => {
  const {fullName, address, estado} = data
  console.log(estado)
  const idShipping = await Axios.post('/api/orders/shipping', {
    fullName,
    address,
    estado,
  })
  data.idShipping = idShipping.data
  console.log(data)
  dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data})
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = id => async dispatch => {
  const {data} = await Axios.get(`/api/orders/getpay/${id}`)
  console.log(data)
  dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data})
  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const deleteFromCart = cart => (dispatch, getState) => {
  cart.map(c => {
    const {data} = Axios.post(`/api/cartlist/deletefromcart/${c.idcartlist}`)
    console.log(data)
  })
}

export const getEstados = () => async dispatch => {
  dispatch({type: STATE_REQUEST})

  try {
    const {data} = await Axios.get('/api/cartlist/estados')
    dispatch({type: STATE_SUCCESS, payload: data})
    localStorage.setItem('shippingAddress', JSON.stringify(data))
    localStorage.setItem('estados', JSON.stringify(data))
  } catch (error) {
    console.log(error)
    dispatch({
      type: STATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
