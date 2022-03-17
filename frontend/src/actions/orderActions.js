import Axios from 'axios'
import { CART_EMPTY } from '../constants/cartConstants'
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_MINE_LIST_FAIL, STOCK_REDUCE_REQUEST, STOCK_REDUCE_SUCCESS, STOCK_REDUCE_FAIL} from "../constants/orderConstants"

export const createOrder = (order) => async (dispatch, getState) => {


    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })

    try {
        const { userSignin: { userInfo } } = getState()
        const { data } = await Axios.post('/api/orders', order, {

            headers: {

                Authorization: `Bearer ${userInfo.token}`
            }
        })

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })

        dispatch({ type: CART_EMPTY })
        localStorage.removeItem('cartItems')
    } catch (error) {

        dispatch({
            type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message




        })


    }



}


export const detailsOrder = (orderId) => async(dispatch, getState) => {
      
    const {userSignin: {userInfo},} = getState()
    
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })
    try {
        
       const {data} = await Axios.get(`/api/orders/${orderId}`, 
       {
      
           headers: {

               Authorization: `Bearer ${userInfo.token}`
           }
       })
       const detalle = await Axios.get(`/api/orders/details/${orderId}`)
      // const status = await Axios.get(`/api/orders/orderstatus/${orderId}`)
       console.log(data)
      dispatch({type: ORDER_DETAILS_SUCCESS, payload: {

          cabeza: data,
          detalle: detalle.data,
      }})

    } catch (error) {
        const message = error.response && error.response.data.message ?
            error.response.data.message : error.message
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message })

    }




}


export const listOrderMine = () => async(dispatch, getState) =>
{

        dispatch({type: ORDER_MINE_LIST_REQUEST})

        const { userSignin: { userInfo } } = getState()

        try {
            const {data} = await Axios.put(`/api/orders/mine`, userInfo, {

                headers: {
    
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
           console.log(data)
           dispatch({type: ORDER_MINE_LIST_SUCCESS, payload: data})
           
        } catch (error) {
            const message = error.response && error.response.data.message ?
            error.response.data.message : error.message
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message })
        }



}

export const payOrder = (order, fecha, secure_url) => async(dispatch, getState) =>
{

        dispatch({type: ORDER_PAY_REQUEST, payload: order})

        const { userSignin: { userInfo } } = getState()

        const status="True"
        try {
            const {data} = Axios.put(`/api/orders/${order.cabeza[0].id_order}/pay`, {fecha,status, secure_url}, {

                headers: {
    
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
       
           dispatch({type: ORDER_PAY_SUCCESS, payload: data})
        } catch (error) {
            const message = error.response && error.response.data.message ?
            error.response.data.message : error.message
        dispatch({ type: ORDER_PAY_FAIL, payload: message })
        }



}

export const reduceStock = (order) => async(dispatch, getState) =>
{

        dispatch({type: STOCK_REDUCE_REQUEST, payload: order})

        const { userSignin: { userInfo } } = getState()
        order.detalle.map( orde =>{
        try {
            const {data} = Axios.put(`/api/orders/reduceStock`, {orde})
       
           dispatch({type: STOCK_REDUCE_SUCCESS, payload: data})
        } catch (error) {
            const message = error.response && error.response.data.message ?
            error.response.data.message : error.message
        dispatch({ type: STOCK_REDUCE_FAIL, payload: message })
        }
     } )


}