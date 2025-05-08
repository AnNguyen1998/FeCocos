class Player {
    constructor(riotId, name, winRate, matchWin, matchLose, winStreak, loseStreak, honorPoints, elo) {
        this.riotId = riotId;
        this.name = name;
        this.winRate = winRate;
        this.matchWin = matchWin;
        this.matchLose = matchLose;
        this.winStreak = winStreak;
        this.loseStreak = loseStreak;
        this.honorPoints = honorPoints;
        this.elo = elo;
    }
}
let listPlayer = []
const { faker } = require('@faker-js/faker')
const randomPlayerStats = () => {
    for (let i = 0; i < 100; i++) {
        let randomPlayer = new Player();
        randomPlayer.riotId = Math.floor(Math.random() * 1000);
        randomPlayer.name = faker.person.firstName();
        randomPlayer.matchWin = Math.floor(Math.random() * 100);
        randomPlayer.matchLose = 100 - randomPlayer.matchWin;
        randomPlayer.winRate = randomPlayer.matchWin;
        if (randomPlayer.matchWin > randomPlayer.matchLose) {
            randomPlayer.winStreak = Math.floor(Math.random() * 9 + 2);
            randomPlayer.loseStreak = 0;
        } else if (randomPlayer.matchWin < randomPlayer.matchLose) {
            randomPlayer.loseStreak = Math.floor(Math.random() * 9 + 2);
            randomPlayer.winStreak = 0;
        } else {
            randomPlayer.loseStreak = 0;
            randomPlayer.winStreak = 0;
        }
        randomPlayer.honorPoints = Math.floor(Math.random() * 5);
        randomPlayer.elo = 0;
        listPlayer.push(randomPlayer);
    }
    const fs = require('fs');
    fs.appendFile('day3/listPlayerStats.json', JSON.stringify(listPlayer), function (err) {
        if (err) throw err;
        console.log('Random Player Stats Successfully and Saved list Player!');
    });
}
randomPlayerStats();