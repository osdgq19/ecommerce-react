import {
  CATEGORIA_REQUEST,
  CATEGORIA_SUCCESS,
  CATEGORIA_FAIL,
  CATEGORIA_ADD_REQUEST,
  CATEGORIA_ADD_SUCCESS,
  CATEGORIA_ADD_FAIL,
  CATEGORIA_DELETE,
} from '../constants/categoriaConstants'

export const categoriaReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIA_REQUEST:
      return {loading: true}

    case CATEGORIA_SUCCESS:
      return {loading: false, categorias: action.payload}

    case CATEGORIA_FAIL:
      return {loading: false, error: action.payload}
    case CATEGORIA_DELETE:
      return {message: action.payload}
    default:
      return state
  }
}
export const categoriaAddReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIA_ADD_REQUEST:
      return {loading: true}

    case CATEGORIA_ADD_SUCCESS:
      return {loading: false, message: action.payload}

    case CATEGORIA_ADD_FAIL:
      return {loading: false, error: action.payload}

    default:
      return state
  }
}
