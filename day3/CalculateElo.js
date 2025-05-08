const path = 'day3/listPlayerStats.json'
const fs = require('fs')
if (fs.existsSync(path)) {
    fs.readFile('day3/listPlayerStats.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Failed to read the file:", err);
            return;
        }
        data && data.map((dt)=>{
            if(dt.honorPoints < 2){
                if(dt.winRate > 50){
                    if(dt.winStreak > 5){
                        
                    }
                    if(dt.winStreak > 2){
                        
                    }
                }else{
    
                }
            }else if(dt.honorPoints >= 2 && dt.honorPoints < 4){
    
            }else{
    
            }
        })
    }
    )
}