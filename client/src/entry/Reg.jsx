import React, { useState } from 'react'
import Header from '../components/header/Header'
import { useNavigate } from 'react-router-dom'
import './entry.css'

const Reg = () => {
    const navigate = useNavigate()
    const [Email, setEmail] = useState('')
    const [Pass, setPass] = useState('')
    const [PassConf, setPassConf] = useState('')
    const [Name, setName] = useState('')

    const handleReg = async() => {
        try{
            const res = await fetch('http://localhost:5000/reg', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: Name,
                    email: Email,
                    password: Pass
                })
            })
            if (res.ok){
                navigate("/auth");
            }else{
                const errorData = await response.json();
                console.error('Ошибка регистрации:', errorData.message);
            }     
        }catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }
  return (
    <div className='container'>
        <Header />
        <div className="content">
            <a className='txt_grey' onClick={() => {navigate("/")}}>На главную</a>
            <div className="container_entry">
                <h1 className='txt_sbold'>Регистрация</h1>
                <form >
                    <input type="name"
                    placeholder='Ваше имя:'
                    id='name'
                    name='name'
                    value={Name}
                    required
                    onChange={e => setName(e.target.value)} />
                    <input type="email"
                    placeholder='Ваш email:'
                    id='email'
                    name='email'
                    value={Email}
                    required
                    onChange={e => setEmail(e.target.value)} />
                    <input type="pass"
                    name='pass'
                    value={Pass}
                    required
                    onChange={e => setPass(e.target.value)}
                    placeholder='Ваш пароль:' />
                    <input type="confirm"
                    placeholder='Повторите пароль:'
                    name='confirm'
                    value={PassConf}
                    required
                    onChange={e => setPassConf(e.target.value)} />
                    <button
                    onClick={handleReg} className='btn_black'><p>Зарегестрироваться</p></button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Reg