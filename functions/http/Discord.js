/* Discord 相關請求 */

const axios = require("axios");
const sets = require("../../data");

const {
    randomIP,
} = require("./main")
const fetch = require("node-fetch")

const proxy = async (url, Authorization) => await axios({
    url: `${sets.discord.API}/v${sets.discord.v}/${url}`,
    method: "GET",
    headers: {
        Authorization,
    }
})

/** get Oauth2 Token */
const getDiscordToken = async (code, redirect_uri) => await fetch(`${sets.discord.API}/oauth2/token`, {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-forwarded-for": randomIP(),
    },
    body: new URLSearchParams({
        client_id: sets.discord.botId,
        client_secret: sets.discord.client_secret,
        grant_type: "authorization_code",
        scope: "identify",
        redirect_uri: redirect_uri || sets.discord.REDIRECT_URI,
        code: code,
    })
})

module.exports = {
    getDiscordToken,
    proxy,
}