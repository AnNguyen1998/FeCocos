const path = 'day3/listPlayerStats.json'
const fs = require('fs');
if (fs.existsSync(path)) {
    fs.readFile('day3/listPlayerStats.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Failed to read the file:", err);
            return;
        }
        const PlayerStats = JSON.parse(data)
        PlayerStats.map((ps) => {
            let points = 0;
            if (ps.rank == "Iron") {
                points = (ps.matchWin * 40 - ps.matchLose * 5);
            } else if (ps.rank == "Bronze") {
                points = (ps.matchWin * 35 - ps.matchLose * 10);
            } else if (ps.rank == "Silve") {
                points = (ps.matchWin * 30 - ps.matchLose * 15);
            } else if (ps.rank == "Gold") {
                points = (ps.matchWin * 20 - ps.matchLose * 15);
            } else if (ps.rank == "Platinum") {
                points = (ps.matchWin * 20 - ps.matchLose * 20);
            } else if (ps.rank == "Emerald") {
                points = (ps.matchWin * 15 - ps.matchLose * 20);
            } else if (ps.rank == "Diamond") {
                points = (ps.matchWin * 10 - ps.matchLose * 20);
            } else if (ps.rank == "Master") {
                points = (ps.matchWin * 5 - ps.matchLose * 15);
            } else if (ps.rank == "Grandmaster") {
                points = (ps.matchWin * 5 - ps.matchLose * 20);
            } else {
                points = (ps.matchWin * 5 - ps.matchLose * 30);
            }
            let winStreakbonusPoints = 0;
            if (ps.winStreak > 7) {
                winStreakbonusPoints = 1;
            } else if (ps.winStreak > 5) {
                winStreakbonusPoints = 2;
            } else if (ps.winStreak > 3) {
                winStreakbonusPoints = 3;
            }
            let loseStreakbonusPoint = 0;
            if (ps.loseStreak > 7) {
                loseStreakbonusPoint = 1;
            } else if (ps.loseStreak > 5) {
                loseStreakbonusPoint = 2;
            } else if (ps.loseStreak > 3) {
                loseStreakbonusPoint = 3;
            }
            let bonusPointHonor = 0;
            if (ps.honorPoints == 5) {
                bonusPointHonor = 3;
            } else if (ps.honorPoints > 2) {
                bonusPointHonor = 2;
            } else if (ps.honorPoints > 0) {
                bonusPointHonor = 1;
            }
            ps.elo = ps.elo + points + winStreakbonusPoints - loseStreakbonusPoint + bonusPointHonor;
            if(ps.elo < 0){
                ps.elo = 0
            }
            if (ps.elo > 2500) {
                ps.rank = "Challenger";
            } else if (ps.elo > 2300) {
                ps.rank = "Grandmaster"
            } else if (ps.elo > 2100) {
                ps.rank = "Master"
            } else if (ps.elo > 1800) {
                ps.rank = "Diamond"
            } else if (ps.elo > 1600) {
                ps.rank = "Emerald"
            } else if (ps.elo > 1400) {
                ps.rank = "Platinum"
            } else if (ps.elo > 1200) {
                ps.rank = "Gold"
            } else if (ps.elo > 1000) {
                ps.rank = "Silve"
            } else if (ps.elo > 800) {
                ps.rank = "Bronze"
            } else{
                ps.rank = "Iron"
            }
        })
        PlayerStats.sort((a, b)=> b.elo - a.elo);
        fs.writeFile("day3/listPlayerStats.json", JSON.stringify(PlayerStats), (err)=>{
            if(err){
                console.error("error: ", err);
            }
            console.log("Save Elo Calculate");
        })
    }
    )
}