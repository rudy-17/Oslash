const  bcrypt  =  require("bcrypt");
const pool= require("../config/db")
const  jwt  =  require("jsonwebtoken");
const auth = require("../middlewares/auth");
const URL = require("url").URL;


exports.logout=async (req,res)=>{
    const authHeader = req.headers["authorization"];
    console.log(authHeader)
    let flag=0
    let check=0
    const allTokens=await pool.query(`SELECT * FROM tokens;`)
    for(let i=0;i<allTokens.rows.length;i++){
        check=authHeader.search(allTokens.rows[i].token)
        if(check!=-1){
            const deletee= await pool.query(`DELETE FROM tokens WHERE token=($1);`,[allTokens.rows[i].token],(err,result)=>{
                if(err){res.json({"message":err})}
                else{res.json({"message":"You have been logged out successfully"})}
            })
        }

    }
    
    //console.log(allTokens.rows[0].token)
    // jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
    //     if (logout) {
    //     res.send({msg : 'You have been Logged Out' });
    //     } else {
    //     res.send({msg:'Error'});
    //     }
    //     });

    //res.send(authHeader)
}