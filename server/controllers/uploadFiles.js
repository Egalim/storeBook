import { sql } from "../db.js";

export async function uploadFile(req, res) {
    try {
        const { title, descript, userid, author } = req.body;


        console.log(req.files);
        const imageFile = req.files['image'][0].filename; 
        const textFile = req.files['textfile'][0].filename;

        if (!title || !descript || !userid || !author || !imageFile || !textFile) {
            throw new Error('Один или несколько параметров имеют значение undefined');
        }
        const date = new Date();

        const data = await sql`
            INSERT INTO Books (title, date, descript, image, textfile, author, userid, statusid)
            VALUES (${title}, ${date}, ${descript}, ${imageFile}, ${textFile}, ${author}, ${userid}, 2)
            RETURNING *;
        `;
        // console.log(title, descript, userid, author, imageFile, textFile);

        res.send(data);
    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
        res.status(500).send('Ошибка при добавлении данных: ' + error.message);
    }
}