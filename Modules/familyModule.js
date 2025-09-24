import mongoose from "mongoose";

const FamilySchema = new mongoose.Schema({
  surname: {
       type: String,
       required: true,
  },

   firstName: {
         type: String,
         required: true,
  },

   middleName: {
        type: String,
        required: true,
  },

   userName: {
       type: String,
       required: true,
  },

   password: {
       type: String,
       required: true,
  },

  dateOfBirth: {
       type: String,
       required: false,
  },

   parents: {
       type: String,
       required: true,
  },

   familyStatus: {
       type: String,
       required: true,
  },

   generation: {
       type: String,
       required: true,
  },

   spouse: {
       type: String,
       required:false,
  },

   cityOfResidence: {
        type: String,
        required: true,
  },

  offspring: {
        type: Array,
        required: false,
  },
  
  image: {
        type: String,
        required: false 
}
});
export const Family = mongoose.model('families', FamilySchema)
// module.exports = Family

