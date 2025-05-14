const path = 'day3/listPlayerStats.json'
const fs = require('fs');
let PlayerStats = [];
try {
    if (fs.existsSync(path)) {
        const data = fs.readFileSync(path, 'utf8');
        PlayerStats = JSON.parse(data);
    } else {
        console.error("Player stats file not found!");
    }
} catch (err) {
    console.error("Error reading player stats:", err);
}
class RandomMatch {
    constructor() {
        if (PlayerStats.length === 0) {
            throw new Error("No player stats available!");
        }
        this.team1 = [];
        this.team2 = [];
        this.team1Elo = 0;
        this.team2Elo = 0;
    }
    selectPlayers() {
        const shuffled = PlayerStats.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
    }
    createBalancedTeams(players) {
        const sortedPlayers = players.sort((a, b) => b.elo - a.elo);
        for (let i = 0; i < sortedPlayers.length; i++) {
            if (i % 2 === 0) {
                this.team1.push(sortedPlayers[i]);
                this.team1Elo += sortedPlayers[i].elo;
            } else {
                this.team2.push(sortedPlayers[i]);
                this.team2Elo += sortedPlayers[i].elo;
            }
        }
    }
    simulateMatch() {
        const team1WinChance = this.team1Elo / (this.team1Elo + this.team2Elo);
        const random = Math.random();
        const team1Wins = random < team1WinChance;
        return {
            team1: this.team1.map(p => p.name),
            team2: this.team2.map(p => p.name),
            team1Elo: Math.round(this.team1Elo / 5),
            team2Elo: Math.round(this.team2Elo / 5),
            winner: team1Wins ? 'Team 1' : 'Team 2',
            team1WinChance: Math.round(team1WinChance * 100) + '%'
        };
    }
    generateMatch() {
        const players = this.selectPlayers();
        this.createBalancedTeams(players);
        return this.simulateMatch();
    }
}
let listMatch = []
for (let i = 0; i < 5; i++) {
    const match = new RandomMatch();
    const result = match.generateMatch();
    listMatch.push(result);
}
fs.appendFile('day3/listRandomMatchs.json', JSON.stringify(listMatch), function (err) {
    if (err) throw err;
    console.log("Random Match Result Successfully and Saved !");
});