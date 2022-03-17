import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { getEstados, getStates, saveShippingAddress } from '../actions/cartActions'
import { postBitacora } from '../actions/BitacoraActions'
export default function ShippingAddressScreen(props) {

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart
    const dispatch = useDispatch()
  
    if (!userInfo) {

        props.history.push('/signin')
       
    }
  
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [estado, setEstado] = useState(1)
    useEffect(() => {
        let action = "Modulo Direccion de Envio " 
        var nowDate = new Date()
        var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()

        dispatch(postBitacora( action, date ,userInfo ))
        dispatch(getEstados());
   }, []);
   const statesInfo = useSelector(state => state.statesInfo);
   const { estados} = statesInfo
   console.log(statesInfo)
    const submitHandler = (e) => {
        var flag = true
        e.preventDefault()
        console.log(estado)
        for( let i=0; i<=fullName?.length; i++){
            if(fullName.charAt(i)>= '0' && fullName.charAt(i)<='9'){
                flag = false
            }
        }
        if(!flag){
            alert('Nombre no debe tener numeros')
        }else{
        dispatch(saveShippingAddress({ fullName, address, estado }))
        props.history.push('/payment')
        }
    }
  
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form">

                <div>
                    <h1>Dirección de Envio</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Nombre Completo del Comprador</label>
                    <input type="text" id="fullName"
                        placeholder="Ingrese Nombre Completo"
                        value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="address">Dirección</label>
                    <input type="text" id="address"
                        placeholder="Ingrese Dirección"
                        value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                </div>
                {
                    estados && (
                        <>  
                            
                                <div>Estados</div>

                                <div>
                                    <select onChange={(e) => setEstado( e.target.value)}>

                                        {

                                        estados?.map(sta => (<option key={sta.idstate} value={sta.idstate}>

                                                {sta.state_name}

                                            </option>))
                                        }
                                    </select>

                                </div>


                        

                        

                        </>)


                                    }



                <div>
                    <label></label>
                    <a className='botonfalso' onClick={submitHandler}>Continuar</a>
                </div>
            </form>
        </div>
    )
}
