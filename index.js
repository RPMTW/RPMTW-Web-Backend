const express = require("express")
const fetch = require("node-fetch");
const cors = require("cors");
const functions = require('./functions.js');
const { AuthorizationXBL } = require('./RPMLauncher/MSAccountHandler');

const Token = {
  client_id: "8HpxK2jINouRXTrVq6gf",
  client_secret: process.env.client_secret,
  redirect_uri: "https://rear-end.a102009102009.repl.co/crowdin/oauth/auth/web",
  web: "https://www.rpmtw.ga/Translator"
}

express()
  .use(cors())
  .set("view engine", "ejs")
  .get("/", (req, res) => {
    res.send("此為 RPMTW 後端 API 非工作人員請勿訪問")
  })
  .get("/crowdin/oauth/auth/web", (req, res) => {
    /* 回傳token */
    let params = req.query
    functions.getToken(params.code, res)
  })
  .get("/curseForge/api/", (req, res) => {
    /* CurseForge API 代理 */
    fetch(`https://addons-ecs.forgesvc.net/api/v2/${req.query.url}`)
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
  .listen(process.env.PORT || 5000, () => {
    console.log("is ready")
  })