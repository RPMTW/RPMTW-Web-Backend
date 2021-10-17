/* ------ /crowdin ------ */
/** Crowdin API */

const router = require("express").Router()
const sets = require("../../data");

const {
    proxy,
    refreshToken,
    getCrowdinToken
} = require('../../functions/http/Crowdin');
const {
    BadRequestError
} = require('../../errors/httpError');

router
    .get("/api", (req, res) => {
        /** 代理 */
        let url = req.query.url;
        if (!(url && req.headers.authorization)) return res.status(400).json(BadRequestError())
        proxy(url, req.headers)
            .then(data => data.data)
            .then(data => res.json(data))
            .catch(error => res.status((error.response && error.response.status) || 500).json({
                message: error.message,
                name: error.name,
            }))
    })

    /* ------ Oauth2 ------ */
    .get("/oauth/auth/web", (req, res) => {
        /** 導出用戶 token 至翻譯網頁 */
        if (!req.query.code) return res.status(400).json(BadRequestError())
        getCrowdinToken(req.query.code, "https://rear-end.a102009102009.repl.co/crowdin/oauth/auth/web")
            .then(data => data.data)
            .then(json => res.redirect(301, `${sets.web.translator}/callback.html?data=${JSON.stringify(json)}&type=crowdin`))
            .catch(error => res.status(error.response && error.response.status || 500).json({
                message: error.message,
                name: error.name
            }))
    })
    .get("/oauth/auth", (req, res) => {
        /** GET token */
        if (!req.query.code) return res.status(400).json(BadRequestError())
        getCrowdinToken(req.query.code, "/crowdin/oauth/auth")
            .then(data => data.data)
            .then(json => res.json(json))
            .catch(error => res.status(error.response && error.response.status || 500).json({
                message: error.message,
                name: error.name
            }))
    })
    .get("/oauth/auth/main", async (req, res) => {
        if (!req.query.code) return res.status(400).json(BadRequestError())
        getCrowdinToken(req.query.code)
            .then(data => data.data)
            .then(json => res.redirect(301, `${sets.web.main}/callback?token=${json.access_token}`))
            .catch(error => res.status(error.response && error.response.status || 500).json({
                message: error.message,
                name: error.name
            }))
    })
    .get("/auth/refreshToken", (req, res) => {
        /** 更新登入憑證 */
        if (!req.query.refreshToken) return res.status(400).json(BadRequestError())
        refreshToken(req.query.refreshToken)
            .then(data => res.json(data))
            .catch(error => res.status(error.response && error.response.status || 500).json({
                message: error.message,
                name: error.name
            }))
    })

module.exports = router