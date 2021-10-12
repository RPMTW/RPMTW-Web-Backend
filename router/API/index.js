/* ------ / ------ */
/* APIS */

const router = require("express").Router()

router
    .use("/crowdin", require('./Crowdin'))
    .use("/discord", require('./Discord'))
    .use("/curseForge", require('./CurseForge'))

module.exports = router