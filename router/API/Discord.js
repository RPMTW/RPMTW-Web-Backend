/* ------ /discord ------ */
/* discord API */

const router = require("express").Router()

const {
    getDiscordToken,
    getDiscordOauth2User
} = require('../../functions/http/Discord')
const {
    BadRequestError
} = require('../../errors/httpError')
const client = require("../../client")
const {
    discord
} = require("../../data")

let set = {
    guild_id: "808241076657717268", // testing
    role_id: "808243313072537670", // testing
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
    .get("/oauth/checkCrowin", async (req, res) => {
        let guild = client.guilds.cache.find(guild => guild.id == "808241076657717268");
          try {
              var user = await guild.members.fetch("688181698822799414");
          } catch {
              res.send("error!!")
          } finally {
              res.send("請至您的discord帳號中查看!!")
              let _msg = await user.send("點擊下方 ✅ 確認是否為您申請身份!!\n若非您請求，請掠過本訊息");
              await _msg.react("✅");
              let callback = async react => {
                  if (react.message_id === _msg.id && react.user_id !== client.user.id && "✅" === react.emoji.name) {
                      let guild = await client.guilds.fetch("808241076657717268");
                      await (await guild.members.fetch(react.user_id)).roles.add(await guild.roles.fetch("862753080047042610"));
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
          }
    })

module.exports = router;