/* ------ /discord ------ */
/* discord API */

const router = require("express").Router()

const {
    getDiscordToken,
    proxy: discordProxy,
} = require('../../functions/http/Discord')
const {
    BadRequestError
} = require('../../errors/httpError')
const client = require("../../client")
const {
    proxy: crowdinProxy,
} = require('../../functions/http/Crowdin')
const {
    discord
} = require("../../data")

let set = {
    guild_id: "808241076657717268", // testing
    role_id: "808243313072537670", // testing
    crowdinId: "442446", // testing
}

router
    /* ------ Oauth2 ------ */
    .get("/oauth/auth", (req, res) => {
        /* 回傳 discord token */
        if (!req.query.code) return res.status(400).json(BadRequestError())
        getDiscordToken(req.query.code)
            .then(data => data.json())
            .then(json => res.json(json))
            .catch(error => res.status((error.response && error.response.status) || 500).json({
                message: error.message,
                name: error.name,
            }))
    })
    .get("/oauth/crowin/gotome", (req, res) => {
        `${discord.Oauth2}state=${req.query.code}`

    })
    .post("/oauth/checkCrowin", async (req, res) => {
        if (!(req.headers.discord_token && req.headers.crowdin_token)) res.status(400).json(BadRequestError());
        /* --------------- */
        let in_guild_error = []
        try {
            try {
                (await (await discordProxy("users/@me/guilds", `Bearer ${req.headers.discord_token}`)).data)
                .filter(guild => guild.id == set.guild_id).length > 0 || in_guild_error.push("DC")
            } catch {
                throw {
                    error: "discord Oauth2 認證錯誤!!!",
                }
            }
            try {
                (await (await crowdinProxy("projects", `Bearer ${req.headers.crowdin_token}`)).data)
                .data.filter(project => project.data.id == set.crowdinId).length > 0 || in_guild_error.push("crowdin")
            } catch {
                throw {
                    error: "crowdin Oauth2 認證錯誤!!!",
                }
            }
        } catch (error) {
            return res.status(400).json(BadRequestError(error));
        }
        if (in_guild_error.length > 0)
            return res.status(401).json(BadRequestError(`你不在我們的 ${in_guild_error.join("、")} 中`, 401));
        /* --------------- */
        let guild = client.guilds.cache.find(guild => guild.id == set.guild_id);
        var user = await guild.members.fetch(
            (await (await discordProxy("users/@me", `Bearer ${req.headers.discord_token}`)).data).id
        );
        let _msg = await user.send("點擊下方 ✅ 確認是否為您申請身份!!\n若非您請求，請掠過本訊息");
        await _msg.react("✅");
        res.send("請至您的discord帳號中查看!!");
        let callback = async react => {
            if (react.message_id == _msg.id && react.user_id != client.user.id && "✅" == react.emoji.name) {
                let guild = await client.guilds.fetch(set.guild_id);
                await (await guild.members.fetch(react.user_id)).roles.add(await guild.roles.fetch(set.role_id));
                await _msg.delete();
                await user.send("添加完成");
                clearTimeout(setTime);
            }
        }
        let setTime = setTimeout(() => {
            client.ws.removeListener("MESSAGE_REACTION_ADD", callback);
            _msg.delete();
        }, 1e3 * 60);
        client.ws.addListener("MESSAGE_REACTION_ADD", callback);
        /* --------------- */
    })

module.exports = router;