import mongoose from "mongoose";

const UdorjiSchema = new mongoose.Schema({
  name:String,
  parents:String,
  generation:Number,
  position:String,
  spouse:String,
  offspring:Array
});
export const Udorji = mongoose.model('udorjis',UdorjiSchema)
//module.exports = Udorji
