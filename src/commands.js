async function joinThread(channel, threadName){
    console.log(threadName);
    const thread = channel.threads.cache.find(x => x.name == threadName);
    if(!thread)
    {
        console.log(`Thread ${threadName} not found`)
        return;
    }
    if (thread.joinable)
    {
        await thread.join();
        console.log(`Joined thread ${threadName}`)
    }
}

async function leaveThread(channel, threadName){
    const thread = channel.threads.cache.find(x => x.name === threadName);
    await thread.leave();
    console.log(`Left thread ${threadName}`)
}

module.exports = {
    joinThread,
    leaveThread
}