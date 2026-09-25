import dotenv from 'dotenv'
import app from './app.js'
import connectMongo from './config/db.js'

dotenv.config()
const PORT=process.env.PORT||5000

const server = async()=>{
    try {
        await connectMongo()
        app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
    } catch (err) {
        console.log('failed to start server:',err.message)
    }
}

server()