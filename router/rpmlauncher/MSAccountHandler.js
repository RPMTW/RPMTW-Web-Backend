const fetch = require("node-fetch");

async function AuthorizationXBL(accessToken) {
    //Authenticate with XBL
    var headers = new fetch.Headers();
    headers.append("Content-Type", "application/json", 'Accept', 'application/json');

    var raw = JSON.stringify({
        "Properties": {
            "AuthMethod": "RPS",
            "SiteName": "user.auth.xboxlive.com",
            "RpsTicket": `d=${accessToken}`
        },
        "RelyingParty": "http://auth.xboxlive.com",
        "TokenType": "JWT"
    });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
    };

    return await fetch("https://user.auth.xboxlive.com/user/authenticate", requestOptions)
        .then(response => response.json())
        .then(result => {
          return result;
        }).catch(error => console.log('error', error));
}

exports.AuthorizationXBL = AuthorizationXBL;