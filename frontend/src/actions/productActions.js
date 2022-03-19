import Axios from 'axios'
import {
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  MINE_ADD_ITEM,
  MINE_REMOVE_ITEM,
  PRODUCT_UPD_REQUEST,
  PRODUCT_UPD_SUCCESS,
  PRODUCT_UPD_FAIL,
} from '../constants/productConstants'

export const listProducts = () => async dispatch => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  })

  try {
    const {data} = await Axios.get('api/products')
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
  }
}

export const detailsProduct = productID => async dispatch => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productID,
  })

  try {
    const {data} = await Axios.get(`/api/products/${productID}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addProduct = datos => async (dispatch, getState) => {
  dispatch({type: PRODUCT_ADD_REQUEST})
  try {
    console.log(datos)
    const {data} = await Axios.post('/api/products/seed', datos)
    dispatch({
      type: PRODUCT_ADD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({type: PRODUCT_ADD_FAIL, payload: message})
  }
  localStorage.setItem(
    'mineProds',
    JSON.stringify(getState().myProds.mineProds),
  )
}

export const addToMyProd = user => async (dispatch, getState) => {
  console.log(user)
  const {data} = await Axios.post('/api/products/myprods', {
    idusers: user.idusers,
  })
  console.log(data)
  data.map(c =>
    dispatch({
      type: MINE_ADD_ITEM,
      payload: [
        {
          product: c.product,
          name: c.name,
          image: c.image,
          price: c.price,
        },
      ],
    }),
  )
  localStorage.setItem('mineProds', JSON.stringify(data))
}

export const removeMyProd = (productID, user) => async (dispatch, getState) => {
  console.log(productID)
  const {data} = await Axios.post('/api/products/deletemyprod', {
    productID,
    user,
  })

  dispatch({type: MINE_REMOVE_ITEM, payload: data})

  localStorage.removeItem(
    'mineProds',
    JSON.stringify(getState().myProds.mineProds),
  )
}

export const updateMyProd = datos => async (dispatch, getState) => {
  dispatch({type: PRODUCT_UPD_REQUEST})
  try {
    console.log(datos)
    const {data} = await Axios.put('/api/products/update', datos)

    dispatch({
      type: PRODUCT_UPD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({type: PRODUCT_UPD_FAIL, payload: message})
  }
}
