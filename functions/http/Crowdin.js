/* Crowdin 相關請求 */

const axios = require("axios");
const sets = require("../../data");

const {
    randomIP,
} = require("./main")

const proxy = async (url, headers) => await axios({
    url: `https://api.crowdin.com/api/v2/${url}`,
    method: "GET",
    headers: {
        Authorization: headers.authorization,
        "Content-Type": "application/json",
        "x-forwarded-for": randomIP(),
    }
})

/** get Crowdin Token */
const getCrowdinToken = async (code) => await axios({
    url: "https://accounts.crowdin.com/oauth/token",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": randomIP(),
    },
    data: {
        grant_type: "authorization_code",
        client_id: sets.crowdin.client_id,
        client_secret: sets.crowdin.client_secret,
        redirect_uri: sets.crowdin.redirect_uri,
        code: code,
    },
})

/** 更新登入憑證 */
const refreshToken = async (token) => await axios({
    url: "https://accounts.crowdin.com/oauth/token",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": randomIP(),
    },
    data: {
        grant_type: "refresh_token",
        client_id: sets.crowdin.client_id,
        client_secret: sets.crowdin.client_secret,
        refresh_token: token,
    },
})


module.exports = {
    proxy,
    getCrowdinToken,
    refreshToken,
}