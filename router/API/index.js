/* ------ / ------ */
/* APIS */

const router = require("express").Router()

router
    .use("/ping", require('./Ping'))
    .use("/crowdin", require('./Crowdin'))
    .use("/discord", require('./Discord'))
    .use("/curseForge", require('./CurseForge'))

module.exports = router