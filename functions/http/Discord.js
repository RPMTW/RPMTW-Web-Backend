/* Discord 相關請求 */

const axios = require("axios");
const sets = require("../../data");
const {
    randomIP,
} = require("./main")
const fetch = require("node-fetch")

/** get Oauth2 Token */
const getDiscordToken = async (code) =>
    await fetch(`${sets.discord.API}/oauth2/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            client_id: sets.discord.botId,
            client_secret: sets.discord.client_secret,
            grant_type: "authorization_code",
            scope: "identify",
            redirect_uri: sets.discord.REDIRECT_URI,
            code: code,
        })
    })

/** get User info */
const getDiscordUser = (code) =>
    axios({
        url: "",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": randomIP(),
        }
    })

module.exports = {
    getDiscordToken,
    getDiscordUser,
}