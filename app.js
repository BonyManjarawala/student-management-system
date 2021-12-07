require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");
const { findOne, findOneAndDelete } = require("./models/student");

const studModel = require("./models/student");

mongoose
.connect(process.env.MONGOURL)
.then (() => console.log("mongo db connected"));

//Get List of all student
app.get('/', (req, res) => res.send('Hello Fullstack!'))

app.get("/data", async (req,res)=>{
  const studList = await studModel.find({},{ username: true});

  if(studList.length === 0){
    return res.json({ data: "no users in fullstack"});
  }

  return res.json({ data: studList});
});

// Add student
app.post("/addstudent",(req,res)=>{
  const { newStud } = req.body;
  const addNewStud = studModel.create(newStud);
  return res.json({ data: "Student added sucessfully!"});
});

//update student
app.put("/student/changename/:uname",(req,res)=>{
  const uname = req.params.uname;
  const pass = req.body.password;
  const updatedUser =  studModel.findOneAndUpdate(
    { username: uname},
    { password: pass },
    { new: true}
  );

  return res.json({ data:" Student name updated sucessfully"});
});

// Delete student

app.delete("/student/deletestudent/:uname", async(req,res)=>{
  const deletedUser = await studModel.findOneAndDelete({ 
    username: req.params.uname,
  });
  return res.json({ data: "Username deleted sucessfully"});
});

app.listen(port, () => console.log(`Server running  on port 5000!`));

