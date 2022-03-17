import React, { useEffect } from 'react'
import { doMantenimiento } from '../actions/mantenimientoActions'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { postBitacora } from '../actions/BitacoraActions'

export default function Mantenimiento() {
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;
  const mantenimientoInfo = useSelector(state => state.MantenimientoInfo)
 
  const {message,loading,error } = mantenimientoInfo;
    const dispatch = useDispatch()
    
    useEffect(()=> {
        let action = "Modulo de Mantenimiento"
        var nowDate = new Date()
        var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate()

        dispatch(postBitacora(action, date, userInfo))

       
   }, [dispatch])
    const handler = () => {

        dispatch(doMantenimiento())
    
    }
    return (
        <div>{console.log(message)}
            {loading? <LoadingBox></LoadingBox>: error? <MessageBox>{error}</MessageBox>: <MessageBox>{message}</MessageBox>}
            <h1> Presione para respaldar la base de datos </h1>
            <div>
                    <label />
                    <button className="primary" type="submit" onClick={handler}>Respaldar </button>

                </div>
        </div>
    )
}
