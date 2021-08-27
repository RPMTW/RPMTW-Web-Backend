/* 
    網址規範:
        O: https://test.com
        X: https://test.com/
*/

let sets = {
    web: {
        api: "https://rear-end.a102009102009.repl.co",
        main: "https://www.rpmtw.ga",
        translator: "https://translator.rpmtw.ga/index.html"
    },
    discord: {
        botId: "880821114014666753",
        client_secret: process.env.discord_client_secret,
        Oauth2: `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${main.discord.id}&scope=identify%20guilds.join&state=${process.env}&redirect_uri=${main.web}&prompt=consent`
    },
    crowdin: {
        /* crowdin */
        client_id: "8HpxK2jINouRXTrVq6gf",
        client_secret: process.env.crowdin_client_secret,
        redirect_uri: "https://rear-end.a102009102009.repl.co/crowdin/oauth/auth/web",
    },
    API: {
        /* 其它API */
    }
}

module.exports = {
    sets
}