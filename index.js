const express = require("express")
const fetch = require("node-fetch");
const cors = require("cors");
const functions = require("./functions")


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
    .get("/rpmlauncher/api/microsof-auth", (req, res) => {
        functions.AuthorizationXBL(req.query.accessToken)
    })
    .get("/rpmtranslator/api/deepl-translator", async (req, res) => {

    })
    .listen(process.env.PORT || 5000, () => {
        console.log("is ready")
    })
