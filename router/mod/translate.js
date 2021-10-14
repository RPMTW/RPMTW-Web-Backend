/* ------ /translate ------ */
/* 翻譯 API */

const router = require("express").Router()

const axios = require('axios');
const {
    BadRequestError
} = require('../../errors/httpError');
const {
    randomIP
} = require('../../functions/http/main');

router
    .get("/", (req, res) => {
        if (!req.query.q) return res.status(400).json(BadRequestError())

        let source = String(req.query.q);
        // Google API 最大字數限制為 5000
        if (source.length > 5000) return res.status(400).json(BadRequestError("文字數量超出"));

        axios({
                url: `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en_us&tl=zh_Hant&dt=t&q=${source}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-forwarded-for": randomIP(),
                }
            })
            .then(data => res.json({
                "source": source, // 原文
                "translate": data.data[0][0][0] // 譯文
            }))
            .catch(error => res.status((error.response && error.response.status) || 500).json(error))
    })

module.exports = router;