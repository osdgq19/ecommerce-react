import React, { useState ,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCategoria } from '../actions/categoriaAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { postBitacora } from '../actions/BitacoraActions'
function AddCategory() {
    const categoriasInfo = useSelector(state => state.categoriasInfo);
  const { categorias } = categoriasInfo
    const categoriasAddInfo = useSelector(state => state.categoriasAddInfo);
    const { message, loading, error } = categoriasAddInfo
    const dispatch = useDispatch()
    const [category, setCategory] = useState('')
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;
    useEffect(()=> {
        let action = "Modulo Añadir Categoria"
        var nowDate = new Date()
        var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate()

        dispatch(postBitacora(action, date, userInfo))

       
   }, [dispatch])
    const submitHandler = async (e) => {
        e.preventDefault()
        if(categorias.find(x => x.nombre_categoria === category)){
          alert('Categoria ya existe')
        }
        else{
        dispatch(addCategoria({name: category}))}
    }
    return (
        <div>
             {loading? <LoadingBox></LoadingBox>: error? <MessageBox>{error}</MessageBox>: <MessageBox>{message}</MessageBox>}
            <form className="form" onSubmit={submitHandler} >
     
                <div>
                    <h1>Agregar Categoria de Producto</h1>
                </div>
                <div>
                    <label htmlFor="category">Ingrese Categoria</label>
                    <input type="text" id="category"
                        placeholder="Ingrese Categoria"
                        required value={category} onChange={(e) => setCategory(e.target.value)}></input>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit" >Continuar</button>
                </div>

           </form>
        </div>
    )
}

export default AddCategory
