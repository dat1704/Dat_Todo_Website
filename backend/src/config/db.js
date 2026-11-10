import mongoose from "mongoose"

export const ConnectDB = async()=>{
    try {
        await mongoose.connect(
            process.env.MONGODB_CONNECTIONSTRING
        );
        console.log("Ket noi csdl thanh cong");
    } catch (error) {
        console.error("Khong the ket noi csdl:",error); 
        process.exit(1);
    }
};