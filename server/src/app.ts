import express from 'express';
import cors from 'cors';
// require('dotenv').config();

import userRoute from './routes/userRoute';
import questionRoute from './routes/questionRoute';

const app = express();
const port = process.env.PORT ||10000;

//built-in middleware for json
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type'],
  credentials: true,
}));


app.use('/user',userRoute);
app.use('/question', questionRoute);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
