export async function joinThread(channel, threadName): Promise<boolean> {
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

export async function leaveThread(channel, threadName) {
    const thread = channel.threads.cache.find(x => x.name === threadName);
    await thread.leave();
    console.log(`Left thread ${threadName}`)
}