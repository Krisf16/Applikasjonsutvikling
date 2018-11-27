const express = require('express');
const router = express.Router();
const db = require("./db.js");
const user = {};
const bcrypt = require('bcrypt');



//endpoint - list users
router.get("/app/user", async function (request, respons, next) {

	let query = `SELECT * FROM user2`;

	let result = await db.select(query);

	if (result) {

		respons.status(200).json(result.rows).end();
	} else {
		respons.status(500).send("Something went wrong").end();
	}

	respons.status(200).send("hallo").end();

});


router.post("/app/user", async function (request, respons, next) {


	let username = request.body.name;
	let email = request.body.email;
	let password = request.body.password;
	let role = 42;

	let hash = bcrypt.hashSync(password, 10);	

	let query = `INSERT INTO user2 (role, email, username, hash) 
        VALUES ('${role}','${email}', '${username}', '${hash}')`;

	let user = await db.insert(query);


	if (user) {
		respons.status(200).json({
			msg: "User created successfully"
		}).end();
	} else {
		respons.status(500).json({
			msg: "Error creating user"
		}).end();
	}


});


module.exports = router;
