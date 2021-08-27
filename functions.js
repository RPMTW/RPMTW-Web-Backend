const fetch = require("node-fetch");
const { sets } = require("./data")

let getCrowdinToken = (code, res) => {
  /* 抓取Token並重導向至 `${Token.web}/callback` */
  fetch(`https://accounts.crowdin.com/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: sets.crowdin.client_id,
      client_secret: sets.crowdin.client_secret,
      redirect_uri: sets.crowdin.redirect_uri,
      code: code,
    }),
  })
    .then((d) => d.json())
    .then((json) => {
      res.redirect(301, `${sets.web.translator}/callback.html?data=${JSON.stringify(json)}`);
    })
}
let getDiscordToken = (code, res) => {

}
module.exports = {
  getCrowdinToken
};
