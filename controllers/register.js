const  bcrypt  =  require("bcrypt");

//const  client  =  require("../configs/database");
const pool= require("../config/db")
const  jwt  =  require("jsonwebtoken");
const validation=require("../middlewares/auth")

console.log("helloooo")
exports.register=async (req,res)=>{
    console.log("hello")
    const {username,email,password}=req.body
    console.log("inside register")
        
    try{
        //const result= pool.query(`INSERT INTO users (username) VALUES ($1,$2,$3);`,[req.body.username,req.body.email,req.body.password])
        const data=await  pool.query(`SELECT * FROM users WHERE email=$1;`,[email])
        if(data.rows.length!=0){
            res.json({"message":"email already exists in the database"})
        }
        else{
            bcrypt.hash(password,10,async (err,hash)=>{
                if(err){res.json({"error":"error on our side"})}
                else{
                    const user={
                        username,email,password:hash
                    }
                    const result=await pool.query(`INSERT INTO users (username,email,password) VALUES ($1,$2,$3);`,[user.username,user.email,user.password],(err)=>{
                        if(err){res.json({"message":"error while writing into database",err})}
                        else{
                            res.json({"messaged":"registered successfully"})
                        }
                    })
                }

            })
        }

    }
    catch(err){
        console.log(err)
    }
}