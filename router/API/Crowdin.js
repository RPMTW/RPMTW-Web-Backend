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
    .get("/api", async (req, res) => {
        /** 代理 */
        let url = req.query.url;
        if (!(url && req.headers.authorization)) return res.status(400).json(BadRequestError())
        return await proxy(url, req.headers)
            .then(data => res.json(data))
            .catch(error => res.status(error.response.status || 500).json(error))
    })

    /* ------ Oauth2 ------ */
    .get("/oauth/auth/web", async (req, res) => {
        /** 回傳token */
        if (!req.query.code) return res.status(400).json(BadRequestError())
        return await getCrowdinToken(req.query.code)
            .then(data => res.json(data))
            .catch(error => res.status(error.response.status || 500).json(error))
    })
    .get("/auth/refreshToken", async (req, res) => {
        /** 更新登入憑證 */
        if (!req.query.refreshToken) return res.status(400).json(BadRequestError())
        return await refreshToken(req.query.refreshToken)
            .then(data => res.json(data))
            .catch(error => res.status(error.response.status || 500).json(error))
    })

module.exports = router