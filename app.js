const express = require('express');

const mongoose = require('mongoose');

const port = 3000;

const mongoURL="mongodb://localhost:27017/usersdb"

const app=express();

app.use(express.json());

mongoose.connect(mongoURL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Connected to Db"))
.catch(()=> console.error("Mongo Db connection error",err));

const userSchema= new mongoose.Schema({
    name:{type:String ,required:true},
    age:{type:String,required:true}
})


const User=mongoose.model('User',userSchema);

app.get('/',async (req,res)=>{
    try{
        const users=await User.find();
        res.json(users);
    }
    catch(error){
        res.status(404).json({message:error});
    }
});

app.post('/',async(req,res)=>{
    const user=new User(req.body);
    const savedUser=await user.save();
    res.json(savedUser);
});

app.get('/:id',async(req,res)=>{
    const user=await User.findById(req.params.id);
    res.json(user);
})
app.put('/:id',async(req,res)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body);
    res.json(user);
})

app.delete('/:id',async(req,res)=>{
    const user=await User.findByIdAndDelete(req.params.id);
    res.json(user);
})

app.listen(port);