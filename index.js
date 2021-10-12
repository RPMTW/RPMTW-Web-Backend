const express = require("express")
const fetch = require("node-fetch");
const cors = require("cors");
const { getCrowdinToken, getDiscordToken, refreshToken
} = require("./functions")
const { AuthorizationXBL
} = require("./MSAccountHandler")
const http = require('http');

const app = express();

const server = http.Server(app);
const random = (min, max) => Math.random() * (max - min) + min;
app
    .use(cors())
    .set("view engine",
        "ejs")
    .get("/", (req, res) => {
        res.send("此為 RPMTW 後端 API 非工作人員請勿訪問 www")
    })
    .get("/translate", (req, res) => {
        let source = String(req.query.q);

        //Google API 最大字數限制為5000文
        if (source.length > 5000) {
            return res.status(400).json({
                "error": "Text length is too long",
                "code": 400
            });
        }

        fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en_us&tl=zh_Hant&dt=t&q=${source}`, headers = {
            "x-forwarded-for": `${random(100,
                999)
                }.${random(10,
                    99)
                }.${random(100,
                    999)
                }.${random(100,
                    999)
                }`
        })
            .then(data => data.json())
            .then(json => {
                let formatedJson = {
                    "source": source, //原文
                    "translate": json[0][0][0] //譯文
                }
                res.json(formatedJson);
            });
    })
    .get("/crowdin/oauth/auth/web", (req, res) => {
        /* 回傳token */
        let params = req.query
        getCrowdinToken(params.code, res)
    })
    .get("/crowdin/auth/refreshToken", (req, res) => {
        /* 更新登入憑證 */
        refreshToken(req.query.refreshToken, res)
    })
    .get("/discord/oauth/auth", (req, res) => {
        /* 回傳token */
        getDiscordToken(req.query.code, res)
    })
    .get("/curseForge/api/", (req, res) => {
        /* CurseForge API 代理 */
        fetch(`https: //addons-ecs.forgesvc.net/api/v2/${req.query.url}`)
            .then(d => d.json())
            .then(json => res.json(json))
            .catch((error) => res.json({
                error: error
            }))
    })
    .get("/crowdin/api/", (req, res) => {
        /* Crowdin API 代理 */
        fetch(`https: //api.crowdin.com/api/v2/${req.query.url}`, {
            headers: req.headers.authorization == null ? {} : {
                "Authorization": req.headers.authorization
            }
        })
            .then(d => d.json())
            .then(json => res.json(json))
            .catch((error) => res.json({
                error: error
            }))
    })
    .get("/rpmlauncher/api/microsof-auth", async (req, res) => {
        /* 微軟帳號登入 */
        await AuthorizationXBL(req.query['accessToken'
        ]).then(json => {
            res.json(json);
        })
    })
    .get("/rpmtranslator/api/deepl-translator", async (req, res) => { })
    .get("/test/", (req, res) => {
        /* 此為測試 */
    })

server.listen(process.env.PORT || 5000, () => {
    console.log("is ready")
})