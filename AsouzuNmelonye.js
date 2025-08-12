const mongoose = require("mongoose")

const asouzuNmelonyeSchema = mongoose.Schema ({
name:{
    type: String,
    required: true
},
surname:{
    type: String,
    required: true
},

status:{
    type: String,
    required: true
},
parents:{
    type: String,
    required: true
},
generation:{
    type: Number,
    required: true
},
position:{
    type:String,
    required: true
},
spouse:{
    type: String,
    required: false
},
cityOfResidence:{
    type: String,
    required: true
},
address:{
    type: String,
    required: true
},
offspring:{
    type:[],
    required: false
}
})

const asouzuNmelonye = mongoose.model('asouzunmelonye', asouzuNmelonyeSchema)
module.exports = asouzuNmelonye

