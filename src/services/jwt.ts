import jwt, { JwtPayload } from "jsonwebtoken"

const secret = process.env.JWT_SECRET ?? ""
const expires = process.env.JWT_EXPIRES ?? ""

export const generateToken = async (payload:{ user_name:string }): Promise<string> => {
    console.log(expires)
    return new Promise(( resolve,reject )=>{
        jwt.sign(payload, secret, { expiresIn: expires }, (err,token) => {
            if (err) {
                reject(err)
            } else if (token) {
                resolve(token)
            } else {
                reject(new Error('Token generateion failed.'))
            }
        })
    })
}

export const verifyToken = async (token: string): Promise<JwtPayload | string> => {
    return new Promise(( resolve, reject ) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded!)
            }
        })
    })
}