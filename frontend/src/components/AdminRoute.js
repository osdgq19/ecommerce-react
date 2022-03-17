import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

function AdminRoute({component: Component,...rest}) {
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    return (
        <div>
            <Route {...rest} render = {(props)=> userInfo && userInfo.isAdmin? (<Component {...props}></Component>): 
            
        (<Redirect to="/signin"></Redirect>)}
       ></Route> </div>
    )
}

export default AdminRoute
