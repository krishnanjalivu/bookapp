import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookmodel.js"
import router from "./routes/bookroute.js";
import cors from 'cors';
const app=express();
app.use(express.json());

mongoose.connect(mongoDBURL)
.then(()=>{
console.log('app is connected to database')
app.listen(PORT,()=>
{
    console.log(`app is listening to port:${PORT}`);

});
})
.catch((error)=>{
console.log(error);
});

app.use(cors());
// app.use(
//     cors({
//         origin:["http://localhost:3000"],
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// )

app.get("/",(req,res)=>{   
    console.log("hello world");
    return res.status(234).send("Welcome to MERN Stack");
});
app.use('/books',router);

// app.listen(PORT,()=>
// {
//     console.log(`app is listening to port:${PORT}`);

// });
