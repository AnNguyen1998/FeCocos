const memberList = [
    { id: 1, role: "Main" },
    { id: 2, role: "Core" },
    { id: 3, role: "Core" },
    { id: 4, role: "Core" },
    { id: 5, role: "Core" },
    { id: 6, role: "Core" },
    { id: 7, role: "Bench" },
    { id: 8, role: "Bench" },
    { id: 9, role: "Bench" },
    { id: 10, role: "Bench" },
    { id: 11, role: "Bench" },
]
let match = [];
let notMatch = [];
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const findTeam = (ds) => {
    const main = ds.filter(tv => tv.role == "Main");
    const core = ds.filter(tv => tv.role == "Core");
    const bench = ds.filter(tv => tv.role == "Bench");
    let officialTeam = []
    for (co of core) {
        for (be of bench) {
            let team = [main[0].id, co.id, be.id]
            if (checkTeam(team, match, notMatch)) {
                officialTeam.push(team)
            }
        }
    }
    return officialTeam;
}
const checkTeam = (dh, bt, kph) => {
    let check = 0;
    for (let i = 0; i < bt.length; i++) {
        for (let j = 0; j < dh.length; j++) {
            if (dh[j] == bt[i]) {
                check += 1;
            }
        }
    }
    if (check < 2) {
        return false;
    }
    let check1 = 0;
    for (let i = 0; i < kph.length; i++) {
        for (let j = 0; j < dh.length; j++) {
            if (dh[j] == kph[i]) {
                check1 += 1;
            }
        }
    }
    if (check1 > 1) {
        return false;
    }
    return true;
}
const changeCondition = () => {
    rl.question("Coach change condition ? ", (choice) => {
        if (choice == 'n') {
            console.log("List Team: ", findTeam(memberList));
            if (checkTeam(prTeam, match, notMatch)) {
                console.log(prTeam, " can combine into 1 team");
            } else {
                console.log(prTeam, " can't combine into 1 team because not matching pairs. Matching paris are: ", match);
            }
            rl.close();
        }
        if (choice == 'y') {
            handleDH();
        }
    })
}
let prTeam = [];
const handleTeam = () => {
    rl.question("ID member match 1: ", (member1) => {
        rl.question("ID member match 2: ", (member2) => {
            rl.question("ID member not match 1: ", (member3) => {
                rl.question("ID member not match 2: ", (member4) => {
                    rl.question("ID member 1: ", (mem1) => {
                        rl.question("ID member 2: ", (mem2) => {
                            rl.question("ID member 3: ", (mem3) => {
                                prTeam = [parseInt(mem1), parseInt(mem2), parseInt(mem3)];
                                match = [parseInt(member1), parseInt(member2)]
                                console.log("member match: ", match);
                                notMatch = [parseInt(member3), parseInt(member4)];
                                console.log("member not match: ", notMatch);
                                changeCondition();
                            })
                        })
                    })
                })
            })
        })
    })
}
handleTeam();
