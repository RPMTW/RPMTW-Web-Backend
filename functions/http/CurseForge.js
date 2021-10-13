/* CurseForge 相關請求 */

const axios = require("axios");

async function proxy(url) {
    return await axios({
        url: `https://addons-ecs.forgesvc.net/api/v2/${url}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": randomIP(),
        }
    })
}

module.exports = {
    proxy,
}