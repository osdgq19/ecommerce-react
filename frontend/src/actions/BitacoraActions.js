import Axios from 'axios'
import {
  BITACORA_FAIL,
  BITACORA_REQUEST,
  BITACORA_SUCCESS,
  GET_BITACORA_FAIL,
  GET_BITACORA_REQUEST,
  GET_BITACORA_SUCCESS,
} from '../constants/BitacoraConstants'

export const postBitacora = (action, fecha, user) => async dispatch => {
  console.log(action)
  dispatch({type: BITACORA_REQUEST, payload: {action, fecha, user}})
  try {
    const {data} = await Axios.post('/api/bitacora/', {action, fecha, user})
    console.log(data)
    dispatch({type: BITACORA_SUCCESS})
  } catch (error) {
    console.log(error)
    dispatch({
      type: BITACORA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getBitacora = user => async dispatch => {
  console.log(user)
  dispatch({type: GET_BITACORA_REQUEST, payload: {user}})
  try {
    const {data} = await Axios.post('/api/bitacora/get', {user})
    console.log(data)
    dispatch({type: GET_BITACORA_SUCCESS, payload: data})
  } catch (error) {
    console.log(error)
    dispatch({
      type: GET_BITACORA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
