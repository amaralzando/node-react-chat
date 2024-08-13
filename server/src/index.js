import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes.js';

config();

const app = express();
const port = process.env.PORT || 3333;
const uri = process.env.ATLAS_URI;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => console.log(`Server running on port ${port}...`));

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connection established")).catch((err) => console.error("MongoDB error", err.message));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
