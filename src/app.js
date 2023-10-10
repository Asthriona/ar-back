require("dotenv").config();
const app = require("express")();
const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const path = require("path")

// Database connection
mongoose.connect(
    process.env.DB_STRING
  );
  mongoose.connection.on("open", () => console.log("Mongoose connected!!!"));
  mongoose.connection.on("error", (err) => console.log(err));
app.use(cors({
    origin: "*"
}))
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes"));
app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(3000, () => console.log("App listening on port 3000"));