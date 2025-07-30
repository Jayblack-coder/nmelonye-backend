import mongoose from "mongoose";

const AsouzuSchema = new mongoose.Schema({
  name:String,
  parents:String,
  generation:Number,
  position:String,
  spouse:String,
  offspring:Array
});
export const Asouzu = mongoose.model('asouzus',AsouzuSchema)
//module.exports = Asouzu
