import mongoose, { connect } from "mongoose";

const connectMongo = async () => {
    await mongoose.connect(process.env.URL).then((res) => {
        console.log("Conectado")
    })
}

export default connectMongo

