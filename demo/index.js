// import express from 'express';
// import axios from 'axios';

// const app = express();
// const PORT = process.env.PORT || 3000;
// const users = [];

// app.use(express.json());

// app.get('/', (req, res) =>{
//     res.send("Hello from server!")
// })

// app.get('/data', async (req, res) =>{
//     try{
//         const randomdata  = await axios.get('https://jsonplaceholder.typicode.com/posts');
//         res.status(201).json({message: "Data fetched successfully", data: randomdata.data.slice(0,5)});

//     }catch(err){
//         res.status(500).json({msg: "Error fetching data", data: err.msg});
//     }
    

// })


// app.post('/user', (req, res) =>{
//     const {id, name, email, age} = req.body;

//     if(!id || !name || !email || !age){
//         return res.status(400).json("Plz provide all credentials");
//     }

//     const newUser = {id, name, email, age};
//     users.push(newUser);

//     console.log(`Received data for : ${name}`);

//     res.status(201).json({
//         meg: "User create successfully",
//         user: {id, name, email, age}
//     })
    

// })



// app.get('/user', (req, res) =>{
//     try{
//         res.status(200).json({
//             msg:"User fetched",
//             data: users
//         })
        

//     }catch(err){
//         res.status(500).json({
//             msg: "Some Error",
//             data: err.msg
//         })
//     }
    

// })


// app.get('/user/:id', (req, res) =>{
//     try{
//         const {id} = req.params;
//         const user = users.find(u => u.id == id);

//         if(!user){
//             res.status(400).json({
//                 msg:"Usr not found"
//             })
//         }
        
//         res.status(200).json(user);

//     }catch(err){
//         res.status(500).json({
//             msg: "Some Error",
//             data: err.msg
//         })
//     }
    
// })


// app.put('/user/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, email, age } = req.body;
    
//     const index = users.findIndex(u => u.id == id);
//     if (index === -1) return res.status(404).json({ msg: "User not found" });

//     // Update the user at that index
//     users[index] = { ...users[index], name, email, age };
//     res.status(200).json({ msg: "User updated", user: users[index] });
// });





// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });




import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authroute.js";
import userRoutes from "./routes/userroute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
