import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


function RegisterScreen(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    var { userInfo, loading, error } = userRegister;
    console.log(props)
 
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {

            alert('Las contraseñas no coinciden')

        } else {
            dispatch(register(name, email, password))
        }
        props.history.push('/')
    }

    useEffect(() => {
            
       
    
        

    }, [props.history, redirect, userInfo])




    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Registrarse</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" placeholder="Enter name" required onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter email" required onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Enter password" required onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm password" required onChange={e => setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Registrarse</button>

                </div>
                <div>

                    <label />

                    <div>
                        Ya tienes una cuenta? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen
