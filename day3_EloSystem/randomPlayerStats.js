class Player {
    constructor(riotId, name, winRate, matchWin, matchLose, winStreak, loseStreak, honorPoints, rank, elo) {
        this.riotId = riotId;
        this.name = name;
        this.winRate = winRate;
        this.matchWin = matchWin;
        this.matchLose = matchLose;
        this.winStreak = winStreak;
        this.loseStreak = loseStreak;
        this.honorPoints = honorPoints;
        this.rank = rank;
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
        randomPlayer.elo = Math.round(Math.random() * 3000);
        if (randomPlayer.elo > 2500) {
            randomPlayer.rank = "Challenger";
        } else if (randomPlayer.elo > 2300) {
            randomPlayer.rank = "Grandmaster"
        } else if (randomPlayer.elo > 2100) {
            randomPlayer.rank = "Master"
        } else if (randomPlayer.elo > 1800) {
            randomPlayer.rank = "Diamond"
        } else if (randomPlayer.elo > 1600) {
            randomPlayer.rank = "Emerald"
        } else if (randomPlayer.elo > 1400) {
            randomPlayer.rank = "Platinum"
        } else if (randomPlayer.elo > 1200) {
            randomPlayer.rank = "Gold"
        } else if (randomPlayer.elo > 1000) {
            randomPlayer.rank = "Silve"
        } else if (randomPlayer.elo > 800) {
            randomPlayer.rank = "Bronze"
        } else if (randomPlayer.elo > 400) {
            randomPlayer.rank = "Iron"
        } else {
            randomPlayer.rank = "Unrank"
        }
        listPlayer.push(randomPlayer);
    }
    const fs = require('fs');
    fs.appendFile('day3/listPlayerStats.json', JSON.stringify(listPlayer), function (err) {
        if (err) throw err;
        console.log('Random Player Stats Successfully and Saved list Player!');
    });
}
randomPlayerStats();