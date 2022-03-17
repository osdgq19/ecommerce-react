import React, { useState, useEffect } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import './index.css'
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddProductScreen from './screens/AddProductScreen';
import AddCategory from './screens/AddCategory';
import DeleteCategory from './screens/DeleteCategory';
import MyProductsScreen from './screens/MyProductsScreen';
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import SearchBox from './components/SearchBox';
import ReportOptionScreen from './screens/ReportOptionScreen'
import ReportScreen from './screens/ReportScreen';
import ReportDecisionScreen from './screens/ReportDecisionScreen';
import ReportDecisionOption from './screens/ReportDecisionOption';
import Mantenimiento from './screens/Mantenimiento';
import BitacoraScreen from './screens/BitacoraScreen';
import { getCategoria } from './actions/categoriaAction';
import DeleteUserScreen from './screens/DeleteUserScreen';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(getCategoria());
  }, [dispatch]);
  const categoriasInfo = useSelector(state => state.categoriasInfo);
  const { categorias } = categoriasInfo
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin;
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('')

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;
  const signoutHandler = () => {

    dispatch(signout())

  }
  const ReportHandler = (e) => {
    
  
  }


  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">Inmeaca</Link>

          </div>
          <SearchBox placeholder="Search" buscar={searchTerm} handleChange={(e) => setSearchTerm(e.target.value)}></SearchBox>
          <div className="filter">
            {
              categorias && (
                <>
                 {console.log(categorias)}

                  <div >
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>

                      {

                        categorias?.map(categorias => (<option key={categorias.idcategorias} value={categorias.nombre_categoria}>

                          {categorias.nombre_categoria}

                        </option>))
                      }
                    </select>

                  </div>






                </>)


            }
          </div>
          {/*filter*/}
          <div>

            {

              userInfo ? (<>
                <Link to="/cart">Cart
                  {console.log(cart)}
                  {/*cartItems?.length > 0   && (<span className='badge'>{cartItems.length} </span>)*/}

                </Link>
                <div className="dropdown">

                  <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li> <Link to="#signout" onClick={signoutHandler}>Sign Out</Link> </li>
                    <li>
                      <Link to="/orderhistory" >Order History</Link>
                    </li>
                    <li>
                      <Link to="/profile" >User Profile</Link>
                    </li>
                    <li>
                      <Link to="/addproduct" >Add Product</Link>
                    </li>
                    <li>
                      <Link to="/myproducts" >My Products</Link>
                    </li>
                    <li>
                      <Link to="/deleteuser" >Borrar Ususario</Link>
                    </li>

                  </ul>
                </div>
              </>
              ) : (<Link to="/signin">Sign In</Link>)


            }
            { }
            {userInfo && userInfo.isAdmin === "true" ? <div className="dropdown">
              <Link to="#admin">Admin {' '}<i className="fa fa-caret-down"></i></Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/reportoption" >Reporte</Link>
                </li>
                <li>
                  <Link to="/reportdecisionoption" >Reportes de toma de decision</Link>
                </li>
                <li>
                  <Link to="/Mantenimiento" >Mantenimiento</Link>
                </li>
                <li>
                  <Link to="/bitacora" >Bitacora</Link>
                  <li>
                  <Link to="/addcategory" >Añadir Categoria</Link>
                </li>
                <li>
                  <Link to="/deletecategory" >Borrar Categoria</Link>
                </li>
              
                </li>
              </ul>
            </div> : <div></div>}

          </div>
        </header>

        <main>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/product/:id' component={ProductScreen} ></Route>
          <Route path='/signin' component={SigninScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/shipping' component={ShippingAddressScreen}></Route>
          <Route path='/payment' component={PaymentMethodScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route path='/order/:id' component={OrderScreen}></Route>
          <Route path='/orderhistory' component={OrderHistoryScreen}></Route>
          <PrivateRoute path='/profile' component={ProfileScreen}></PrivateRoute>
          <Route path='/addproduct' component={AddProductScreen}></Route>
          <Route path='/addcategory' component={AddCategory}></Route>
          <Route path='/deletecategory' component={DeleteCategory}></Route>
          <Route path='/myproducts' component={MyProductsScreen}></Route>
          <Route path='/' render={(props) => <HomeScreen {...props} buscar={searchTerm} filtro={filter}></HomeScreen>} exact></Route>
          <Route path='/reportoption' component={ReportOptionScreen} ></Route>
          <Route path='/reports' component={ReportScreen} ></Route>
          <Route path='/reportdecisionoption' component={ReportDecisionOption} ></Route>
          <Route path='/reportsdecision' component={ReportDecisionScreen} ></Route>
          <Route path='/mantenimiento' component={Mantenimiento} ></Route>
          <Route path='/bitacora' component={BitacoraScreen} ></Route>
          <Route path='/deleteuser' component={DeleteUserScreen} ></Route>
        
        </main>






        <footer className="row center">
          All Right Reserved
        </footer>
      </div>
    </BrowserRouter>

  );
}

export default App;
