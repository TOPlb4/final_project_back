import { Request, Response, Router } from "express";
import prisma from "../prisma";
import  bcrypt from"bcryptjs";
import { generateToken } from '../services/jwt'
const router = Router()

router.post("/register",async(req:Request,res:Response)=>{
    try{
        const { user_name,email,password } = req.body

        const duplicate_check = await prisma.users.findFirst({
            where:{
                user_name:user_name
            }
        })

        if(user_name == duplicate_check?.user_name){
            res.status(400).json({ status:"ERR", message:"duplicate user" })
        } else {
            const salt =  bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password,salt)
            await prisma.users.create({
                data:{
                    user_name:user_name,
                    email:email,
                    password:hash
                }
            })
            res.status(200).json({ status:"OK", message:"Succse"})
        }

    }catch (error){
        res.status(500).json({ status:("ERROR") ,message:error })
    }
})

router.post("/login",async(req:Request,res:Response)=>{
    try{
        const { user_name,password } = req.body
        const findUser = await prisma.users.findFirst({
            where:{
                user_name:user_name
            }
        })
        if(findUser){
            const comparePassword = bcrypt.compareSync(password,findUser.password ?? "")
            if (comparePassword){
                const token = await generateToken({ user_name: findUser.user_name ?? "" })
                res.status(200).json({status:"OK",messagae:"Success", data: { token: token }})
            }
            else{
                res.status(401).json({status:"ERR",message:"Wrong Password"})
            }
        }else{
            res.status(400).json({status:"ERR",message:"User not found"})
        }
    } catch (error) {
        res.status(500).json({ status:"ERR",message:error })
    }
})




export default router