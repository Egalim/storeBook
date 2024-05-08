import { sql } from "../db.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

export const reg = async (req, res) => {
    const { name, email, password } = req.body

    const candidate = await sql`select * from Users where email = ${email}`

    if (candidate[0]) {
        res.status(400).send({
            message: "Пользовательуже существует"
        })
    }
 else {
        const hashPassword = bcrypt.hashSync(password, 7)
        const userResult = await sql`insert into Users (name, email, password, roleid) values (${name}, ${email}, ${hashPassword}, 1) returning id`;
        const user = userResult[0];

        if (!user || !user.id) {
            res.status(500).send({
                message: "Не удалось получить id созданного пользователя"
            });
            return;
        }

        const token = generateToken(user.id, user.role)
        res.send({
            message: "Пользователь успешно зарегистрирован",
            user: user,
            token: token
        });
    }
} 