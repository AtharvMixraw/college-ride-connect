import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Connected to the database")
    } catch (err) {
        console.log(err)
    }
}

export default connectDB