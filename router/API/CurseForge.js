/* ------ /curseForge ------ */
/* CurseForge API */

const router = require("express").Router()
const {
    proxy
} = require('../../functions/http/CurseForge')
const {
    BadRequestError
} = require('../../errors/httpError')


router
    .get("/api", (req, res) => {

        if (!req.query.url) return res.status(400).json(BadRequestError())
        proxy(req.query.url)
            .then(data => res.json(data))
            .catch(error => res.status(error.response.status || 500).json(error))
    })


module.exports = router;