import mongoose from "mongoose";

const AnyagaSchema = new mongoose.Schema({
  name:String,
  parents:String,
  familyStatus:String,
  generation:Number,
  position:String,
  spouse:String,
  offspring:Array,
  residence:String
});
export const Anyaga = mongoose.model('anyagas',AnyagaSchema)

