import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

import { router } from './Routes/nwankwoRoute.js'
import { asouzuRouter } from './Routes/asouzuRoute.js'
import { udorjiRouter } from './Routes/udorjiRoute.js'
import { okoliRouter } from './Routes/okoliRoute.js'
import { anyagaRouter } from './Routes/anyagaRoute.js'

dotenv.config();

const app = express();

// ✅ Apply middleware in correct order
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.onrender.com"
  ],
  methods: ["GET", "PUT", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json());

// ✅ Routes
app.use('/nwankwos', router);
app.use('/asouzus', asouzuRouter);
app.use('/udorjis', udorjiRouter);
app.use('/okolis', okoliRouter);
app.use('/anyagas', anyagaRouter);

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// ✅ Connect DB + start server
mongoose.connect(MONGOURL)
  .then(() => {
    console.log("Database is connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));



//NWANKWO API REQUESTS

// app.get("/nwankwos", async(req, res)=>{
//   console.log(req.body)
//   try {
//   const family = await Nwankwo.find()
//   console.log(family)
//   res.json(family);
//   } catch(err){
//     res.status(500).json({error: err.message});
//   }
// });
 

// app.post("/nwankwos", async(req, res) => {
//   console.log(req.body)
//   try{
//  const family = await Nwankwo.create(req.body);
//          res.status(200).json(family);
//   } catch(err){
//     res.status(400).json({error:err.message})
//   }    
//   });

//  app.get("/nwankwos/:id", async(req, res) => {
//   console.log({
//     requestParams: req.params,
//     requestQuery:req.query
//   });
//    try {
//         const {id} = req.params;
//         console.log(id)
//         const family = await Nwankwo.findById(id);
//         console.log(family)
//         if (! family) {
//            return res.status(404).json({message:"User not found"});
//          } else {
//             res.status(200).json(family);
//          }
        
//    } catch (error) {
//         res.status(500).json({ error: error.message});
//     }
// });

// app.put("/nwankwos/:id", async(req, res)=>{
//   try{
//  const familyId = req.params.id;
//   const family = await Nwankwo.findOneAndReplace({_id: familyId}, req.body, {new: true})
//   console.log(family);
//   res.json({family});
//   }catch(err) {
//     res.status(500).json({error:'Something went wrong'});
//   }
 
// });

// app.patch("/nwankwos/:id", async(req, res)=>{
//   try{
//  const familyId = req.params.id;
//   const family = await Nwankwo.findOneAndUpdate({_id: familyId}, req.body, {new: true})
//   console.log(family);
//   res.json({family});
//   }catch(err) {
//     res.status(500).json({error:'Something went wrong'});
//   }
 
// });

// app.delete("/nwankwos/:id", async(req, res)=>{
//     const familyId = req.params.id;
//     const family = await Nwankwo.deleteOne({_id: familyId})
//     res.json({deletedCount: family.delete});
    
// })

//  app.get("/nwankwos/:name", async(req, res)=>{
//   console.log(req.body)
//   try {
//   const family = await Nwankwo.findOne({"name":req.params.name});
//  // console.log(family)
//   res.json(family);
//   } catch(err){
//     res.status(500).json({error: err.message});
//   }
// });
 



//ASOUZU FAMILY APIs

// app.get("/asouzus", async(req, res)=>{
//   try {
//   const family = await Asouzu.find()
//   console.log(family)
//   res.json(family);
//   } catch(err){
//     res.status(500).json({error: err.message});
//   }
// });
 

// app.post("/asouzus", async(req, res) => {
//   console.log(req.body)
//   try{
//  const family = await Asouzu.create(req.body);
//          res.status(200).json(family);
//   } catch(err){
//     res.status(400).json({error:err.message})
//   }    
//   });

//  app.get("/asouzus/:id", async(req, res) => {
//   console.log({
//     requestParams: req.params,
//     requestQuery:req.query
//   });
//    try {
//         const {id} = req.params;
//         console.log(id)
//         const family = await Asouzu.findById(id);
//         console.log(family)
//         if (! family) {
//            return res.status(404).json({message:"User not found"});
//          } else {
//             res.status(200).json(family);
//          }
        
//    } catch (error) {
//         res.status(500).json({ error: error.message});
//     }
// });

// app.put("/asouzus/:id", async(req, res)=>{
//   try{
//  const familyId = req.params.id;
//   const family = await Asouzu.findOneAndReplace({_id: familyId}, req.body, {new: true})
//   console.log(family);
//   res.json({family});
//   }catch(err) {
//     res.status(500).json({error:'Something went wrong'});
//   }
 
// });

// app.patch("/asouzus/:id", async(req, res)=>{
//   try{
//  const familyId = req.params.id;
//   const family = await Asouzu.findOneAndUpdate({_id: familyId}, req.body, {new: true})
//   console.log(family);
//   res.json({family});
//   }catch(err) {
//     res.status(500).json({error:'Something went wrong'});
//   }
 
// });

// app.delete("/asouzus/:id", async(req, res)=>{
//     const familyId = req.params.id;
//     const family = await Asouzu.deleteOne({_id: familyId})
//     res.json({deletedCount: family.delete});
    
// })



// UDORJI API REQUESTS

// app.get("/udorjis", async(req, res)=>{
//   try {
//   const family = await Udorji.find()
//   console.log(family)
//   res.json(family);
//   } catch(err){
//     res.status(500).json({error: err.message});
//   }
// });
 

// app.post("/udorjis", async(req, res) => {
//   console.log(req.body)
//   try{
//  const family = await Udorji.create(req.body);
//          res.status(200).json(family);
//   } catch(err){
//     res.status(400).json({error:err.message})
//   }    
//   });

//  app.get("/udorjis/:id", async(req, res) => {
//   console.log({
//     requestParams: req.params,
//     requestQuery:req.query
//   });
//    try {
//         const {id} = req.params;
//         console.log(id)
//         const family = await Udorji.findById(id);
//         console.log(family)
//         if (! family) {
//            return res.status(404).json({message:"User not found"});
//          } else {
//             res.status(200).json(family);
//          }
        
//    } catch (error) {
//         res.status(500).json({ error: error.message});
//     }
// });

// app.put("/udorjis/:id", async(req, res)=>{
//   try{
//  const familyId = req.params.id;
//   const family = await Udorji.findOneAndReplace({_id: familyId}, req.body, {new: true})
//   console.log(family);
//   res.json({family});
//   }catch(err) {
//     res.status(500).json({error:'Something went wrong'});
//   }
 
// });

// app.patch("/udorjis/:id", async(req, res)=>{
//   try{
//  const familyId = req.params.id;
//   const family = await Udorji.findOneAndUpdate({_id: familyId}, req.body, {new: true})
//   console.log(family);
//   res.json({family});
//   }catch(err) {
//     res.status(500).json({error:'Something went wrong'});
//   }
 
// });

// app.delete("/udorjis/:id", async(req, res)=>{
//     const familyId = req.params.id;
//     const family = await Udorji.deleteOne({_id: familyId})
//     res.json({deletedCount: family.delete});
    
// })



// // OKOLI API REQUESTS
// app.get("/okolis", async(req, res)=>{
//   try {
//   const family = await Okoli.find()
//   console.log(family)
//   res.json(family);
//   } catch(err){
//     res.status(500).json({error: err.message});
//   }
// });
 

// app.post("/okolis", async(req, res) => {
//   console.log(req.body)
//   try{
//  const family = await Okoli.create(req.body);
//          res.status(200).json(family);
//   } catch(err){
//     res.status(400).json({error:err.message})
//   }    
//   });

//  app.get("/okolis/:id", async(req, res) => {
//   console.log({
//     requestParams: req.params,
//     requestQuery:req.query
//   });
//    try {
//         const {id} = req.params;
//         console.log(id)
//         const family = await Okoli.findById(id);
//         console.log(family)
//         if (! family) {
//            return res.status(404).json({message:"User not found"});
//          } else {
//             res.status(200).json(family);
//          }
        
//    } catch (error) {
//         res.status(500).json({ error: error.message});
//     }
// });

// app.put("/okolis/:id", async(req, res)=>{
//   try{
//  const familyId = req.params.id;
//   const family = await Okoli.findOneAndReplace({_id: familyId}, req.body, {new: true})
//   console.log(family);
//   res.json({family});
//   }catch(err) {
//     res.status(500).json({error:'Something went wrong'});
//   }
 
// });

// app.patch("/okolis/:id", async(req, res)=>{
//   try{
//  const familyId = req.params.id;
//   const family = await Okoli.findOneAndUpdate({_id: familyId}, req.body, {new: true})
//   console.log(family);
//   res.json({family});
//   }catch(err) {
//     res.status(500).json({error:'Something went wrong'});
//   }
 
// });

// app.delete("/okolis/:id", async(req, res)=>{
//     const familyId = req.params.id;
//     const family = await Okoli.deleteOne({_id: familyId})
//     res.json({deletedCount: family.delete});
    
// })



// // ANYAGA API REQUEST

// app.get("/anyagas", async(req, res)=>{
//   try {
//   const family = await Anyaga.find()
//   console.log(family)
//   res.json(family);
//   } catch(err){
//     res.status(500).json({error: err.message});
//   }
// });
 

// app.post("/anyagas", async(req, res) => {
//   console.log(req.body)
//   try{
//  const family = await Anyaga.create(req.body);
//          res.status(200).json(family);
//   } catch(err){
//     res.status(400).json({error:err.message})
//   }    
//   });

//  app.get("/anyagas/:id", async(req, res) => {
//   console.log({
//     requestParams: req.params,
//     requestQuery:req.query
//   });
//    try {
//         const {id} = req.params;
//         console.log(id)
//         const family = await Anyaga.findById(id);
//         console.log(family)
//         if (! family) {
//            return res.status(404).json({message:"User not found"});
//          } else {
//             res.status(200).json(family);
//          }
        
//    } catch (error) {
//         res.status(500).json({ error: error.message});
//     }
// });

// app.put("/anyagas/:id", async(req, res)=>{
//   try{
//  const familyId = req.params.id;
//   const family = await Anyaga.findOneAndReplace({_id: familyId}, req.body, {new: true})
//   console.log(family);
//   res.json({family});
//   }catch(err) {
//     res.status(500).json({error:'Something went wrong'});
//   }
 
// });

// app.patch("/anyagas/:id", async(req, res)=>{
//   try{
//  const familyId = req.params.id;
//   const family = await Anyaga.findOneAndUpdate({_id: familyId}, req.body, {new: true})
//   console.log(family);
//   res.json({family});
//   }catch(err) {
//     res.status(500).json({error:'Something went wrong'});
//   }
 
// });

// app.delete("/anyagas/:id", async(req, res)=>{
//     const familyId = req.params.id;
//     const family = await Anyaga.deleteOne({_id: familyId})
//     res.json({deletedCount: family.delete});
    
// })


// NOTES:

// *PUT request affects the whole data/document. use only when you want to change entire data fields/document
// *PATCH request updates only the desired field within the document/data

// create a folder and gitbash
//npm init -y for package.jason containing dependecies
//nodemon installation for fast reload- npm i nodemon -D
// express installation-npm i express
// open new file- index.js in backend folder
// type your programme in the file
// npm init -y for package.jason
//add server and dev in package.jason for start command
// run local host- npm run server. kill before each run command
//npm run dev as start command after nodemon
//use local host 6000 for postman without continous killing
//3m8UU3WB8XiPgUhF
//install mongodb
// install mongoose 
