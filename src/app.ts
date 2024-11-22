import express, { Request, Response } from 'express'
import rooms from './rotues/rooms'
import  bookings  from './rotues/bookings'
import  auth  from './rotues/auth'
import cors from 'cors'

const app = express()

app.use((express.json()))
app.use(cors({ origin: '*' }))
app.use("/api/rooms", rooms)
app.use("/api/booking",bookings)
app.use("/api/auth",auth)


app.get("/", (req: Request, res: Response) => {
    res.status(200).send("OK")
})

app.listen(4000, () => {
    console.log("Server is running at http://localhost:3000")
})