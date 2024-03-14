import express from 'express'
import mangaRouter from './routes/manga'
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
const PORT = process.env.PORT || 5000

app.use('/manga', mangaRouter)

app.get('/', (req, res)=>{
    res.json({
        message: 'ok'
    })
})

app.listen(PORT, ()=>{
    console.log('Running on port:', PORT)
})