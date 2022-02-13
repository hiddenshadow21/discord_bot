function parsePoints(messageContent){
    const maxPoints = 7;
    const msgArray = messageContent.split(" ");
    const noGuesses = msgArray[2][0];
    console.log(noGuesses);
    let points = 0;
    guessesInt = parseInt(noGuesses);
    if(guessesInt)
        points = maxPoints - guessesInt;
    return [msgArray[0], points];
}

const Emojis = {
    0: '0️⃣',
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣'
}

module.exports = {
    parsePoints, Emojis
}