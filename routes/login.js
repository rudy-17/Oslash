const express = require('express');
const router = express.Router();
const validation=require("../middlewares/auth")
const loggedIn=require("../middlewares/login")

const {register} = require("../controllers/register");
const {login} = require("../controllers/login");
const {addShortcuts}=require("../controllers/shortcuts")
const {search}=require("../controllers/search")
const {deletee}=require("../controllers/delete")
const {logout}=require("../controllers/logout")

router.post('/register', register); //POST request to register the user
router.post('/login' , login); // POST request to login the user
router.post('/shortcuts',loggedIn.isLoggedIn,addShortcuts)
router.get('/search',loggedIn.isLoggedIn,search)
router.get('/delete',loggedIn.isLoggedIn,deletee)
router.get('/logout',loggedIn.isLoggedIn,logout)

module.exports = router;


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjM4NDA0MjksImV4cCI6MTY2Mzg0MTAyOX0.vVQ0ohxVzhWbVP24jtyuT46ehz2Mi-e3S0BiLT4_Bm4
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjM4NDA4ODksImV4cCI6MTY2MzkyNzI4OX0.YVYalZIfyENawB3ez9oeVXOxB6dHH4wy2rcg6ihzSUc