import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {postBitacora} from '../actions/BitacoraActions'
import {getDecisionReport, getReport} from '../actions/reportActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function ReportDecisionScreen(props) {
  const dispatch = useDispatch()
  const {fechaInicio, fechaFinal, tipoReporte} = props.location.state
  const reportInfos = useSelector(state => state.reportInfo)
  const {loading, reportInfo, error} = reportInfos
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin
  console.log(reportInfo)
  useEffect(() => {
    dispatch(getDecisionReport(tipoReporte, fechaInicio, fechaFinal))
    let action = 'Modulo Reporte de Toma de Decision por ' + tipoReporte
    var nowDate = new Date()
    var date =
      nowDate.getFullYear() +
      '-' +
      (nowDate.getMonth() + 1) +
      '-' +
      nowDate.getDate()

    dispatch(postBitacora(action, date, userInfo))
  }, [dispatch, tipoReporte, fechaInicio, fechaFinal])

  return (
    <div>
      <h1>Reporte por {tipoReporte}</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : tipoReporte === 'Producto' ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>CANTIDAD VENDIDA</th>
              <th>PRODUCTO</th>
              <th>MARCA</th>
            </tr>
          </thead>
          <tbody>
            {console.log(reportInfo)}
            {reportInfo?.ordenes.map(report => {
              return (
                <tr key={report.id_order}>
                  <td>{report.id_order}</td>
                  <td>{report.acumulado}</td>
                  <td>{reportInfo.product[0]?.name}</td>
                  <td>{reportInfo.product[0]?.brand}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TOTAL</th>
              <th>FECHA</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {reportInfo?.ordenes.map(report => {
              return (
                <tr key={report.id_order}>
                  <td>{report.id_order}</td>
                  <td>{report.total}</td>
                  <td>{report.paidAt}</td>

                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/order/${report.id_order}`)
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
      {tipoReporte === 'Ganancias' ? (
        <h1>
          Ganancias Totales desde {fechaInicio} hasta {fechaFinal}:{' '}
          {reportInfo?.ganancia[0].ganancias}${' '}
        </h1>
      ) : tipoReporte === 'Entregas' ? (
        <h1>
          Nro total de Entregas desde {fechaInicio} hasta {fechaFinal}:{' '}
        </h1>
      ) : tipoReporte === 'Ordenes' ? (
        <h1>
          Nro total de Ordenes desde {fechaInicio} hasta {fechaFinal}:{' '}
        </h1>
      ) : tipoReporte === 'Producto' ? (
        <h1>
          Producto mas vendido desde {fechaInicio} hasta {fechaFinal}:{' '}
        </h1>
      ) : (
        <h1>
          Nro total de Ordenes Cobradas desde {fechaInicio} hasta {fechaFinal}:{' '}
        </h1>
      )}
    </div>
  )
}
