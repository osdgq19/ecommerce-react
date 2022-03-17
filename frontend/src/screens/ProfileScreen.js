import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { postBitacora } from '../actions/BitacoraActions'
function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile
    const dispatch = useDispatch()

    useEffect(() => {
        if(!user){
        console.log(userInfo)
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(detailsUser(userInfo.idusers))}
        else {
            
        let action = "Modulo Actualizar Usuario"
        var nowDate = new Date()
        var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()
        
        dispatch(postBitacora( action, date ,userInfo ))
            setName(user[0].name)
            setEmail(user[0].email)
        }
    }, [dispatch,userInfo.idusers,user])

    const submitHandler = (e) => {
        console.log(user)
        e.preventDefault()
        if(password!== confirmPassword) {
            alert('Las contraseñas no coinciden')
        } else {dispatch(updateUserProfile({userId: user[0].idusers, name, email, password}))
    
    }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                   loading ? <LoadingBox/>: error ? <MessageBox variant="danger">{error}</MessageBox>:
                   <> 
                    {loadingUpdate&& <LoadingBox/>}
                    {errorUpdate&& <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {successUpdate&& <MessageBox variant="success">Usuario actualizado exitosamente</MessageBox>}

                     <div> 
                         <label htmlFor="name">Nombre</label>

                         <input id="name" type="text" placeholder="Ingrese nombre" value={name} onChange={(e)=>setName(e.target.value)}></input>


                     </div>
                   
                     <div> 
                         <label htmlFor="email">Email</label>

                         <input id="email" type="text" placeholder="Ingrese email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>


                     </div>
                   
                     <div> 
                         <label htmlFor="password">Contraseña</label>

                         <input id="password" type="text" placeholder="Ingrese contraseña" value={password} onChange={(e)=>setPassword(e.target.value)}></input>


                     </div>

                     <div> 
                         <label htmlFor="password">Confirme Contraseña</label>

                         <input id="password" type="text" placeholder="Confirme contraseña" onChange={(e)=>setConfirmPassword(e.target.value)} ></input>


                     </div>

                     <div> 
                         <label/>
                         
                         <button className="primary" type="submit">Update</button>
                      </div>
                   </>

                }

            </form>
        </div>
    )
}

export default ProfileScreen
