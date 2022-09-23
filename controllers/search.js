const  bcrypt  =  require("bcrypt");
const pool= require("../config/db")
const  jwt  =  require("jsonwebtoken");
const URL = require("url").URL;

exports.search=async (req,res)=>{
    const searchFilter=req.query.filter
    const username=req.userData.username
    const searchString=req.query.string
    //console.log(req.query.string)
    
    if(searchFilter=="s"){

        try{
            const allShortcuts= await pool.query(`SELECT * FROM shortcuts WHERE username=($1) ORDER BY shortlink;`,[username])
            res.send(allShortcuts.rows)
    
        }
        catch(err){
            res.send(err)
        }

    }
    else if(searchFilter=="d"){

        try{
            const allShortcuts= await pool.query(`SELECT * FROM shortcuts WHERE username=($1) ORDER BY description;`,[username])
            res.send(allShortcuts.rows)
    
        }
        catch(err){
            res.send(err)
        }

    }
    else{
        try{
            const allShortcuts= await pool.query(`SELECT * FROM shortcuts WHERE username=($1);`,[username])
            console.log("hello")
            res.send(allShortcuts.rows)

    }
    catch(err){
        res.send(err)
    }


    
    // if(searchString!=null ||searchString!=undefined){

    //     try{
    //         const allShortcuts= await pool.query(`SELECT * FROM shortcuts WHERE username=($1) AND description LIKE '(%$2)';`,[username,searchString])
    //         res.send(allShortcuts.rows)
    
    //     }
    //     catch(err){
    //         res.send(err)
    //     }

    // }
    
    }
    // const allShortcuts= await pool.query(`SELECT * FROM shortcuts WHERE username=($1) AND description LIKE ($2);`,[username,'%' + searchString])
    // console.log(allShortcuts.rows)
}
    //res.json({"msg":username})
