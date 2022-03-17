import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { listPayment } from '../actions/paymentActions'
import { postBitacora } from '../actions/BitacoraActions'
import { Redirect } from 'react-router'
export default function PaymentMethodScreen(props) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const paymentMethod = useSelector(state => state.paymentMethod)
    const { payMethod } = paymentMethod
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;
    if (!shippingAddress.address) {

        props.history.push('/shipping')
    }

    const [ID, setID] = useState(1)
    const dispatch = useDispatch()
    useEffect(() => {
        
        let action = "Modulo Metodo de Pago"
        var nowDate = new Date()
        var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate()
     
        dispatch(postBitacora(action, date, userInfo))
        dispatch(listPayment());
    }, [dispatch]);

    const submitHandler = (e) => {

        e.preventDefault()
        console.log(ID)
        dispatch(savePaymentMethod(ID))
        props.history.push('/placeorder')
    }
    const changeHandler = (e) => {

       
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Método de Pago</h1>
                </div>
                {console.log(payMethod)}
                {payMethod?.map(p => { return (
                    <div key={p.idpayment_method}>
                        <div>
                            <input type="radio" id={p.idpayment_method}
                                value={p.name} name="payment"
                                required onChange={(e)=> setID(e.target.id)} ></input>
                            <label htmlFor={p.name}>{p.name}</label>
                        </div>
                    </div>
                )})}


                <button className="primary block" type="submit">Continuar</button>
            </form>
        </div>
    )
}
