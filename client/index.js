const {
    Client,
    Intents
} = require("discord.js");

const client = new Client({
    intents: new Intents(32509)
});

client.ws.addListener("READY", async bot => console.log(`${bot.user.username}#${bot.user.discriminator} is ready`));

module.exports = client;