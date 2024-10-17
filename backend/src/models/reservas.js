import mongoose from "mongoose";
const { model, models, Schema} = mongoose

const mongoSchema = new Schema({
  nome: {type: String},
  data: {type: Date, required: true},
  horarioEntrada: {type: String, required: true},
  horarioSaida: {type: String, required: true},
  numeroPessoas: {type: Number, required: true},
  descricao: {type: String, required: true},
  turma: {type: String, required: true},
  bloco: {type: String, required: true},

})

const Reserva = mongoose.models.Reserva || new model("Reserva", mongoSchema)

export default Reserva