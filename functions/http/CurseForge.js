/* CurseForge 相關請求 */

const axios = require("axios");

const proxy = async (url) =>
    await axios({
        url: `https://addons-ecs.forgesvc.net/api/v2/${url}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": randomIP(),
        }
    })
    .then(d => d.data)
    .catch(error => error)

module.exports = {
    proxy,
}