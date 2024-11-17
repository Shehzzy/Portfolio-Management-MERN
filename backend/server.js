var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();
require('./utils/connection.js')
var authRouter = require('./Routes/auth-router.js')
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});




