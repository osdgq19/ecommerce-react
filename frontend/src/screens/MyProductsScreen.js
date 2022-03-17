import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {  addToMyProd, removeMyProd, updateMyProd } from '../actions/productActions'
import MessageBox from '../components/MessageBox'
import '../index.css'
import {Image} from 'cloudinary-react'
import { postBitacora } from '../actions/BitacoraActions'
function MyProductsScreen(props) {
    
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;
    const dispatch = useDispatch()
    if (!userInfo) {
        props.history.push('/signin')
    }
   
    useEffect(() => {
      
        let action = "Modulo Publicaciones"
        var nowDate = new Date()
        var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate()
     
        dispatch(postBitacora(action, date, userInfo))

            dispatch(addToMyProd(userInfo))


      


    }, [dispatch, userInfo])
    const myProds = useSelector(state => state.myProds)
    console.log(myProds)
    var { mineProds } = myProds;
    if(mineProds[0]?.idproducts) {
        mineProds = []
    }
    console.log(myProds)
    const removeMyProductHandler = (id) => {

         dispatch(removeMyProd(id, userInfo))
    }
    const updateMyProductHandler = (id) => {
       
        props.history.push({pathname: '/addproduct',
        state: {
                  parametro: id}})
   }
    const checkOutHandler = () => {

        props.history.push('/signin?redirect=shipping')
    }

    return (
        <div className="row top">
            <div className="col-2" >
                <h1>Mis Productos</h1>
                {

                    mineProds?.length === 0 ? (<MessageBox>

                   No tiene publicaciones <Link to='/addproduct'>Ofrecer un producto</Link>

                    </MessageBox>)
                     
                        : (

                            <ul>
                                { 
                                  mineProds?.map((item) => (
                                       
                                        <li key={item.product}>
                                             {console.log(item.image)}
                                            <div className="row">
                                                <div>
                                                    <Image cloudName= "dvokucwl6" publicId={item.image} className="small"></Image></div>

                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>

                                                </div>


                                                <div>
                                                    Cantidad disponible {' '}
                                                    <select value={item.countInStock} onChange={e => dispatch(updateMyProd({id: item.product, qty: Number(e.target.value)}))}>

                                                        {

                                                            [...Array(item.countInStock).keys()].map(x => (<option key={x + 1} value={x + 1}>

                                                                {x + 1}

                                                            </option>))
                                                        }
                                                    </select>

                                                </div>

                                                <div>

                                                  Precio de venta:  ${item.price}

                                                </div>

                                                <div>

                                                    <button type="button" onClick={() => removeMyProductHandler(item.product)}>Delete</button>

                                                </div>

                                                
                                                <div>

                                                    <button type="button" onClick={() => updateMyProductHandler(item.product)}>Modificar</button>

                                                </div>

                                            </div>


                                        </li>
                                    ))
                                }
                            </ul>

                        )

                }

            </div>
      
        </div>
    )
}



export default MyProductsScreen
