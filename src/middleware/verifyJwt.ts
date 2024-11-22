import { NextFunction, Request, Response } from "express";
// import { verifyToken } from "../services/jwt";
import jwt from 'jsonwebtoken'

export const verifyJwt = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ status: "ERR", message: "Missing Token." })
    }

    const token = authHeader?.split(' ')[1] ?? ""
    const secret = process.env.JWT_SECRET ?? ""

    try {
        jwt.verify(token, secret)
        next()
    } catch (error) {
        // @ts-ignore
        console.log(error)
        res.status(401).json({ status: "ERR", message: "Invalid or expored token." })
    }
} 