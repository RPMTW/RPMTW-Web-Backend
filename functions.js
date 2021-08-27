const fetch = require("node-fetch");
const Token = {
  client_id: "8HpxK2jINouRXTrVq6gf",
  client_secret: process.env.client_secret,
  redirect_uri: "https://rear-end.a102009102009.repl.co/crowdin/oauth/auth/web",
  web: "https://translator.rpmtw.ga",
};

let getToken = (code, res) => {
  /* 抓取Token並重導向至 `${Token.web}/callback` */
  fetch(`https://accounts.crowdin.com/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: Token.client_id,
      client_secret: Token.client_secret,
      redirect_uri: Token.redirect_uri,
      code: code,
    }),
  })
    .then((d) => d.json())
    .then((json) => {
      console.log(json)
      res.redirect(301, `${Token.web}/callback.html?data=${JSON.stringify(json)}`);
    })
}
module.exports = {
  getToken
};
