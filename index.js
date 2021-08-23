const express = require('express')
const fetch = require('node-fetch');
const cors = require('cors');
const PORT = process.env.PORT || 5000
const { AuthorizationXBL } = require('./RPMLauncher/MSAccountHandler');

const Token = {
  client_id: "8HpxK2jINouRXTrVq6gf",
  client_secret: process.env.client_secret,
  redirect_uri: "https://rear-end.a102009102009.repl.co/crowdin/oauth/auth/web",
  web: "https://www.rpmtw.ga/Translator"
}

console.log("Starting")

function getToken(code, res) {
  fetch(`https://accounts.crowdin.com/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: Token.client_id,
      client_secret: Token.client_secret,
      redirect_uri: Token.redirect_uri,
      code: code
    })
  }).then(d => d.json()).then((json) => {
    console.log(json);
    json = (json.error && {
      type: "error",
      data: json.error,
    }) || (json.access_token && {
      type: "data",
      data: json.access_token,
    })
    res.redirect(301, `${Token.web}?${json.type}=${json.data}`)
  })
}

try {
  express()
    .use(cors())
    .set('view engine', 'ejs')
    .get("/", (req, res) => {
      res.send("此為 RPMTW 後端 API 非工作人員請勿訪問")
    })
    .get("/crowdin/oauth/auth/web", (req, res) => {
      let params = req.query
      getToken(params.code, res)
    })
    .get("/curseforge/api/", (req, res) => {
      /* CurseForge API 代理 */
      fetch(`https://addons-ecs.forgesvc.net/api/v2/${req.query.url}`)
        .then(d => d.json())
        .then(json => res.json(json))
        .catch((error) => res.json({
          error: error
        }))
    })
    .get("/rpmlauncher/api/microsof-auth", async (req, res) => {
      await AuthorizationXBL(req.query['accessToken']).then(json => {
        res.json(json);
      })
    })
    .get("/rpmtranslator/api/deepl-translator", async (req, res) => {

    })
    .listen(PORT, () => {
      console.log(`http://127.0.0.1:${PORT}`)
    })
} catch (err) {
  console.log(err);
}