import React, {useEffect, useState} from 'react'
import Product from '../components/Product'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'
import {postBitacora} from '../actions/BitacoraActions'

function HomeScreen(props) {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList
  const [searchTerm, setSearchTerm] = useState('')
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin
  console.log(props.filtro)
  useEffect(() => {
    let action = 'Modulo Inicio'
    var nowDate = new Date()
    var date =
      nowDate.getFullYear() +
      '-' +
      (nowDate.getMonth() + 1) +
      '-' +
      nowDate.getDate()

    dispatch(postBitacora(action, date, userInfo))
    dispatch(listProducts())
  }, [dispatch])

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products
            .filter(val => {
              if (
                props.buscar === '' &&
                (props.filtro === 'Todas' || props.filtro === ' ')
              ) {
                return val
              } else if (
                val.name.toLowerCase().includes(props.buscar.toLowerCase()) &&
                val.nombre_categoria
                  .toLowerCase()
                  .includes(props.filtro.toLowerCase())
              ) {
                return val
              }
            })
            .map(product => {
              return (
                <Product key={product.idproducts} product={product}></Product>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default HomeScreen
