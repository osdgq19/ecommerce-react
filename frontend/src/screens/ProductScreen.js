import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { postBitacora } from '../actions/BitacoraActions'
import { detailsProduct}  from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Rating from '../components/Rating'



function ProductScreen(props) {

    const dispatch = useDispatch()
    const productID = props.match.params.id
    const productDetails = useSelector(state => state.productDetails)
    const { product, error, loading } = productDetails;
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;
    const [ qty, setQty ] = useState(1)
    useEffect(() => {
       // let action = "Ver Prodcuto"
        //var nowDate = new Date()
        //var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()
        dispatch(detailsProduct(productID))
        //dispatch(postBitacora( action, date ,userInfo ))

    }, [dispatch, productID])

    const addToCartHandler = () =>{

       props.history.push(`/cart/${productID}?qty=${qty}&user=${userInfo.idusers}`)
       let action = "Modulo Producto "
        var nowDate = new Date()
        var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()
        dispatch(detailsProduct(productID))
        dispatch(postBitacora( action, date ,userInfo ))

    }


    return (
        <div>
            {
                loading ? (<LoadingBox></LoadingBox>) :

                    error ? (<MessageBox variant="danger">{error}</MessageBox>) :

                        (

                            <div>

                                <Link to='/'>Back to result </Link>

                                <div className='row top'>

                                    <div className='col-2'>
                                        <img className='large' src={product[0].image} alt={product[0].name}></img>
                                    </div>
                                    <div className='col-1'>

                                        <ul>
                                            <li>

                                                <h1>{product[0].name}</h1>

                                            </li>

                                            <li>
                                                {/*<Rating rating={product[0].rating} numReviews={product[0].numReviews}></Rating>*/}
                                            </li>
                                            <li> Precio : ${product[0].price}</li>
                                            <li>Descripción : {product[0].description}</li>
                                        </ul>

                                    </div>
                                    <div className='col-1'>

                                        <div className='card card-body'>

                                            <ul>

                                                <li>
                                                    <div className='row'>

                                                        <div>Price</div>
                                                        <div className='price'>${product[0].price}</div>
                                                    </div>

                                                </li>

                                                <li>
                                                    <div className='row'>

                                                        <div>Status</div>
                                                        <div className='price'>{product[0].countInStock > 0 ? (<span className='sucess'>In Stock </span>) :
                                                            (<span className='danger'>Unavaible </span>)
                                                        }</div>
                                                    </div>

                                                </li>
                                                {
                                                    product[0].countInStock > 0 && (
                                                        <>  <li>
                                                            <div className='row'>
                                                                <div>Qty</div>

                                                                <div>
                                                                    <select value={qty} onChange={(e) => setQty(e.target.value)}>

                                                                        {

                                                                            [...Array(product[0].countInStock).keys()].map(x => (<option key={x + 1} value={x + 1}>

                                                                                {x + 1}

                                                                            </option>))
                                                                        }
                                                                    </select>

                                                                </div>


                                                            </div>

                                                        </li>

                                                            <li>

                                                                <button onClick={addToCartHandler} className='primary block'>Add to Cart</button>

                                                            </li>
                                                        </>)


                                                }



                                            </ul>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        )}
        </div>




    )
}

export default ProductScreen
