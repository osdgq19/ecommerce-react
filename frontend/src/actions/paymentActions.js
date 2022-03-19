import Axios from 'axios'
import {
  PAYMENT_METHOD_FAIL,
  PAYMENT_METHOD_REQUEST,
  PAYMENT_METHOD_SUCCESS,
} from '../constants/cartConstants'

export const listPayment = () => async dispatch => {
  dispatch({
    type: PAYMENT_METHOD_REQUEST,
  })

  try {
    const {data} = await Axios.get('/api/orders/paymethod')
    console.log(data)
    dispatch({
      type: PAYMENT_METHOD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({type: PAYMENT_METHOD_FAIL, payload: error.message})
  }
}
