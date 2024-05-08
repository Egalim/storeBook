import jwt from "jsonwebtoken"

export const generateToken = (id, role) =>{
    const payload ={
        id,
        role
    }
    return jwt.sign(payload, "KEY", {expiresIn: "24h"})
}