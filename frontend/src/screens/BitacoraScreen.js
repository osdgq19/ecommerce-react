import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getBitacora} from '../actions/BitacoraActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function BitacoraScreen() {
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin
  const bitacora = useSelector(state => state.bitacoraInfo)
  const {bitacoraInfo, loading, error} = bitacora
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBitacora(userInfo))
  }, [dispatch, userInfo])
  return (
    <div>
      <h1>Reporte por </h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USUARIO</th>
              <th>ACCION</th>
              <th>FECHA</th>
            </tr>
          </thead>
          <tbody>
            {bitacoraInfo?.map(report => {
              return (
                <tr key={report.idbitacora}>
                  <td>{report.idbitacora}</td>
                  <td>{report.user}</td>
                  <td>{report.accion}</td>
                  <td>{report.fecha}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
