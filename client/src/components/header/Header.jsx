import React from 'react'
import logo from '../../assets/user.svg'
import "./Header.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../redux/authSlice'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  return (

        <div className="header">
        <h2 className='txt_bold'>MyBooks</h2>
        {token? ( <>
          <div className="menu_token">
            <Link to="/"isActive={() => ['/'].includes(location.pathname)}>Все книги</Link>
            <Link to="/newBook"isActive={() => ['/newBook'].includes(location.pathname)}>Загрузить книгу</Link>
            <Link to="/myBook"isActive={() => ['/'].includes(location.pathname)}>Мои заявки</Link>
          </div>
          <button onClick={() =>{
            dispatch(logOut())
          }}><h3>Выйти</h3></button>
          </>)
        :(
          <button onClick={() => {navigate("/auth")}}><h3>Войти</h3></button>
        )
        }
        
        </div>
  )
}

export default Header