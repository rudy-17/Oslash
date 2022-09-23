const  bcrypt  =  require("bcrypt");
const pool= require("../config/db")
const  jwt  =  require("jsonwebtoken");

exports.login=async (req,res)=>{
    const {username,password}=req.body
    console.log(username,password)
    try{

        const exists=await pool.query(`SELECT * FROM users WHERE username=$1;`,[username])
        const user=exists.rows

            if(exists.rows.length==0){res.json({"message":"wrong username"})}
            else{
                bcrypt.compare(password,user[0].password,(err,result)=>{
                    if(err){res.json({"message":"error while decrypting password"})}
                    else if(result==true){
                        const token=jwt.sign({username},process.env.SECRET_KEY,{expiresIn:"1d"})
                        const insertToken=pool.query(`INSERT INTO tokens (token) VALUES($1);`,[token])
                        res.json({"messages":"sign in successful","token":token})
                    }
                    else{
                        res.json({"message":"you have entered the wrong password"})
                    }
                })
                //res.json({"data":exists})
            }
        
        
    }
    catch(err){
        console.log(err)
    }
}