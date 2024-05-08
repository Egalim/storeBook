import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';

const MyBook = () => {
    const [books, setBooks] = useState([]);

    const id = useSelector((state) => state.auth.id);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/myBooks/${id}`)
            .then(data => data.json())
            .then(json => {
                console.log(json); // Log the data coming from the server
                setBooks(json.books); // Ensure 'books' property is accessed correctly
            })
            .catch(error => console.error('Error fetching book data:', error));
    }, []);

    return (
        <div className="container">
            <Header />
            <div className="content">
                <a className='txt_grey' onClick={() => { navigate("/") }}>На главную</a>
                <div className="container_cards">
                    {books?.map(book => (
                        <div className="card" key={book.id}>
                            <div className="info">
                                <h1 className="txt_sbold">{book.title}</h1>
                                <p>{book.descript}</p>
                                <div className="row_txt">
                                    <p className='txt_sbold'>Автор книги:</p>
                                    <p>{book.author}</p>
                                </div>
                                <div className="row_txt">
                                    <p className='txt_sbold'>Статус:</p>
                                    <p>{book.statusname}</p>
                                </div>
                            </div>
                            <img src={`http://localhost:5000/${book.image}`} alt="book" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBook;