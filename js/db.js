
const { Pool, Client } = require('pg');
const connectionString = process.env.DATABASE_URL;


const db = {}


async function runQuery() {
    let respons = null;
    const client = new Client({
        connectionString: connectionString,
        ssl: true
    })

    try {
        await client.connect()
        await client.query(query).then(res => {
            console.log(err, res)
            respons = res.rows
        }).catch(err => {
            /*oops*/
        })
        await client.end()
    } catch (e) { /*OOPS*/ }

    return respons;
}




db.select =async function (query) {
    return await runQuery(query);
}

db.delete = async function (query) {
   
    return runQuery(query);
}

db.update = async function (query) {
    return runQuery(query);

}
module.exports = {};
