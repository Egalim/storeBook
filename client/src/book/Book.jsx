import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import './Book.css'
import img from '../assets/1.jpg'

const Book = () => {
    const navigate = useNavigate()
    const [Book, setBook] = useState({})
    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:5000/book/${id}`)
            .then(response => response.json())
            .then(data => {
                setBook(data.book); // Обновите состояние продукта
                console.log(data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных о продукте:', error);
            });
    }, [id]);
    
    return (
        <div className="container">
            <Header />
            <div className="content">
                <a className='txt_grey' onClick={() => {navigate("/")}}>На главную</a>
                <div className="container_book">
                    <div className="info">
                        <h1 className="txt_sbold">{Book.title}</h1>
                        <p>{Book.descript}</p>
                        <div className="row_txt">
                            <p className='txt_sbold'>Автор книги:</p>
                            <p>{Book.author}</p>
                        </div>
                        <div className="row_txt">
                            <p className='txt_sbold'>Выложил:</p>
                            <p>{Book.username}</p>
                        </div>
                        <button className='btn_border'><h3>Скачать книгу</h3></button>
                    </div>
                    <img src={`http://localhost:5000/${Book.image}`} alt="book" />
                </div>
            </div>
        </div>
    )
}

export default Book