/* Crowdin 相關請求 */

const axios = require("axios");

const proxy = (url, headers) =>
    axios({
        url: `https://api.crowdin.com/api/v2/${url}`,
        method: "GET",
        headers: {
            Authorization: headers.authorization,
            "Content-Type": "application/json",
            "x-forwarded-for": randomIP(),
        }
    })
    .then(d => d.data)
    .catch(error => error)

/** get Crowdin Token */
const getCrowdinToken = (code) =>
    axios({
        url: "https://accounts.crowdin.com/oauth/token",
        method: "PSOT",
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
const refreshToken = (token) =>
    axios({
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