const  bcrypt  =  require("bcrypt");
const pool= require("../config/db")

const auth = require("../middlewares/auth");
const URL = require("url").URL;

const jwt = require("jsonwebtoken");
module.exports={
isLoggedIn: async (req, res, next) => {
    let flag=0
    const allTokens=await pool.query(`SELECT * FROM tokens;`)
    for(let i=0;i<allTokens.rows.length;i++){
       if(allTokens.rows[i].token==req.headers.authorization.split(' ')[1]){
        flag=1
       }
    }
    if(flag==1)
    {

      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
          token,
          'queen'
        );
        req.userData = decoded;
        //console.log(req.userData)
        next();
      } catch (err) {
      
      }

      
    }
    else{
      res.json({"message":"session is invalid"})
    }
   
  }
}