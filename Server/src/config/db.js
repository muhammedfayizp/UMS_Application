import mongoose from "mongoose";

const connectMongo = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        // await seed()
        console.log('MongoDB connected')
    } catch (error) {
        console.error(`Database connection failed: ${error.message}`);
    }
}
export default connectMongo