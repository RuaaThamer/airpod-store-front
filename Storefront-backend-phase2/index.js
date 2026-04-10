const sql = require('mssql');

module.exports = async function (context, req) {
    try {
        const connStr = process.env.SqlConnectionString;
        await sql.connect(connStr);
        const result = await sql.query`SELECT * FROM Products`;

        context.res = {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: result.recordset
        };
    } catch (err) {
        context.log.error("Error details: ", err.message);
        context.res = {
            status: 500,
            body: "fail to connect to database: " + err.message
        };
    }
};