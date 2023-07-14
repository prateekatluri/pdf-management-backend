const express = require('express');
const {ServerConfig} = require('./config')
const apiRoutes = require("./routes");
const fileUpload = require("express-fileupload");
const Cors = require("cors");

const app = express();

app.use(Cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT,() => {
    console.log('listening on Port ' + ServerConfig.PORT);
});