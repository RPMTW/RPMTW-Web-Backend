const express = require("express");
const cors = require("cors");
const router = require("./router");
const {
    Server
} = require('http');
const {
    discord
} = require("./data")


const app = express();

const server = Server(app);

app
    .use(cors())
    .set("view engine", "html")
    .get("/", (req, res) => res.send("此為 RPMTW 後端 API 非工作人員請勿訪問 www"))
    .get("/rpmlauncher/api/microsof-auth", async (req, res) => {
        /* 確認 minecraft 帳號 */
        await AuthorizationXBL(req.query['accessToken']).then(json => {
            res.json(json);
        })
    })
    .use(router)

server.listen(process.env.PORT || 5000, () => {
    console.log("is ready")
})

console.log(discord.Oauth2)