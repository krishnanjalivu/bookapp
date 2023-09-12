import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookmodel.js"
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


app.get("/books",async(req,res)=>{
    try{
        const books = await Book.find({});
        return res.status(201).json(
            {
                count:books.length,
                data:books
            }
        );

    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
   
    // console.log("hello world");
    // return res.status(234).send("Welcome to MERN Stack")
});
app.get("/books/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const book = await Book.findById(id);
        return res.status(201).json(book
        );

    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
   
    // console.log("hello world");
    // return res.status(234).send("Welcome to MERN Stack")
});
app.post("/books",async(req,res)=>{
try{
    if(!req.body.title || !req.body.author || !req.body.publishYear)
    {
        return res.status(400).send({
            message:"Send all required fields:title,author,publishYear",
        });
    }
    const newBook={
        title:req.body.title,
        author:req.body.author,
        publishYear:req.body.publishYear,
    }
    const book=await Book.create(newBook);
    return res.status(201).send(book);
}
catch(error){
    console.log(error.message);
    res.status(500).send({message:error.message});
}
});
// app.listen(PORT,()=>
// {
//     console.log(`app is listening to port:${PORT}`);

// });
