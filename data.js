/* 
    網址規範:
        O: https://test.com
        X: https://test.com/
*/
let web = {
    /* 網頁/官方API */
    api: "https://rear-end.a102009102009.repl.co",
    rpmtwchat: "https://api.rpmtwchat.ga/",
    main: "https://www.rpmtw.ga",
    translator: "https://translator.rpmtw.ga"
}
let discord = {
    /* discord 相關 */
    botId: "880821114014666753",
    API: "https://discord.com/api",
    client_secret: process.env.discord_client_secret,
}
let crowdin = {
    /* crowdin */
    client_id: "8HpxK2jINouRXTrVq6gf",
    client_secret: process.env.crowdin_client_secret,
    redirect_uri: "https://rear-end.a102009102009.repl.co/crowdin/oauth/auth/web",
}
let API = {
    /* 其它API */
}

discord.REDIRECT_URI = web.api + "/discord/oauth/auth"
discord.Oauth2 = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${discord.botId}&scope=identify%20guilds.join&redirect_uri=${discord.REDIRECT_URI}&prompt=consent`


module.exports = {
    web: web,
    discord: discord,
    crowdin: crowdin,
    API: API,
}