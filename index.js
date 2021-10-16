require("dotenv").config()
const express = require("express");
const cors = require("cors");
const ping = require("express-ping");

const router = require("./router");
const {
    Server
} = require("http");
const {
    discord
} = require("./data")
const client = require("./client")

const app = express();

const server = Server(app);

app
    .use(cors())
    .use(ping.ping())
    .set("view engine", "html")
    .get("/", (req, res) => res.send("此為 RPMTW 後端 API 非工作人員請勿訪問 www"))
    .use(router)

server.listen(process.env.PORT || 5000, () => {
    console.log("is ready")
    client.login(process.env.discord_bot_token);
})

console.log(discord.Oauth2)