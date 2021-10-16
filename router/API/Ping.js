/* ------ /curseForge ------ */
/* CurseForge API */

const router = require("express").Router()
const url = require("url");
const axios = require("axios")

const {
    BadRequestError
} = require("../../errors/httpError")

router
    .get("/", async (req, res) => {
        let post = await axios({
            url: `${url.format({
                protocol: req.protocol,
                host: req.get("host"),
                pathname: req.originalUrl
            })}/check`,
            method: "POST",
            data: {
                send_time: new Date(),
            },
            headers: {
                "Accept": "application/json, text/plain, */*"
            }
        })
        let data = await post.data
        res.json({
            ping: new Date(data.back_time) - new Date(data.client_send_time)
        })
    })
    .post("/check", (req, res) => {
        if (["send_time"].filter(value => !(value in req.body)).length > 0)
            return res.status(400).json(BadRequestError())
        res.json({
            back_time: new Date(),
            client_send_time: new Date(req.body.send_time),
        })
    })


module.exports = router;