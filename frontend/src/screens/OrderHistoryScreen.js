import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {postBitacora} from '../actions/BitacoraActions'
import {listOrderMine} from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
function OrderHistoryScreen(props) {
  const orderMineList = useSelector(state => state.orderMineList)
  const {loading, error, orders} = orderMineList
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listOrderMine())
    let action = 'Modulo Historial de Ordenes'
    var nowDate = new Date()
    var date =
      nowDate.getFullYear() +
      '-' +
      (nowDate.getMonth() + 1) +
      '-' +
      nowDate.getDate()
    dispatch(postBitacora(action, date, userInfo))
  }, [dispatch])

  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              return (
                <tr key={order.id_order}>
                  <td>{order.id_order}</td>
                  <td>{order.isPaid ? order.paidAt : 'No Date'}</td>
                  <td>{order.total}</td>
                  <td>{order.isPaid ? 'Pagado' : 'No Pagado'}</td>
                  <td>{order.status ? 'Entregado' : 'No entregado'}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/order/${order.id_order}`)
                      }
                    >
                      Details
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default OrderHistoryScreen
