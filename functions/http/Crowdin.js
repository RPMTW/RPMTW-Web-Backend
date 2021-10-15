/* Crowdin 相關請求 */

const axios = require("axios");
const sets = require("../../data");

const {
    randomIP,
} = require("./main");

const proxy = async (url, Authorization = null, headers = null) => await axios({
    url: `https://api.crowdin.com/api/v2/${url}`,
    method: "GET",
    headers: {
        ...headers,
        Authorization,
        "Content-Type": "application/json",
        "x-forwarded-for": randomIP(),
    }
});
// {protocol}://{host}/api/v2/user/tasks
/** get Crowdin Token */
const getCrowdinToken = async (code, redirect_uri = null) => await axios({
    url: "https://accounts.crowdin.com/oauth/token",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": randomIP(),
    },
    data: {
        grant_type: "authorization_code",
        code: code,
        client_id: sets.crowdin.client_id,
        client_secret: sets.crowdin.client_secret,
        redirect_uri: redirect_uri || sets.crowdin.redirect_uri,
    },
});

const getCrowdinUser = async (token) => await proxy("/user", token);
// https://crowdin.com/backend/profile_actions/projects_info?user_id=14797842
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
});


module.exports = {
    proxy,
    getCrowdinToken,
    refreshToken,
    getCrowdinUser,
}