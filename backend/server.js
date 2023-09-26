require('dotenv').config();
const express = require('express');
const app = express();
const port = parseInt(process.env.PORT);
const adminRouter = require('./routers/admin');
const userRouter = require('./routers/user');
const dbconnection = require('./database');
const errorHandler = require('./middleware/errorHandler');
const cors = require("cors");
const cookieParser = require('cookie-parser')

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/admin',adminRouter);
app.use('/user',userRouter);


app.use(errorHandler);

dbconnection();

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})