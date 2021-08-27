/* 
    網址規範:
        O: https://test.com
        X: https://test.com/
*/

function sets() {
    this.web = {
        api: "https://rear-end.a102009102009.repl.co",
        main: "https://www.rpmtw.ga",
        translator: "https://translator.rpmtw.ga/index.html"
    }
    this.discord = {
        botId: "880821114014666753",
        client_secret: process.env.discord_client_secret,
        Oauth2: `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${this.discord.botId}&scope=identify%20guilds.join&redirect_uri=${this.web.api + "/discord/oauth/auth"}&prompt=consent`
    }
    this.crowdin = {
        /* crowdin */
        client_id: "8HpxK2jINouRXTrVq6gf",
        client_secret: process.env.crowdin_client_secret,
        redirect_uri: "https://rear-end.a102009102009.repl.co/crowdin/oauth/auth/web",
    }
    this.API = {
        /* 其它API */
    }
}
sets = sets()
console.log(sets.discord.Oauth2)
module.exports = {
    sets
}