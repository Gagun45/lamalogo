import mongoose from "mongoose"

const connection = {}

export const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log('Using existing connection')
            return
        }
        const db = await mongoose.connect(process.env.MONGODB)
        connection.isConnected = db.connections[0].readyState
    }
    catch (err) {
        console.log(err)
        throw new Error(err)
    }
}