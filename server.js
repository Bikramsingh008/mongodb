const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express();

app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/students')
const db = mongoose.connection
db.once('open', ()=>{
    console.log("Mongodb connection successful");
})

const userSchema = new mongoose.Schema({
    Username: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
});


const users = mongoose.model("studentsInfo", userSchema);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/post', async (req, res) => {
    try {
        console.log(req.body); // Log the received data
        const { Username, Email, Password } = req.body;
        const user = new users({ Username, Email, Password });
        await user.save();
        console.log(user);
        res.send("Registration successful");
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("An error occurred while saving the user.");
    }
});




app.listen(port,()=>{
    console.log("server started")
})

