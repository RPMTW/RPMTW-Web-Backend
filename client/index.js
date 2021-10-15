const {
    Client,
    Intents
} = require("discord.js"), client = new Client({
    intents: new Intents(32509)
});

client.ws.addListener("READY", (async bot => {
    console.log(`${bot.user.username}#${bot.user.discriminator} is ready`)
}));
client.ws.addListener("MESSAGE_CREATE", async msg => console.log(msg.content))

module.exports = client;