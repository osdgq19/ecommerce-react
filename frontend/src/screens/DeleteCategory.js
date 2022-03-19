import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {removeCategory} from '../actions/categoriaAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {postBitacora} from '../actions/BitacoraActions'
function DeleteCategory() {
  const categoriasInfo = useSelector(state => state.categoriasInfo)
  const {categorias, message} = categoriasInfo
  const dispatch = useDispatch()
  const [category, setCategory] = useState('')
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin
  useEffect(() => {
    let action = 'Modulo Eliminar Categoria'
    var nowDate = new Date()
    var date =
      nowDate.getFullYear() +
      '-' +
      (nowDate.getMonth() + 1) +
      '-' +
      nowDate.getDate()

    dispatch(postBitacora(action, date, userInfo))
  }, [dispatch])
  const submitHandler = async e => {
    e.preventDefault()
    console.log(categorias.find(x => x.nombre_categoria === category))
    if (!categorias.find(x => x.nombre_categoria === category)) {
      alert('Categoria no existe')
    } else {
      dispatch(removeCategory({name: category}))
    }
  }
  return (
    <div>
      {message ? <MessageBox>{message}</MessageBox> : ''}
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Elminar Categoria de Producto</h1>
        </div>
        <div>
          <label htmlFor="category">Ingrese Categoria</label>
          <input
            type="text"
            id="category"
            placeholder="Ingrese Categoria"
            required
            value={category}
            onChange={e => setCategory(e.target.value)}
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit">
            Continuar
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteCategory
