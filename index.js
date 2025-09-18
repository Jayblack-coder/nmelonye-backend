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
import { familyRouter } from './Routes/familyRoute.js'

dotenv.config();

const app = express();

// ✅ Apply middleware in correct order
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://nmelonye-family.vercel.app"
  ],
  methods: ["GET", "PUT", "POST", "OPTIONS"],
  credentials: true,
}));



// ✅ Routes
app.use('/nwankwos', router);
app.use('/asouzus', asouzuRouter);
app.use('/udorjis', udorjiRouter);
app.use('/okolis', okoliRouter);
app.use('/anyagas', anyagaRouter);
app.use('/api/user', familyRouter);

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
