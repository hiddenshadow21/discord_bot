import { Message, TextChannel } from "discord.js";
import { settings } from "./settings";

export function haveAccess(message: Message): Boolean {
    return settings.adminsTags.includes(message.author.tag);
}

export async function joinThread(channel: TextChannel, threadName: String): Promise<boolean> {
    console.log(threadName);
    const thread = channel.threads.cache.find(x => x.name == threadName);
    if (!thread) {
        console.log(`Thread ${threadName} not found`)
        return false;
    }
    if (thread.joinable) {
        await thread.join();
        console.log(`Joined thread ${threadName}`)
        return true;
    }
    return false;
}

export async function leaveThread(channel: TextChannel, threadName: String) {
    const thread = channel.threads.cache.find(x => x.name === threadName);
    if (thread) {
        await thread.leave();
        console.log(`Left thread ${threadName}`)
    }
    else {
        console.log(`Thread ${threadName} not found`)
    }
}