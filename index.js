const express = require("express");
const cors = require("cors");
const router = require("./router");
// import {
//     AuthorizationXBL
// } from "./MSAccountHandler";
const {
    Server
} = require('http');

const app = express();

const server = Server(app);

app
    .use(cors())
    .set("view engine", "html")
    .get("/", (req, res) => res.send("此為 RPMTW 後端 API 非工作人員請勿訪問 www"))
    .use(router)

server.listen(process.env.PORT || 5000, () => {
    console.log("is ready")
})