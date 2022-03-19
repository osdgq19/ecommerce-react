import {
  REPORT_FAIL,
  REPORT_REQUEST,
  REPORT_SUCCESS,
} from '../constants/reportConstants'
import Axios from 'axios'

export const getReport = (tipoReporte, parametro) => async dispatch => {
  console.log(tipoReporte)
  dispatch({type: REPORT_REQUEST, payload: {tipoReporte, parametro}})
  try {
    const {data} = await Axios.post('/api/report/', {tipoReporte, parametro})
    console.log(data)
    dispatch({type: REPORT_SUCCESS, payload: data})
  } catch (error) {
    console.log(error)
    dispatch({
      type: REPORT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getDecisionReport =
  (tipoReporte, fechaInicio, fechaFinal) => async dispatch => {
    if (tipoReporte === 'Ganancias') {
      dispatch({
        type: REPORT_REQUEST,
        payload: {tipoReporte, fechaInicio, fechaFinal},
      })
      try {
        const {data} = await Axios.post('/api/report/decision/ganancias', {
          tipoReporte,
          fechaInicio,
          fechaFinal,
        })
        console.log(data)

        dispatch({type: REPORT_SUCCESS, payload: data})
      } catch (error) {
        console.log(error)
        dispatch({
          type: REPORT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
    }

    if (tipoReporte === 'Entregas') {
      dispatch({
        type: REPORT_REQUEST,
        payload: {tipoReporte, fechaInicio, fechaFinal},
      })
      try {
        const {data} = await Axios.post('/api/report/decision/entregas', {
          tipoReporte,
          fechaInicio,
          fechaFinal,
        })
        console.log(data)

        dispatch({type: REPORT_SUCCESS, payload: data})
      } catch (error) {
        console.log(error)
        dispatch({
          type: REPORT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
    }

    if (tipoReporte === 'Cobradas') {
      dispatch({
        type: REPORT_REQUEST,
        payload: {tipoReporte, fechaInicio, fechaFinal},
      })
      try {
        const {data} = await Axios.post('/api/report/decision/entregas', {
          tipoReporte,
          fechaInicio,
          fechaFinal,
        })
        console.log(data)

        dispatch({type: REPORT_SUCCESS, payload: data})
      } catch (error) {
        console.log(error)
        dispatch({
          type: REPORT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
    }

    if (tipoReporte === 'Ordenes') {
      dispatch({
        type: REPORT_REQUEST,
        payload: {tipoReporte, fechaInicio, fechaFinal},
      })
      try {
        const {data} = await Axios.post('/api/report/decision/entregas', {
          tipoReporte,
          fechaInicio,
          fechaFinal,
        })
        console.log(data)

        dispatch({type: REPORT_SUCCESS, payload: data})
      } catch (error) {
        console.log(error)
        dispatch({
          type: REPORT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
    }

    if (tipoReporte === 'Producto') {
      console.log(tipoReporte)
      dispatch({
        type: REPORT_REQUEST,
        payload: {tipoReporte, fechaInicio, fechaFinal},
      })
      try {
        const {data} = await Axios.put('/api/report/decision/producto', {
          tipoReporte,
          fechaInicio,
          fechaFinal,
        })
        console.log(data)

        dispatch({type: REPORT_SUCCESS, payload: data})
      } catch (error) {
        console.log(error)
        dispatch({
          type: REPORT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
    }
  }
