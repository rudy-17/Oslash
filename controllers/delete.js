const  bcrypt  =  require("bcrypt");
const pool= require("../config/db")
const  jwt  =  require("jsonwebtoken");
const URL = require("url").URL;


exports.deletee=async (req,res)=>{
    const shortlink=req.body.shortlink
    console.log(shortlink)
    try{
        const deletedRows= await pool.query(`DELETE FROM shortcuts WHERE shortlink=($1) AND username=($2);`,[shortlink,req.userData.username])
        console.log(deletedRows.rowCount)
        if(deletedRows.rowCount>=1){
            res.json({"message":"shortcut deleted successfully"})
        }
        else if(deletedRows.rowCount==0){
            res.json({"message":"shortcut enetred is invalid or you are not logged in"})
        }

    }
    catch(err){
        res.send(err)
    }
    //res.send("deleteing")
}