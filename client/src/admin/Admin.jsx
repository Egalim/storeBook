import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export default function Admin() {
    const [books, setBooks] = useState([])

    const token = useSelector((state) => state.auth.token)
    console.log(token);

    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:5000/req', {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(data => data.json())
            .then(json => setBooks(json.requests))
    }, [])

    const sendStatus = (id, statusId) => {
        fetch(`http://localhost:5000/status`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, statusId })
        })
            .then(data => data.json())
            .then(json => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== json.update[0].id));
            })
    }

    return (
        <>
       <div className="header">
        <h2 className='txt_bold'>MyBooks</h2>
        
          <button onClick={() =>{
            dispatch(logOut())
          }}><h3>Выйти</h3></button>   
        </div>

            <h1>Заявки</h1>
            <div className="">
                {
                    books?.map(book => (
                        <div className="" key={book.id} >
                            <img src={`http://localhost:5000/${book.image}`} onClick={() => navigate(`/books/${book.id}`)} alt="" />
                            <h3>{book.name}</h3>
                            <p>{book.author}</p>
                            <div className="">
                                <button onClick={() => sendStatus(book.id, 2)}>Принять</button>
                                <button onClick={() => sendStatus(book.id, 3)}>Отклонить</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}