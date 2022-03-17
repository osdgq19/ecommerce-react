import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postBitacora } from '../actions/BitacoraActions';
import { getCategoria } from '../actions/categoriaAction';
import { addProduct, updateMyProd } from '../actions/productActions'
function AddProductScreen(props) {
    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;
    const user = userInfo.idusers
    useEffect(() => {
       
        let action = "Modulo Añadir Producto"
        var nowDate = new Date()
        var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate()

        dispatch(postBitacora(action, date, userInfo))


        dispatch(getCategoria());
      }, [dispatch]);
      const categoriasInfo = useSelector(state => state.categoriasInfo);
      const { categorias } = categoriasInfo
 
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState(1)
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [qty, setQty] = useState(0)
    const [imageName, setImageName] = useState('')
    const [imageFile, setImageFile] = useState('')
    const [uploadedFile, setUploadedFile] = useState('')
    const [impuesto, setImpuesto] = useState('')

    const submitHandler = async (e) => {


        if (!props.location.state) {
            e.preventDefault()
            const formData = new FormData()
            formData.append('file', imageFile)
            formData.append('upload_preset','f74mm5s1' )               
            const res = await axios.post('https://api.cloudinary.com/v1_1/dvokucwl6/upload', formData ).then(res => res.data)
                const {secure_url} = res
             console.log(category)
            dispatch(addProduct({ name, brand, category, description, price, qty, imageName: String(secure_url), user, impuesto }))
            let action = "Registro de Producto"
            var nowDate = new Date()
            var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate()

            dispatch(postBitacora(action, date, userInfo))
            props.history.push('/myproducts')

        }

        else {
            const { parametro } = props.location.state
            var id = parametro
            e.preventDefault()
            const formData = new FormData()
            formData.append('file', imageFile)
            formData.append('upload_preset','f74mm5s1' )               
            const res = await axios.post('https://api.cloudinary.com/v1_1/dvokucwl6/upload', formData ).then(res => res.data)
                const {secure_url} = res
            dispatch(updateMyProd({ name, brand, category, description, price, qty, imageName: String(secure_url) , user, id , impuesto}))
            let action = "Modificacion de Publicación"
            var nowDate = new Date()
            var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate()

            dispatch(postBitacora(action, date, userInfo))
            props.history.push('/myproducts')

        }
    }
    const handleImage = (e) => {
        setImageFile(e.target.files[0])

    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler} >

                <div>
                    <h1>Publicar Producto</h1>
                </div>
                <div>
                    <label htmlFor="name">Nombre del producto</label>
                    <input type="text" id="name"
                        placeholder="Ingrese Nombre"
                        required value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="brand">Marca</label>
                    <input type="text" id="brand"
                        placeholder="Ingrese Marca"
                        required value={brand} onChange={(e) => setBrand(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="category">Categoria</label>
                    {
              categorias && (
                <>
                 {console.log(categorias)}

                  <div>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>

                      {

                        categorias?.map(categorias => (<option key={categorias.idcategorias} value={categorias.idcategorias}>

                          {categorias.nombre_categoria}

                        </option>))
                      }
                    </select>

                  </div>






                </>)


            }
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description"
                        placeholder="Ingrese Descripcion"
                        required value={description} onChange={(e) => setDescription(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="price">Precio</label>
                    <input type="number" id="price"
                        placeholder="Ingrese Precio" min={0}
                        required value={price} onChange={(e) => setPrice(e.target.value)}></input>
                </div>
                <div>Cantidad</div>

                <div>
                    <select value={qty} onChange={(e) => setQty(e.target.value)}>

                        {

                            [...Array(100).keys()].map(x => (<option key={x + 1} value={x + 1}>

                                {x + 1}

                            </option>))
                        }
                    </select>

                </div>

                <div>
                    <label htmlFor="image">Imagen</label>
                    <input type="file" id="image" 
                        placeholder="Ingrese Imagen"
                        required onChange={handleImage}></input>
                </div>
             <div>
             <div>impuesto</div>
                <select onChange ={(e)=> setImpuesto(e.target.value)}>
                         <option value=""></option>
                         <option value="Exento">Exento</option>
                         <option value="IVA">IVA</option>
                     </select>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit" >Continuar</button>
                </div>



            </form>
        </div>
    )
}

export default AddProductScreen
