const fetch = require('node-fetch');

async function AuthorizationXBL(accessToken) {
    //Authenticate with XBL
    var headers = new fetch.Headers();
    headers.append("Content-Type", "application/json", 'Accept', 'application/json'
    );

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
            let xblToken = result["Token"];
            let UserHash = result["DisplayClaims"]["xui"][0]["uhs"];
            return AuthorizationXSTS(xblToken, UserHash);
        }).catch(error => console.log('error', error));
}

async function AuthorizationXSTS(xblToken, UserHash) {
    //Authenticate with XSTS
    var headers = new fetch.Headers();
    headers.append("Content-Type", "application/json", 'Accept', 'application/json'
    );

    var raw = JSON.stringify({
        "Properties": {
            "SandboxId": "RETAIL",
            "UserTokens": [xblToken]
        },
        "RelyingParty": "rp://api.minecraftservices.com/",
        "TokenType": "JWT"
    });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
    };

    return await fetch("https://xsts.auth.xboxlive.com/xsts/authorize", requestOptions)
        .then(response => response.json())
        .then(result => {
            let xstsToken = result["Token"];
            let UserHash = result["DisplayClaims"]["xui"][0]["uhs"];
            return AuthorizationMinecraft(xstsToken, UserHash);
        }).catch(error => console.log('error', error));
}

async function AuthorizationMinecraft(xstsToken, UserHash) {
    //Authenticate with Minecraft
    var headers = new fetch.Headers();
    headers.append("Content-Type", "application/json", 'Accept', 'application/json'
    );

    var raw = JSON.stringify({
        "identityToken": `XBL3.0 x=${UserHash};${xstsToken}`
    });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
    };

    return await fetch("https://api.minecraftservices.com/authentication/login_with_xbox", requestOptions)
        .then(response => response.json())
        .then(result => {
            let MCAccessToken = result["access_token"];
            return CheckingGameOwnership(MCAccessToken)
        }).catch(error => console.log('error', error));
}

async function CheckingGameOwnership(MCAccessToken) {
    //Checking Game Ownership
    var headers = new fetch.Headers();
    headers.append("Content-Type", "application/json", 'Authorization', `Bearer ${MCAccessToken}`);

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    return await fetch("https://api.minecraftservices.com/entitlements/mcstore", requestOptions)
        .then(response => response.text())
        .then(result => {
            try {
                let json = JSON.parse(result);
                let Items = json["items"];
                if (Items.length > 0) {
                    let ProfileJson = GetProfile(MCAccessToken);
                    const profile = {
                        name: ProfileJson.name,
                        id: ProfileJson.id
                    }
                    return [
                        {
                            "accessToken": MCAccessToken,
                            "selectedProfile": profile,
                            "availableProfile": [profile]
                        }
                    ];
                } else {
                    return [];
                }
            } catch (error) {
                return [];
            }
        }).catch(error => console.log('error', error));
}

async function GetProfile(MCAccessToken) {
    var headers = new fetch.Headers();
    headers.append("Content-Type", "application/json", 'Authorization', `Bearer ${MCAccessToken}`);

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    return await fetch("https://api.minecraftservices.com/entitlements/mcstore", requestOptions)
        .then(response => response.json())
        .then(result => {
            return result;
        }).catch(error => console.log('error', error));
}

exports.AuthorizationXBL = AuthorizationXBL;