const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

// available routes
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(` nitinkumar.in backend running at http://localhost:${port}`);
});
