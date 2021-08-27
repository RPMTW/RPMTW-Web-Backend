const express = require("express")
const fetch = require("node-fetch");
const cors = require("cors");
const { getCrowdinToken, getDiscordToken } = require("./functions")
const { AuthorizationXBL } = require("./MSAccountHandler")
const http = require('http');

const app = express();

const server = http.Server(app);

app
  .use(cors())
  .set("view engine", "ejs")
  .get("/", (req, res) => {
    res.send("此為 RPMTW 後端 API 非工作人員請勿訪問 www")
  })
  .get("/crowdin/oauth/auth/web", (req, res) => {
    /* 回傳token */
    let params = req.query
    getCrowdinToken(params.code, res)
  })
  .get("/discord/oauth/auth", (req, res) => {
    /* 回傳token */
    getDiscordToken(req.query.code)
  })
  .get("/curseForge/api/", (req, res) => {
    /* CurseForge API 代理 */
    fetch(`https://addons-ecs.forgesvc.net/api/v2/${req.query.url}`)
      .then(d => d.json())
      .then(json => res.json(json))
      .catch((error) => res.json({ error: error }))
  })
  .get("/crowdin/api/", (req, res) => {
    /* Crowdin API 代理 */
    fetch(`https://api.crowdin.com/api/v2/${req.query.url}`, {
      headers: req.headers.authorization == null ? {} : { "Authorization": req.headers.authorization }
    })
      .then(d => d.json())
      .then(json => res.json(json))
      .catch((error) => res.json({ error: error }))
  })
  .get("/rpmlauncher/api/microsof-auth", async (req, res) => {
    await AuthorizationXBL(req.query['accessToken']).then(json => {
      res.json(json);
    })
  })

  .get("/rpmtranslator/api/deepl-translator", async (req, res) => {

  })

server.listen(process.env.PORT || 5000, () => {
  console.log("is ready")
})
