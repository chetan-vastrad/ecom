import mongoose from "mongoose";

const connectToDB = async () =>{
    console.log("test")
    try {
         await mongoose.connect(process.env.MONGO_URI)
            console.log("DB is connected");
    } catch (error) {
        console.log(`Db not Connectd`);
        
    }
}
export default connectToDB;

