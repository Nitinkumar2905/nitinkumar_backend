const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
const port = 8000;

app.use(express.json());
app.use(
  cors(
    {
    origin: ["https://nitinkumar2905.vercel.app"],
    methods: ["POST", "DELETE"],
    credentials: true,
  }
  )
);

app.get("/", (req,res)=>{
  res.json("hello")
})

// available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/project", require("./routes/project"));

app.listen(port, () => {
  console.log(` nitinkumar2905.vercel.app backend running at http://localhost:${port}`);
});
