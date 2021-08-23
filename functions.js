const fetch = require("node-fetch");
const Token = {
    client_id: "8HpxK2jINouRXTrVq6gf",
    client_secret: process.env.client_secret,
    redirect_uri: "https://rear-end.a102009102009.repl.co/crowdin/oauth/auth/web",
    web: "https://www.rpmtw.ga/Translator",
};

module.exports = {
    getToken: (code, res) =>
        /* 抓取Token重導向至 `${Token.web}` */
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
                json =
                    (json.error && {
                        type: "error",
                        data: json.error,
                    }) ||
                    (json.access_token && {
                        type: "data",
                        data: json.access_token,
                    });
                res.redirect(301, `${Token.web}?${json.type}=${json.data}`);
            })
            .catch((error) => res.send(error)),
    AuthorizationXBL: (accessToken) =>
        fetch("https://user.auth.xboxlive.com/user/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                Properties: {
                    AuthMethod: "RPS",
                    SiteName: "user.auth.xboxlive.com",
                    RpsTicket: `d=${accessToken}`,
                },
                RelyingParty: "http://auth.xboxlive.com",
                TokenType: "JWT",
            }),
            redirect: "follow",
        })
            .then((res) => res.json())
            .then((json) => this.Authorizations.AuthorizationXSTS(json.Token)),
    Authorizations: {
        AuthorizationXSTS: (xblToken) =>
            fetch("https://xsts.auth.xboxlive.com/xsts/authorize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    Properties: {
                        SandboxId: "RETAIL",
                        UserTokens: [xblToken],
                    },
                    RelyingParty: "rp://api.minecraftservices.com/",
                    TokenType: "JWT",
                }),
                redirect: "follow",
            })
                .then((res) => res.json())
                .then((json) =>
                    this.Authorizations.AuthorizationMinecraft(
                        json.Token,
                        json.DisplayClaims.xui[0].uhs
                    )
                ),
        AuthorizationMinecraft: (xstsToken, UserHash) =>
            fetch(
                "https://api.minecraftservices.com/authentication/login_with_xbox",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        identityToken: `XBL3.0 x=${UserHash};${xstsToken}`,
                    }),
                    redirect: "follow",
                }
            )
                .then((res) => res.json())
                .then((json) =>
                    this.Authorizations.CheckingGameOwnership(json.access_token)
                ),
        CheckingGameOwnership: (MCAccessToken) =>
            fetch("https://api.minecraftservices.com/entitlements/mcstore", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    Properties: {
                        SandboxId: "RETAIL",
                        UserTokens: [xblToken],
                    },
                    RelyingParty: "rp://api.minecraftservices.com/",
                    TokenType: "JWT",
                }),
                redirect: "follow",
            })
                .then((res) => res.json())
                .then((json) => {
                    try {
                        if (JSON.parse(json).items.length > 0) {
                            let profileJson = this.Authorizations.GetProfile(MCAccessToken);
                            let profile = { name: profileJson.name, id: profileJson.id };
                            return [{
                                accessToken: MCAccessToken,
                                selectedProfile: profile,
                                availableProfile: [profile],
                            }];
                        }
                        return [];
                    } catch (e) {
                        return [];
                    }
                }),
        GetProfile: (MCAccessToken) => {
            fetch("https://api.minecraftservices.com/entitlements/mcstore", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${MCAccessToken}`,
                },
                redirect: "follow",
            })
                .then((response) => response.json())
                .then((result) => result)
        },
    },
};
