/* ------ /rpmlauncher ------ */
/* rpmlauncher 啟動器相關 */

const router = require("express").Router()
const {
    BadRequestError
} = require("../../errors/httpError")
const { AuthorizationXBL } = require("./MSAccountHandler")

router
    .get("/api/microsof-auth", async (req, res) => {
        /* 微軟帳號登入 */
        if (!req.query.accessToken) return res.status(400).json(BadRequestError())
        await AuthorizationXBL(req.query.accessToken)
            .then(json => res.json(json));
    });


module.exports = router;