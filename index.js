const express = require("express");
const cors = require("cors");
const morgan = require("morgan")

const router = require("./router");

const app = express();

app
    .use(cors())
    .use(morgan("dev"))
    .use(express.json())
    .use(express.urlencoded({
        extended: false
    }))
    .use(require("cookie-parser")())
    .set("view engine", "html")
    .get("/", (req, res) => res.send("此為 RPMTW 後端 API 非工作人員請勿訪問 www"))
    .use(router)

module.exports = app
