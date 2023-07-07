const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// const base_url = process.env.BASE_URL;

connectToMongo();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// available routes
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(` nitinkumar.in backend running at ${PORT}`);
});
