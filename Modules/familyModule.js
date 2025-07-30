import mongoose from "mongoose";

const FamilySchema = new mongoose.Schema({
  name:String,
  parents:String,
  generation:Number,
  position:String,
  spouse:String,
  offspring:Array
});
const Family = mongoose.model('nwankwos', FamilySchema)
module.exports = Family


