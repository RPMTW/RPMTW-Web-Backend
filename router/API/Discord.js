/* ------ /discord ------ */
/* discord API */

const router = require("express").Router()

const {
    getDiscordToken
} = require('../../functions/http/Discord')
const {
    BadRequestError
} = require('../../errors/httpError')


router
    /* ------ Oauth2 ------ */
    .get("/oauth/auth", (req, res) => {
        /* 回傳 discord token */
        if (!req.query.code) return res.status(400).json(BadRequestError())
        getDiscordToken(req.query.code)
            .then(data => data.json())
            .then(json => res.json(json))
            .catch(error => res.status((error.response && error.response.status) || 500).json({
                message: error.message,
                name: error.name,
            }))
    })

module.exports = router;