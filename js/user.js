const express = require('express');
const router = express.Router();
const db = require("./db.js");
const user = {};

router.post("/app/user", function(request,respons,next){
    
    let username = request.body.username;
    let email = request.body.email;
    let password = request.body.password;
    
    let query = `INSERT INTO "public"."User" ( "email", "username", "hash") 
        VALUES ('${email}', '${username}', '${password}') RETURNING "id", "email", "username", "hash"`
    
    
    let user = db.insert(query);
    if(user != null){
        console.log("Created user")
        respons.status(200).send(user).end();
    }
    else{
        console.log("error creating user")
        respons.status(500).send("Error creating user").end();
    }
  
 
});


module.exports = router;