import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import img from '../assets/1.jpg'
import './Main.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Main() {
    const navigate = useNavigate();
    const [Books, setBooks] = useState([]);
    const id = useSelector((state) => state.auth.id)
    
    useEffect(() => {
        fetch(`http://localhost:5000/books`)
            .then(res => res.json())
            .then(json => setBooks(json))
            .catch(error => console.error('Ошибка при получении списка книг:', error));
    }, []);

    return (
        <div className='container'>
            <Header />
            <div className="content">
                <div className="container_cards">
                    {Books.map(book => (
                        <div className="card" key={book.id} onClick={() => navigate(`book/${book.id}`)}>
                            <div className="info_book">
                                <h2 className='txt_sbold'>{book.title}</h2>
                                <p className='hidden'>{book.descript}</p>
                                <div className="row_txt">
                                    <p className='txt_sbold'>Автор книги:</p>
                                    <p>{book.author}</p>
                                </div>
                                <div className="row_txt">
                                    <p className='txt_sbold'>Выложил:</p>
                                    <p>{book.username}</p> {/* Замените на актуальное свойство */}
                                </div>
                            </div>
                            <img src={`http://localhost:5000/${book.image}`} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

