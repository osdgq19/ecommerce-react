import Axios from 'axios'
import {
  BITACORA_FAIL,
  BITACORA_REQUEST,
  BITACORA_SUCCESS,
  GET_BITACORA_FAIL,
  GET_BITACORA_REQUEST,
  GET_BITACORA_SUCCESS,
} from '../constants/BitacoraConstants'

export const doMantenimiento = () => async dispatch => {
  console.log('acciono')
  dispatch({type: BITACORA_REQUEST})
  try {
    const {data} = await Axios.post('/api/mantenimiento/')
    console.log(data)
    dispatch({type: BITACORA_SUCCESS, payload: data})
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
