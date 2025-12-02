const oracledb = require("oracledb");

async function initPool() {
    try {
        await oracledb.createPool({
            user: "system",
            password: "MySystem123",
            connectString: "localhost/xe"
        });

        console.log("Oracle connected");
    } catch (err) {
        console.error("Oracle error:", err);
    }
}

initPool();

async function executeQuery(sql, params = []) {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(sql, params, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });
        return result.rows;
    } catch (err) {
        console.error("SQL Error:", err);
        return null;
    } finally {
        if (connection) await connection.close();
    }
}

module.exports = { executeQuery };
