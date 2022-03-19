import Axios from 'axios'
import {
  CATEGORIA_REQUEST,
  CATEGORIA_SUCCESS,
  CATEGORIA_FAIL,
  CATEGORIA_ADD_REQUEST,
  CATEGORIA_ADD_SUCCESS,
  CATEGORIA_ADD_FAIL,
  CATEGORIA_DELETE,
} from '../constants/categoriaConstants'

export const getCategoria = () => async dispatch => {
  dispatch({type: CATEGORIA_REQUEST})
  try {
    const {data} = await Axios.post('/api/categoria/')
    console.log(data)
    dispatch({type: CATEGORIA_SUCCESS, payload: data})
  } catch (error) {
    console.log(error)
    dispatch({
      type: CATEGORIA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addCategoria = datos => async (dispatch, getState) => {
  dispatch({type: CATEGORIA_ADD_REQUEST})
  try {
    console.log(datos)

    const {data} = await Axios.post('/api/categoria/add', datos)
    dispatch({
      type: CATEGORIA_ADD_SUCCESS,
      payload: data.status,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({type: CATEGORIA_ADD_FAIL, payload: message})
  }
}

export const removeCategory = datos => async (dispatch, getState) => {
  try {
    const {data} = await Axios.post('/api/categoria/delete', datos)
    dispatch({type: CATEGORIA_DELETE, payload: data.message})
  } catch (error) {}
}
