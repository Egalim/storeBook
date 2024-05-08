import React, { useState } from 'react'
import Header from '../components/header/Header'
import './NewBook.css'
import { useSelector } from 'react-redux'

const NewBook = () => {
    const id = useSelector((state) => state.auth.id)
    const [Title, setTitle] = useState('')
    const [Descript, setDescript] = useState('')
    const [Author, setAuthor] = useState('')
    const [Image, setImage] = useState(null)
    const [FileText, setFileText] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', Title);
        formData.append('descript', Descript);
        formData.append('author', Author);
        formData.append('image', Image); // Check if 'image' corresponds to the correct field name
        formData.append('textfile', FileText); 
        formData.append('userid', id)

        try {
            const response = await fetch('http://localhost:5000/newBook', {
                method: 'POST',
                body: formData,
                mode: 'cors'
            });

            const data = await response.json()
            console.log(data);
        
            if (response.ok) {
                console.log('Книга успешно загружена!');
        
                setTitle('');
                setDescript('');
                setAuthor('');
            } else {
                console.error('Ошибка при загрузке книги:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }
    return (
        <div className='container'>
            <Header />
            <div className="content">
                <div className="container_new">

                    <form className='frm_newbook' onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className='form_book'>
                            <label>Выбрать обложку:
                            <input type="file"
                                className='input_grey'
                                name='image'
                                accept=".jpg, .jpeg, .png"
                                onChange={e => setImage(e.target.files[0])}
                            /></label>

                            <label>Выбрать файл:
                            <input type="file"
                                className='input_grey'
                                name='textfile' 
                                accept=".txt, .doc, .docx, .pdf"
                                onChange={e => setFileText(e.target.files[0])} 
                            />
                            </label>
                            <button className='btn_black' type='submit'><p>Загрузить</p></button>
                        </div>
                        <div className='form_book'>
                            <input type="title"
                                className='input_grey'
                                name='title'
                                placeholder='Название книги:'
                                value={Title}
                                required
                                onChange={e => setTitle(e.target.value)}
                            />
                            <textarea className='input_grey' name="descript" id="descript"
                                placeholder='Описание книги:'
                                value={Descript}
                                onChange={e => setDescript(e.target.value)}></textarea>
                            <input className='input_grey' type="author"
                                name='author'
                                placeholder='Автор книги:'
                                value={Author}
                                required
                                onChange={e => setAuthor(e.target.value)}
                            />

                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default NewBook