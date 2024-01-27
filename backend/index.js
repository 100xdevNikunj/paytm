const express = require("express");
const app = express();
const rootRouter = require("./routes/index");
var cors = require('cors')
require('dotenv').config()

const port = process.env.PORT;

app.use(express.json());

app.use(cors())

app.use("/api/v1", rootRouter);

app.get("/",(req, res)=>{
    res.send("HELLOOOOOO")
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});

