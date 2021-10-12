/* ------ / ------ */
/* routers */

const router = require("express").Router()

router
    .use("/", require("./API"))
    .use("/", require("./mod"))
    .use("/rpmlauncher", require('./rpmlauncher'))
    .use("/test", require('./test'))

module.exports = router;