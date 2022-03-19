import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteUser} from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {postBitacora} from '../actions/BitacoraActions'

function DeleteUserScreen(props) {
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo, loading, error} = userSignin

  const dispatch = useDispatch()

  const deleteHandler = e => {
    e.preventDefault()
    dispatch(deleteUser(userInfo.idusers))
    props.history.push('/')
  }
  useEffect(() => {
    if (!userInfo) {
      props.history.push(redirect)
    } else {
      let action = 'Modulo Eliminar Usuario'
      var nowDate = new Date()
      var date =
        nowDate.getFullYear() +
        '-' +
        (nowDate.getMonth() + 1) +
        '-' +
        nowDate.getDate()

      dispatch(postBitacora(action, date, userInfo))
    }
  }, [props.history, redirect, userInfo])

  return (
    <div>
      <form className="form">
        <div>
          <h1>¿Seguro desea eliminar la cuenta?</h1>
        </div>
        <div>
          <a href="/">Volver a Inicio</a>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div>
          <label />
          <button className="primary" type="submit" onClick={deleteHandler}>
            Aceptar
          </button>
        </div>
        <div>
          <label />
        </div>
      </form>
    </div>
  )
}

export default DeleteUserScreen
