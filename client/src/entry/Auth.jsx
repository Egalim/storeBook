import React, { useState } from 'react'
import './entry.css'
import Header from '../components/header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { authThunk } from '../redux/authSlice.js'
import { Link, useNavigate } from 'react-router-dom'

const Auth = () => {
    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [Email, setEmail] = useState('')
    const [Pass, setPass] = useState('')
    return (
        authState.loading ? <p>Загрузка...</p>:
        <div className='container'>
            <Header />
            <div className="content">
                <a className='txt_grey' onClick={() => { navigate("/") }}>На главную</a>
                <div className="container_entry">
                    <h1 className='txt_sbold'>Войти</h1>
                    <form >
                        <input type="email"
                        name='email'
                        value={Email}
                        placeholder='Ваш email:'
                        required
                        onChange={e => setEmail(e.target.value)}
                         />
                         <input type="pass" 
                         name='pass'
                         placeholder='Ваш пароль:'
                         value={Pass}
                         required
                         onChange={e => setPass(e.target.value)}/>
                         <button
                    onClick={() => {
                        dispatch(authThunk({
                            email: Email,
                            password: Pass
                        })).then(() => {
                            navigate("/")
                        })
                    }} className='btn_black'><p>Войти</p></button>
                    <Link to={'/reg'}>Зарегестрироваться</Link>
                    </form>
                    {
                        authState.error? <p>{authState.error}</p> : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Auth