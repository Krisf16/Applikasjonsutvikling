const express = require('express');
const router = express.Router();
const db = require("./db.js");
const user = {};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("./auth.js");

const secret = process.env.SUPER_FISHER || "ikke veldig sikkert";


//endpoint - list
router.get("/app/list", async function (request, respons, next) {

		let token = request.query.token;
	
		let userid = request.query.userid;
	
		console.log(userid);

		if (token) {

			try {

				let decoded = jwt.verify(token, secret);

				let query = `SELECT * FROM list WHERE userid = '${userid}' AND active = 1`;
				console.log(query);

				let result = await db.select(query);

				if (result) {

					respons.status(200).json(result.rows).end();
				} else {
				
					respons.status(500).send("something went wrong").end();
				}		

			} catch (err) {
				respons.status(402).send("ugyldig token").end();
			}


}
else {
	respons.status(402).send("no token").end();
}




});


router.post("/app/list", auth.validate, async function (request, respons, next) {



		try {

			//------------------
			let userid = request.body.userid;
			let ListInput = request.body.desc;
			let DatoInput = request.body.date;
			let active = request.body.active;
			

			let query = `INSERT INTO list (descr, date, userid, active) VALUES ('${ListInput}', '${DatoInput}', '${userid}', '${active}')`;
			
			
			console.log(query);

			let lister = await db.insert(query);

			if (lister) {
				//console.log("Created list")
				respons.status(200).json({
					msg: "List created successfully"
				}).end();
			} else {
				//console.log("error creating list")
				respons.status(500).json({
					msg: "Error creating list"
				}).end();
			}


			//------------

		} catch (err) {
			respons.status(401).end();
		}




});


//update
/*
router.post("/app/list", auth.validate, async function (request, respons, next) {

			try {

			
			let postid = request.body.id;
			let ListInput = request.body.desc;
			let DatoInput = request.body.date;
			

			let query = `UPDATE list SET descr = ('${ListInput}'), date = ('${DatoInput}') WHERE id = postid`;
			
			
			console.log(query);

			let lister = await db.update(query);

			if (lister) {
				//console.log("Created list")
				respons.status(200).json({
					msg: "List updated successfully"
				}).end();
			} else {
				//console.log("error creating list")
				respons.status(500).json({
					msg: "Error updating list"
				}).end();
			}


			//------------

		} catch (err) {
			respons.status(401).end();
		}




});
*/
//sletter post
/*
router.post("/app/post/delete", auth.validate, async function (request, respons, next) {

			try {

			
			let postid = request.body.postId;

			let query = `UPDATE list SET active = '0' WHERE id = '${postid}'`;
			
			
			console.log(query);

			let lister = await db.update(query);

			if (lister) {
				
				respons.status(200).json({
					msg: "List updated successfully"
				}).end();
			} else {
				respons.status(500).json({
					msg: "Error updating list"
				}).end();
			}


			//------------

		} catch (err) {
			respons.status(401).end();
		}




});

*/
module.exports = router;
