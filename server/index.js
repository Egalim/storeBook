import express from "express"
import { sql } from "./db.js"
import cors from "cors"
import { reg } from "./controllers/reg.js"
import { auth } from "./controllers/auth.js"
import multer from "multer"
import { uploadFile } from "./controllers/uploadFiles.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.post("/reg", reg) 
app.post("/auth", auth)
  
  
const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
}) 

const upload = multer({ storage});

app.post("/newBook", upload.fields([{ name: "image", maxCount: 1 }, { name: "textfile", maxCount: 1 }]), uploadFile);

app.get('/books', async (req, res) => {
    const data = await sql`
            SELECT b.*, u.name AS username
            FROM Books b
            INNER JOIN Users u ON b.userid = u.id
            WHERE b.statusId = '2'`;
        res.send(data);
})
   
app.get('/book/:id', async (req, res) => {
    const { id } = req.params
    const book = await sql`SELECT b.*, u.name AS username
    FROM Books b
    INNER JOIN Users u ON b.userid = u.id
    WHERE b.id = ${id}`
    res.send({ book: book[0] })
})

app.get('/myBooks/:id', async (req, res) => {
    const { id } = req.params
    const books = await sql`SELECT b.*, u.name AS username, s.status AS statusName
    FROM Books b
    INNER JOIN Users u ON b.userid = u.id
    INNER JOIN Statuses s ON b.statusid = s.id
    where userId = ${id}`
    res.send({ books })
})

app.get('/req',  async (req, res) => {
    const requests = await sql`select * from Books where statusId = '1'`
    res.send({ requests })
})

// изменение статуса книги
app.patch('/status',  async (req, res) => {
    const { id, statusId } = req.body
    const update = await sql`update Books set statusid = ${statusId} where id = ${id} returning *`
    res.send({ update })
})

const start = async() => {
await sql`create table if not exists Roles(  
    id serial primary key not null,
    role varchar(255) not null
)`
await sql`create table if not exists Statuses(
    id serial primary key not null,
    status varchar(255) not null
)`
await sql`create table if not exists Users(
    id serial primary key not null,
    name varchar(255) not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
    roleid int not null,
    foreign key (roleid) references Roles(id)
)`
await sql`create table if not exists Books(
    id serial primary key not null,
    title varchar(255) unique not null,
    date timestamp not null,
    descript varchar(1024) not null,  
    image varchar(255) not null,
    textfile varchar(255) not null,
    author varchar(255) not null,  
    userid int not null,
    statusid int not null,
    foreign key (userid) references Users(id),
    foreign key (statusid) references Statuses(id)
)`
//await sql`insert into Roles (role) values ('USER'), ('ADMIN')`
//await sql`insert into Statuses (status) values ('В ожидании'), ('Принят'), ('Отклонён')`

app.listen (5000, () =>{
    console.log("он работает на порту 5000");
})
}
start()