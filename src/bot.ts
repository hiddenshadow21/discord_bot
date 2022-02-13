require('dotenv').config();

import { parsePoints, Emojis } from './pointsParser';
import * as commands from './commands';
const { Client } = require('discord.js');
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS"
    ]
});
const PREFIX = '!';

//COMMAND PARSING
client.on('messageCreate', (message) => {
    if (!message.content.startsWith(PREFIX))
        return;
    const [command, ...args] = message.content.substring(PREFIX.length).split(" ");

    switch (command) {
        case "joinThread":
            commands.joinThread(message.channel, args.join(" "))
            break;
        case "leaveThread":
            commands.leaveThread(message.channel, args.join(" "))
            break;
        default:
            break;
    }
})

//WORDLE ETC. PARSING
client.on('messageCreate', (message) => {
    console.log(message.content);
    if (!message.content.startsWith("literalnie.fun") && !message.content.startsWith("Wordle"))
        return;

    const [site, points] = parsePoints(message.content);

    console.log(message.author.tag, site, points);
    message.react(Emojis[points]);

    //todo: save results in db
    //saveResult(message.user, site, points);
});

client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN)