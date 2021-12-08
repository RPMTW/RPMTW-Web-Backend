require("dotenv").config()
const app = require("../index")
const http = require("http")
const client = require("../client")

const port = process.env.PORT || "5000"
app.set("port", port)

const server = http.createServer(app);

server.listen(port, () => {
    console.log("is ready")
    // client.login(process.env.discord_bot_token);
});