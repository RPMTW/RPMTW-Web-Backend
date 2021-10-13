/* ------ /crowdin ------ */
/** Crowdin API */

const router = require("express").Router()
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
        /** 回傳token */
        if (!req.query.code) return res.status(400).json(BadRequestError())
        getCrowdinToken(req.query.code)
            .then(data => res.json(data))
            .catch(error => res.status(error.response.status || 500).json({
                message: error.message,
                name: error.name
            }))
    })
    .get("/auth/refreshToken", (req, res) => {
        /** 更新登入憑證 */
        if (!req.query.refreshToken) return res.status(400).json(BadRequestError())
        refreshToken(req.query.refreshToken)
            .then(data => res.json(data))
            .catch(error => res.status(error.response.status || 500).json({
                message: error.message,
                name: error.name
            }))
    })

module.exports = router