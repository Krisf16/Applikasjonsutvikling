const express = require('express');
const router = express.Router();
const db = require("./db.js");
const user = {};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.SUPER_FISHER || "ikke veldig sikkert";

function validatetoken(request, respons, next){
	let token = request.query.token;
	
	try{
		let decodedToken = jwt.verify(token, secret);
		request.token = decodedToken;
		next();
	} catch(err){
		respons.status(401).end();
	}
}

router.get("/app/quote", validatetoken, async function (request, respons, next){
	log(`request token ${request.token}`);
	let quote = "Dette er en quote";
	
	respons.status(200).json({
		quote: quote
	});
}); 

	

module.exports = {router:router, validate:validatetoken};
