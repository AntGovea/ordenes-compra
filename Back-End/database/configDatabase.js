const sql = require('mssql');
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}
async function getConnection() {
    try {
        pool = await sql.connect(sqlConfig);
        // console.log('Conexión establecida con la base de datos');
        return pool;
    } catch (err) {
        console.log(err)
    }
}

module.exports = getConnection;


