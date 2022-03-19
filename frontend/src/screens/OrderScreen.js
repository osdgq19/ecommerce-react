import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {detailsOrder, payOrder, reduceStock} from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {ORDER_PAY_RESET} from '../constants/orderConstants'
import {postBitacora} from '../actions/BitacoraActions'
import {getEstados} from '../actions/cartActions'

export default function OrderScreen(props) {
  const statesInfo = useSelector(state => state.statesInfo)
  const {estados} = statesInfo
  const orderId = props.match.params.id
  const [sdkReady, setSdkReady] = useState(false)
  const orderDetails = useSelector(state => state.orderDetails)
  const {order, loading, error} = orderDetails
  console.log(order)
  var id = order?.cabeza[0].state
  console.log(id)
  console.log(estados)
  const orderPay = useSelector(state => state.orderPay)
  const {loading: loadingPay, error: errorPay, success: successPay} = orderPay
  const shippingDetails = estados?.find(x => x.idstate === id)
  console.log(shippingDetails)
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin
  const dispatch = useDispatch()
  const [imageFile, setImageFile] = useState('')

  useEffect(() => {
    let action = 'Modulo Orden a Pagar'
    var nowDate = new Date()
    var date =
      nowDate.getFullYear() +
      '-' +
      (nowDate.getMonth() + 1) +
      '-' +
      nowDate.getDate()

    dispatch(postBitacora(action, date, userInfo))
    if (
      !order ||
      successPay ||
      (order && order.cabeza[0].id_order != orderId)
    ) {
      dispatch({type: ORDER_PAY_RESET})
      dispatch(detailsOrder(orderId))
    } else {
      if (order.cabeza[0].isPaid === '') {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, order, sdkReady, successPay])

  const successPaymentHandler = async () => {
    try {
      const formData = new FormData()
      formData.append('file', imageFile)
      formData.append('upload_preset', 'f74mm5s1')
      const res = await axios
        .post('https://api.cloudinary.com/v1_1/dvokucwl6/upload', formData)
        .then(res => res.data)
      const {secure_url} = res
      var nowDate = new Date()
      var date =
        nowDate.getFullYear() +
        '-' +
        (nowDate.getMonth() + 1) +
        '-' +
        nowDate.getDate()
      console.log(date)
      order.urlCap = secure_url
      dispatch(payOrder(order, date, String(secure_url)))
      let action = 'Orden Pagada'
      dispatch(postBitacora(action, date, userInfo))
      dispatch(reduceStock(order))
    } catch (error) {}
  }
  const handleImage = e => {
    setImageFile(e.target.files[0])
  }
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1> Order {order.cabeza[0].id_order} </h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Nombre: </strong> {order.cabeza[0].fullname} <br></br>
                  <strong>Direccción: </strong> {order.cabeza[0].direction}{' '}
                  {order.cabeza[0].address} , {shippingDetails?.state_name} ,{' '}
                  {'Venezuela'}
                </p>
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Pago</h2>
                <p>
                  <strong>Método de Pago: </strong> {order.cabeza[0].name}{' '}
                  <br></br>
                </p>
                {!order.cabeza[0]?.capture && (
                  <div>
                    <label htmlFor="image">Ingrese Capture </label>
                    <input
                      type="file"
                      id="image"
                      placeholder="Ingrese Capture"
                      required
                      onChange={handleImage}
                    ></input>
                  </div>
                )}{' '}
                {order.cabeza[0].isPaid === '' ? (
                  <p>Orden sin pagar</p>
                ) : (
                  <p>Orden pagada el: {order.cabeza[0].paidAt} </p>
                )}
                {order.cabeza[0].isPaid === '' ? (
                  <p>Capture no registrado</p>
                ) : (
                  <a href={order.cabeza[0]?.capture}>
                    Capture: {order.cabeza[0]?.capture}{' '}
                  </a>
                )}
                {console.log(order)}
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Productos Pedidos</h2>
                <ul>
                  {order?.detalle.map(item => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>

                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
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
                  <div>${order.cabeza[0].items_price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Envio</div>
                  <div>${order.cabeza[0].shipping}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Impuesto</div>
                  <div>${order.cabeza[0].taxation}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <strong>
                    {' '}
                    <div>Total</div>{' '}
                  </strong>
                  <strong>
                    {' '}
                    <div>${order.cabeza[0].total}</div>
                  </strong>
                </div>
              </li>
              {order.cabeza[0].isPaid === '' && (
                <div>
                  <li>
                    {
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay && <LoadingBox />}
                        {
                          <button
                            className="primary block"
                            onClick={successPaymentHandler}
                            disabled={!imageFile}
                          >
                            Pagar
                          </button>
                        }
                      </>
                    }
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
