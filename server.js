import connectDB from './config/db.js';
import express from 'express'

import dotenv  from 'dotenv'

import cors from 'cors';
import portfolioRouter from './routes/portfolio.js';
import loginRouter from './routes/login.js';
import categoryRouter from './routes/category.js';


dotenv.config();
const app = express();


connectDB();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());



app.use('/portfolio', portfolioRouter);
app.use('/admin', loginRouter);
app.use('/category', categoryRouter);


app.use('*/images',express.static('images'));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})