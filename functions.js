module.exports = {
    getToken: (code, res) => {
        /* 抓取Token重導向至 `${Token.web}` */
        fetch(`https://accounts.crowdin.com/oauth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: Token.client_id,
                client_secret: Token.client_secret,
                redirect_uri: Token.redirect_uri,
                code: code
            })
        }).then(d => d.json()).then((json) => {
            json = (json.error && {
                type: "error",
                data: json.error,
            }) || (json.access_token && {
                type: "data",
                data: json.access_token,
            })
            res.redirect(301, `${Token.web}?${json.type}=${json.data}`)
        }).catch(error => res.send(error))
    }
}