const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
const port = 8000;

app.use(express.json());
app.use(
  cors({
    origin: ["https://react-personal-xi.vercel.app"],
    methods: ["POST", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req,res)=>{
  res.json("hello")
})

// available routes
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(` nitinkumar.in backend running at http://localhost:${port}`);
});
