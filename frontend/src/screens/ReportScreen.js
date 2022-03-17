import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postBitacora } from '../actions/BitacoraActions'
import { getReport } from '../actions/reportActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function ReportScreen(props) {
    const dispatch = useDispatch()
    const {tipoReporte, parametro} = props.location.state
    const reportInfos = useSelector(state => state.reportInfo)
    const {loading,reportInfo,error} = reportInfos
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    console.log(reportInfo)
    useEffect(() => {

        dispatch(getReport(tipoReporte, parametro))
        let action = "Modulo Reporte de Seleccion por " + tipoReporte
        var nowDate = new Date()
        var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()

        dispatch(postBitacora( action, date ,userInfo ))
    }, [dispatch,tipoReporte, parametro])
    return (
        <div>
           <h1>Reporte por {tipoReporte}</h1>
            {

                loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox>
                    : (<table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOMBRE</th>
                                <th>CATEGORIA</th>
                                <th>MARCA</th>
                                <th>PRECIO</th>
                                <th>ACTIONS</th>

                            </tr>


                        </thead>
                        <tbody>
                            {
                            
                             reportInfo?.map((report) => {return(
                                <tr key={report.idproducts}>
                                    <td>{report.idproducts}</td>
                                    <td>{report.name}</td>
                                    <td>{report.category}</td>
                                    <td>{report.brand}</td>
                                    <td>{report.price}</td>
                                    
                                    <td><button type="button" className="small" onClick={() => props.history.push(`/product/${report.idproducts}`)}>Details</button></td>


                                </tr>

                              ) })


                            }

                        </tbody>

                    </table>)


            }
        </div>
    )
}
