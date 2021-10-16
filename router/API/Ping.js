/* ------ /curseForge ------ */
/* CurseForge API */

const router = require("express").Router()
const url = require("url");
const axios = require("axios")

const {
    BadRequestError
} = require("../../errors/httpError")

setInterval(() => {

}, 1e3 * 60)

router
    .get("/", async (req, res) => {
        let send_time = new Date();
        let data = await (await axios({
            url: `${url.format({
                protocol: req.protocol,
                host: req.get("host"),
                pathname: req.originalUrl
            })}/check`,
            method: "POST",
            data: {
                send_time,
            },
            headers: {
                "Accept": "application/json, text/plain, */*",
            },
        })).data;
        let ping = (~~((new Date(data.back_time) - send_time) / 2) || "<=0") + "ms"
        res.json({
            ping
        });
    })
    .post("/check", (req, res) => {
        if (["send_time"].filter(value => !(value in req.body)).length > 0)
            return res.status(400).json(BadRequestError())
        res.json({
            back_time: new Date(),
        })
    })


module.exports = router;