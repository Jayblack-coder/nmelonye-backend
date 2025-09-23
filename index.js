import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors"
import bodyParser from 'body-parser';

import { router } from './Routes/nwankwoRoute.js';
import { asouzuRouter } from './Routes/asouzuRoute.js';
import { udorjiRouter } from './Routes/udorjiRoute.js';
import { okoliRouter } from './Routes/okoliRoute.js';
import { anyagaRouter } from './Routes/anyagaRoute.js';
import { familyRouter } from './Routes/familyRoute.js';

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(bodyParser.json());

// ✅ CORS setup

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nmelonye-family.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


// ✅ Handle preflight for all routes


// ✅ Routes
app.use('/nwankwos', router);
app.use('/asouzus', asouzuRouter);
app.use('/udorjis', udorjiRouter);
app.use('/okolis', okoliRouter);
app.use('/anyagas', anyagaRouter);
app.use('/api/user', familyRouter);

// ✅ Server + DB
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("❌ DB Connection Error:", error));
