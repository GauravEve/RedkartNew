const express=require('express');
const cors = require('cors');
const connectDb=require("./config/db");
const api=require("./routes/api")
const app=express();

connectDb();
app.use(express.json({extended:false}));
app.use(cors({origin: true, credentials: true}));
app.use(api);

app.get('/',(req,res)=>res.send("Testing server"));
const port=process.env.PORT||5000;
app.listen(port,()=>console.log(`Server running on ${port}`));