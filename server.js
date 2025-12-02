const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
