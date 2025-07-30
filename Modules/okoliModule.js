import mongoose from "mongoose";

const OkoliSchema = new mongoose.Schema({
  name:String,
  parents:String,
  generation:Number,
  position:String,
  spouse:String,
  offspring:Array
});
export const Okoli = mongoose.model('okolis',OkoliSchema)

