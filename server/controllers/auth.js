import { sql } from "../db.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

export const auth = async(req, res) => {
    const { email, password } = req.body
    const user = await sql`select * from users where email = ${email}`
    if (!user || user.length === 0){
        return res.status(400).json({
            messaage: `пользователь не найден`
        })
    }
    const validPassword = bcrypt.compareSync( password, user[0].password)
    if (!validPassword){
        return res.status(400).json({
            messaage: `Введен неверный пароль`
        })
    }
    const token = generateToken(user[0].id, user[0].role)
    return res.json({
        token: token,
        user: user[0]
    })
}