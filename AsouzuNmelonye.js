const mongoose = require("mongoose")

const asouzuNmelonyeSchema = mongoose.Schema ({
name:{
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
offspring:{
    type:[],
    required: false
}
})

const asouzuNmelonye = mongoose.model('asouzunmelonye', asouzuNmelonyeSchema)
module.exports = asouzuNmelonye

// NEW CONNECTION STRING for my cluster
// mongodb+srv://Ejike:<db_password>@cluster0.z2aji.mongodb.net/