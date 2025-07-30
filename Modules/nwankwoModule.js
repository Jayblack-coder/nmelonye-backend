import mongoose from "mongoose";

const NwankwoSchema = new mongoose.Schema({
  name:String,
  parents:String,
  generation:Number,
  position:String,
  spouse:String,
  offspring:Array
});
export const Nwankwo = mongoose.model('nwankwos', NwankwoSchema)
//module.exports = Nwankwo
