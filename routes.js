const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/drones/shersh-8", async (req, res) => {
  const result = await db.executeQuery(`SELECT * FROM DRONES WHERE NAME = 'SHERSH-8'`);

  if (!result || !result.rows || result.rows.length === 0) {
    return res.status(404).json({ error: "Drone not found" });
  }

  res.json(result.rows[0]);
});


router.get("/catapult", async (req, res) => {
  const result = await db.executeQuery(`SELECT * FROM CATAPULT WHERE ID = 1`);

  if (!result || !result.rows || result.rows.length === 0) {
    return res.status(404).json({ error: "Catapult not found" });
  }

  res.json(result.rows[0]);
});

router.post("/contact", async (req, res) => {
  const { name, phone, email, message } = req.body;

  await db.executeQuery(`
    INSERT INTO CONTACT_REQUESTS (NAME, PHONE, EMAIL, MESSAGE_TEXT)
    VALUES (:name, :phone, :email, :message)
  `, { name, phone, email, message });

  res.json({ status: "success" });
});

module.exports = router;
