import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { postBitacora } from '../actions/BitacoraActions'
import { addToCart, getCart, removeFromCart } from '../actions/cartActions'
import MessageBox from '../components/MessageBox'
import '../index.css'
function CartScreen(props) {
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    if (!userInfo) {
        props.history.push('/signin')
    }
   
    const productID = props.match.params.id
    const queryParams = new URLSearchParams(props.location.search);
    const quantity = queryParams.get("qty");
    const qty = Number(quantity)
    const user = queryParams.get("user");
    const userParam = Number(user)
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    const dispatch = useDispatch()
    console.log(cartItems)
    useEffect( async() => {

        if (productID) {

            try {
                const { data } = await axios.post('/api/cartlist', { userParam, productID, qty })
             var mensaje = data.mensaje
                dispatch(addToCart(productID, qty, userParam, mensaje))
                dispatch(getCart(userParam))
            } catch (error) {

            }

            
        }
        else {
            dispatch(getCart(userInfo.idusers))

        }

    }, [dispatch, productID, qty, userParam])

    const removeFromCartHandler = (id) => {

        dispatch(removeFromCart(id, userInfo.idusers))
        
    }

    const checkOutHandler = () => {
        let action = "Modulo lista de carro"
        var nowDate = new Date()
        var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate()

        dispatch(postBitacora(action, date, userInfo))

        props.history.push('/signin?redirect=shipping')

    }
    const checkOutHandlerTwo = (id) => {
        let action = "Modulo lista de carro"
        var nowDate = new Date()
        var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate()

        dispatch(postBitacora(action, date, userInfo))

         console.log(cartItems)
       cartItems.filtrarOrden = id
        console.log(cartItems)
        props.history.push('/signin?redirect=shipping')

    }
    return (
        <div className="row top">
            <div className="col-2" >
                <h1>Shopping Cart</h1>
                {

                    cartItems?.length === 0 ? (<MessageBox>

                        Carro de Compras Vacio <Link to='/'>Ir a Comprar</Link>

                    </MessageBox>)
                        : (

                            <ul>
                                {
                                    cartItems?.map((item) => (

                                        <li key={item.product}>

                                            <div className="row">
                                                <div>
                                                    <img src={item.image} alt={item.name} className="small"></img></div>

                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>

                                                </div>


                                                <div>

                                                    <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value), userInfo.idusers))}>

                                                        {

                                                            [...Array(item.countInStock).keys()].map(x => (<option key={x + 1} value={x + 1}>

                                                                {x + 1}

                                                            </option>))
                                                        }
                                                    </select>

                                                </div>

                                                <div>

                                                    ${item.price}

                                                </div>

                                                <div>

                                                    <button type="button" onClick={() => removeFromCartHandler(item.product)}>Delete</button>

                                                </div>
                                                <div>

                                                    <button type="button" onClick={() => checkOutHandlerTwo(item.product)}>Ordenar</button>

                                                </div>

                                            </div>


                                        </li>
                                    ))
                                }
                            </ul>

                        )

                }

            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Sub Total ({cartItems?.reduce((a, c) => a + c.qty, 0)} items) : $ {cartItems?.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkOutHandler} className="primary block" disabled={cartItems?.length === 0}>Proceed To CheckOut</button>

                        </li>
                    </ul>

                </div>

            </div>
        </div>
    )
}

export default CartScreen
