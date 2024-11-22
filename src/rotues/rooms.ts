import { Request, Response, Router } from "express"
import prisma from '../prisma'
import { verifyJwt } from "../middleware/verifyJwt"

const router = Router()

router.get("/", verifyJwt, async (req: Request, res: Response) => {
    try {
        const rooms = await prisma.rooms.findMany({
            orderBy: {
                id: "asc"
            }
        })
        res.status(200).json({ status: "OK", data: rooms })
    } catch (error) {
        res.status(500).json({ status: "ERR", message: error })
    }
})

router.post("/", verifyJwt, async (req: Request, res: Response) => {
    try {
        const { room_number, type, price } = req.body
        const newRoom = await prisma.rooms.create({
            data: {
                room_number: room_number,
                type: type,
                price: price
            }
        })
        res.status(201).json({ status: "OK", data: newRoom })
    } catch (error) {
        res.status(500).json({ status: "ERR", message: error })
    }
})

router.post("/:id", verifyJwt, async (req: Request, res: Response) => {
    const { id } = req.params
    const { room_number, type, price, status } = req.body

    try {
        const updateData: Record<string, any> = {}
        if (room_number) updateData.room_number = room_number
        if (type) updateData.type = type
        if (price) updateData.price = Number(price)
        if (status) updateData.status = status

        if (Object.keys(updateData).length === 0) {
            res.status(400).json({ status: "ERR", message: "No fields to update." })
        }

        const updateRoom = await prisma.rooms.update({
            where: { id: Number(id) },
            data: updateData
        })

        res.status(200).json({ status: "OK", data: updateRoom })

    } catch (error) {
        res.status(500).json({ status: "ERR", message: error })
    }
})

router.delete("/:id", verifyJwt, async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const deleteRoom = await prisma.rooms.delete({
            where: { id: Number(id) }
        })
        
        res.status(200).json({ status: "OK", data: deleteRoom })

    } catch (error) {
        res.status(500).json({ status: "ERR", message: error })
    }
})

export default router