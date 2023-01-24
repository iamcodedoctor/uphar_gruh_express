import mongoose from "mongoose"

mongoose.set('strictQuery', 'true')

const connectToDatabase = async (uri) => {
    try {
        const connect = await mongoose.connect(uri);
        console.log(`Connected to mongoDb at ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToDatabase;