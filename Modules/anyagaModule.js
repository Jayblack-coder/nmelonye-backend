import mongoose from "mongoose";

const AnyagaSchema = new mongoose.Schema({
  name:String,
  parents:String,
  generation:Number,
  position:String,
  spouse:String,
  offspring:Array
});
export const Anyaga = mongoose.model('anyagas',AnyagaSchema)

