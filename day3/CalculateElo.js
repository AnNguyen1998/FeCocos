const path = 'day3/listPlayerStats.json'
const fs = require('fs')
if (fs.existsSync(path)) {
    fs.readFile('day3/listPlayerStats.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Failed to read the file:", err);
            return;
        }
        console.log(data)
    }
    )
}