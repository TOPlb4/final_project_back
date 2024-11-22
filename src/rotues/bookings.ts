import { Request, Response, Router } from "express"
import prisma from '../prisma'
import { verifyJwt } from "../middleware/verifyJwt"

const router = Router()

router.get("/", verifyJwt, async (req: Request, res: Response) => {
    try{
        const booking = await prisma.bookings.findMany({
            orderBy: {
                id: "asc"
            }
        })
        res.status(200).json({ status:"OK",data:booking })
    }catch(error){
        res.status(500).json({ status:"ERROR",message:error })
    }
})
router.post("/", verifyJwt, async(req: Request, res:Response)=>{
    try{
        const{ total_price_,room_id,status,check_in_date,check_out_date,customer_phone,customer_name } = req.body
        const newRoom = await prisma.bookings.create({
            data: {
                total_price_: total_price_ ,
                room_id: Number(room_id),
                check_in_date: check_in_date ,
                check_out_date: check_out_date,
                customer_phone: customer_phone,
                customer_name:customer_name,
                status: status
            }
        })
        res.status(201).json({ status:"OK", data:newRoom })
    }catch (error){
        
        // @ts-ignore
        console.log(error.message)
        res.status(500).json({ status:("ERROR"),message:error })
    }
})

router.post("/:id", verifyJwt, async (req: Request, res: Response) => {
    const { id } = req.params
    const{  total_price_,room_id,status,check_in_date,check_out_date,customer_phone,customer_name} = req.body

    try {
        const updateData: Record<string, any> = {}
        if (total_price_) updateData.total_price_ = total_price_
        if (room_id) updateData.room_id = Number(room_id)
        if (check_in_date) updateData.check_in_date = check_in_date
        if (check_out_date) updateData.check_out_date = check_out_date
        if (customer_phone) updateData.customer_phone = customer_phone
        if (customer_name) updateData.customer_name = customer_name
        if (status) updateData.status = status

        if (Object.keys(updateData).length === 0) {
            res.status(400).json({ status: "ERROR", message: "No fields to update." })
        }

        const updateRoom = await prisma.bookings.update({
            where: { id: Number(id) },
            data: updateData
        })

        res.status(200).json({ status: "OK", data: updateRoom })

    } catch (error) {
        res.status(500).json({ status: "ERROR", message: error })
    }
})

router.delete("/:id", verifyJwt, async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const deleteRoom = await prisma.bookings.delete({
            where: { id: Number(id) }
        })
        
        res.status(200).json({ status: "OK", data: deleteRoom })

    } catch (error) {
        res.status(500).json({ status: "ERR", message: error })
    }
})


export default router