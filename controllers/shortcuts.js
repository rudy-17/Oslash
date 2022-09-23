const  bcrypt  =  require("bcrypt");
const pool= require("../config/db")
const  jwt  =  require("jsonwebtoken");
const URL = require("url").URL;


//to check if the url is valid or not


const stringIsAValidUrl = (s) => {
    try {
      new URL(s);
      return true;
    } catch (err) {
      return false;
    }
  };

exports.addShortcuts=async (req,res)=>{
    console.log(req.userData)
   try{
    const check= await pool.query(`SELECT * FROM shortcuts WHERE shortlink=$1;`,[req.body.shortlink])
    if(check.rows.length==0 && stringIsAValidUrl(req.body.url)){


        const add= await pool.query(`INSERT INTO shortcuts (shortlink,description,url,tags,username) VALUES ($1,$2,$3,$4,$5);`,[req.body.shortlink,req.body.description,req.body.url,req.body.tags,req.userData.username],(err,result)=>{
            if(err){console.log(err),res.json({"error":err})}
            else{
                console.log(req.userData.username)
                res.json({"message":"shortcut added successfully"})
            }
        })
    }
    else{
        if(!stringIsAValidUrl(req.body.url)){
            res.json({"message":"the url is invalid , please enter a valid url"})
        }
        else{
        res.json({"message":"the shortlink has beend added by you and is not unique. be creative and give a great shortlink"})
        }
    }
   }
    catch(err){
        res.json({"error":err})
    }
    //res.json({"message":req.userData})
}