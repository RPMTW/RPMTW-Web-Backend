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
    .get("/oauth/auth", async (req, res) => {
        /* 回傳 discord token */
        if (!req.query.code) return res.status(400).json(BadRequestError())
        console.log(req.query.code)
        await getDiscordToken(req.query.code)
            .then(data => {
              console.log(data)
              res.json(data.data)
            })
            .catch(error => {
              console.log(error)
              res.status((error.response && error.response.status) || 500).json(error)})
    })

module.exports = router;