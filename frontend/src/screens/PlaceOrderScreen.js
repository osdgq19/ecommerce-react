import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { postBitacora } from '../actions/BitacoraActions'
import { deleteFromCart } from '../actions/cartActions'

export default function PlaceOrderScreen(props) {

    var cart = useSelector(state => state.cart)
    if (!cart.paymentMethod) {
        props.history.push('/payment')
    }
   if(cart.cartItems.filtrarOrden){
       var id = cart.cartItems.filtrarOrden
       cart.cartItems = cart.cartItems.filter(x=> x.product ===id)
   }
    console.log(cart)
    const orderCreate = useSelector(state => state.orderCreate)
    const {loading, success, error, order} = orderCreate
    const statesInfo = useSelector(state => state.statesInfo);
    const { estados } = statesInfo
    console.log(estados)
    const toPrice = (num) => Number(num.toFixed(2))
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0))
    cart.shippingPrice = estados?.find(x => x.idstate === Number(cart.shippingAddress.estado))
    console.log(cart.shippingPrice)
    cart.taxPrice = cart.impuesto === "Exento" ? toPrice(cart.itemsPrice) : toPrice(0.16 * cart.itemsPrice)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice.tarifa + cart.taxPrice
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const dispatch = useDispatch()

    const placeOrderHandler = () => {

      
  
        dispatch(deleteFromCart(cart.cartItems))
    }

    useEffect(()=> {
        dispatch(createOrder({...cart,orderItems: cart.cartItems, currentUser: userInfo, paymentMethod: cart.paymentMethod[0] }))
        let action = "Modulo Orden a Crear"
         var nowDate = new Date()
         var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()
 
         dispatch(postBitacora( action, date ,userInfo ))
         if(success){
             
            props.history.push(`/order/${order.id}`)
            dispatch({type: ORDER_CREATE_RESET})


         }
        
    }, [dispatch,order,props.history,success])

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

            <div className="row top">

                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Nombre: </strong> {cart?.shippingAddress.fullName} <br></br>
                                    <strong>Direccción: </strong> {cart?.shippingAddress.address} ,
                                    {' '} {cart?.shippingPrice.state_name}  ,
                                    {' '} {'Venezuela'}

                                </p>
                            </div>

                        </li>
                        {console.log(cart)}
                        <li>
                            <div className="card card-body">
                                <h2>Pago</h2>
                                <p>
                                    <strong>Método de Pago: </strong> {cart?.paymentMethod[0]?.name} <br></br>

                                </p>
                            </div>

                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Productos Pedidos</h2>
                                <ul>
                                    {
                                        cart?.cartItems.map((item) => (

                                            <li key={item.product}>

                                                <div className="row">
                                                    <div>
                                                        <img src={item.image} alt={item.name} className="small"></img></div>

                                                    <div className="min-30">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>

                                                    </div>

                                                    <div>

                                                        {item.qty} x ${item.price} = ${item.qty * item.price}

                                                    </div>


                                                </div>


                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>

                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Total de Pedido</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Productos</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>

                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Envio</div>
                                    <div>${cart.shippingPrice.tarifa.toFixed(2)}</div>

                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Impuesto</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>

                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <strong> <div>Total</div> </strong>
                                    <strong> <div>${cart.totalPrice.toFixed(2)}</div></strong>

                                </div>
                            </li>
                            <li>
                                <button type="button" 
                                onClick={placeOrderHandler} 
                                className="primary block"
                                disabled={cart.cartItems.length === 0}
                                >
                                    Ordenar
                                </button>
                            </li>
                             {loading && <LoadingBox></LoadingBox>}
                             {error && <MessageBox variant= "danger">{error}</MessageBox>}

                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}
