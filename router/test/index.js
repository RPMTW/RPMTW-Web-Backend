/* ------ /test ------ */
/* 測試用 */

const router = require("express").Router()

router
    .get("/", (req, res) => {
        res.send("is test page")
    })

module.exports = router