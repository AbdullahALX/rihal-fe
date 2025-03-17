import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router.js';
import bodyParser from 'body-parser';

const app = express();
app.use(cors({ origin: '*' })); // Enable CORS for your frontend
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
