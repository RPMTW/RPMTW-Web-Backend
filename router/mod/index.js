/* ------ / ------ */
/* 模組相關 */

const router = require("express").Router()

router
    .use("/translate", require("./translate")) /* 翻譯 API */

module.exports = router;