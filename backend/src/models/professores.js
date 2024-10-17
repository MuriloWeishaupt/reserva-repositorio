import mongoose from "mongoose"

const professorSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    ra: {type: String, required: true, unique: true}
})

const Professor = mongoose.model("Professor", professorSchema)

export default Professor