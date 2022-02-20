require('dotenv').config();

import { parsePoints, Emojis } from './pointsParser';
import * as commands from './commands';
import { saveResult } from './raven';
import { Result } from "./Models/Result";
const fs = require('fs')
const { Client } = require('discord.js');
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS"
    ]
});
const PREFIX = '!';

process.on('uncaughtException', (err) => {
    console.log(err);
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled rejection at ', promise, `reason: ${reason}`);
})

//COMMAND PARSING
client.on('messageCreate', (message) => {
    if (commands.haveAccess(message) == false && !message.content.startsWith(PREFIX))
        return;
    try {
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
    }
    catch (err) {
        console.log(err);
    }
})

//WORDLE ETC. PARSING
client.on('messageCreate', (message) => {
    console.log(message.content);
    if (!message.content.startsWith("literalnie.fun") && !message.content.startsWith("Wordle"))
        return;

    try {
        const [site, gameNumber, points] = parsePoints(message.content);

        console.log(message.author.tag, site, gameNumber, points);
        message.react(Emojis[points]);

        //todo: save results in db
        const result = new Result(message.author.tag, site, points, gameNumber);
        saveResult(result)
            .then(() => {
                message.react('💾');
            })
            .catch((err) => {
                console.log(err)
                fs.appendFile('Logs/unsaved.log', JSON.stringify(result) + '\n', err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            });


    }
    catch (err) {
        console.log(err);
    }
});

client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN)