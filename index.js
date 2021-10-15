require("dotenv").config()
const express = require("express");
const path = require("path");

const {
    Server
} = require("http");
const {
    createServer: createViteServer
} = require("vite")

const client = require("./client")
const router = require("./router");

const app = express();
const server = Server(app);

async function createServer() {
    const vite = await createViteServer({
        server: {
            middlewareMode: "ssr"
        }
    });

    app
        /* --------------- */
        .use(require("cors")())
        .set("views", path.join(__dirname, "views"))
        .set("view engine", "html")
        .use(express.static(path.join(__dirname, "public")))
        /* --------------- */
        .get("/", (req, res) => res.send("此為 RPMTW 後端 API 非工作人員請勿訪問 www"))
        .use(router)
        .use(vite.middlewares)

    server.listen(process.env.PORT || 5000, () => {
        console.log("is ready")
        client.login(process.env.discord_bot_token);
    });
};

createServer();