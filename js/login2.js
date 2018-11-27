const express = require('express');
const router = express.Router();
const db = require("./db.js");
const user = {};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.SUPER_FISHER || "ikke veldig sikkert";

router.get("/app/auth", async function (request, respons, next) {

	console.log("Authentication request recived");
	let authorizationHeader = request.headers['authorization'];

	if (!authorizationHeader) {
		console.log("Missing authentication header, ending request");
		respons.status(401).end();
	} else {
		let credentials = authorizationHeader.split(' ')[1];

		let rawData = Buffer.from(credentials, 'base64');

		credentials = rawData.toLocaleString().split(":");

		console.log(`authenticate : ${credentials[0]}`);

		let username = credentials[0].trim();
		let password = credentials[1].trim();

		console.log(username, password);

		let sql = `SELECT * FROM user2 WHERE username = '${username}'`;
		console.log(sql)

		let result = await db.select(sql);
		let numberOfRows = result.rows.length;

		console.log("nomrows", numberOfRows);
		if (numberOfRows > 0) {
			console.log("riktig brukernavn");
			
			

			let hash = result.rows[0].hash;
			
			console.log(hash, password);
			
			let validuser = bcrypt.compareSync(password, hash);

			if (validuser) {
				
				let payload = {
					user: username
				};

				let tok = jwt.sign(payload, secret);
				
				let downloaddata = {
					token:tok,
					userdata: result.rows[0]
				}

				respons.status(200).send(downloaddata).end();
			}
			
			else {
				respons.status(401).send("wrong password").end();
			}



		}
		else {
			respons.status(401).send("not a valid user").end();
		}


	}


});

module.exports = router;