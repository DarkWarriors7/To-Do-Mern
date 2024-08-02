const express=require('express');
const app=express();
require('dotenv').config();

require("./mongoConn/connection")
const auth=require('./routes/auth')
const list=require('./routes/list')
const cors=require('cors')


app.use(express.json());
app.use(cors());

app.use("/api/v1",auth)
app.use("/api/v2",list)

app.listen(process.env.PORT,()=>{
    console.log("Server started");
})