import mongoose from "mongoose";


async function DBconnection(url){
    return mongoose.connect(url)
}

export default  DBconnection;