const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotnev= require("dotenv")
const pool= require("./config/db")

dotnev.config({path : "./config/config.env"})
const app = express();

// use this before any routes
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// home page
app.get("/", (req, res) => {
  res.json({ message: "Something great is happening here!!" });
});

// app.get("/check",(req,res)=>{

    
//         pool.query('SELECT * FROM users JOIN shortcuts ON users.username=shortcuts.username', (error, results) => {
//           if (error) {
//             throw error
//           }
//           res.status(200).json(results.rows)
//         })
      
// })

//routes for the app
app.use("/auth",require("./routes/login"))

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});