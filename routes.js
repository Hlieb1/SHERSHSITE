const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/drones/shersh-8", async (req, res) => {
  const rows = await db.executeQuery(
    `SELECT * FROM DRONES WHERE NAME = 'SHERSH-8'`
  );
  res.json(rows && rows.length ? rows[0] : {});
});

router.get("/catapult", async (req, res) => {
  const rows = await db.executeQuery(
    `SELECT * FROM CATAPULT WHERE ID = 1`
  );
  res.json(rows && rows.length ? rows[0] : {});
});

module.exports = router;
