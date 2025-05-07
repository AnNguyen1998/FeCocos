let Student = []
const path = 'liststudent.json'
const fs = require('fs')
if (fs.existsSync(path)) {
    fs.readFile('liststudent.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Failed to read the file:", err);
            return;
        }
        Student = data;
    });
} else {
    Student = [
        {
            id: 1,
            name: "An",
            age: 27,
            grade: 7
        }
    ]
}
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const menu = () => {
    console.log("Please Enter your choose: ")
console.log("0 - exit")
console.log("1 - show list students")
console.log("2 - add new student")
console.log("3 - search student by name")
console.log("4 - display statistics")
console.log("5 - save the student to A file")
rl.question("Please select feature: ", (number) => {
    switch(number = parseInt(number)){
        case 0:
            rl.close();
            break;
        case 1:
        console.log("list student: ")
        console.log(Student)
        menu();
        break;
        case 2:
        rl.question("Enter student id: ", (id) => {
            rl.question("Enter student name: ", (namest) => {
                rl.question("Enter student age: ", (age) => {
                    rl.question("Enter student grade: ", (grade) => {
                        Student.push({ id: parseInt(id), name: namest, age: parseInt(age), grade: parseInt(grade) })
                        console.log(Student)
                        menu();
                    })
                })
            })
        })
        break;
        case 3:
        rl.question("Enter student name: ", (namestudent) => {
            let filterStudent = Student.filter(st => st.name == namestudent);
            console.log(filterStudent);
            menu();
        })
        break;
        case 4:
        console.log("Total number of Students: " + Student.length);
        let sum = 0;
        Student.map(st => {
            sum += st.grade;
        })
        let avg = sum / Student.length;
        console.log("Average Grade of All Student: " + avg)
        let excellent = Student.filter(st => st.grade >= 8)
        let good = Student.filter(st => st.grade >= 6.5 && st.grade < 8)
        let average = Student.filter(st => st.grade < 6.5)
        console.log("Number of excellent: " + excellent.length)
        console.log("Number of good: " + good.length)
        console.log("Number of average: " + average.length)
        menu();
        break;
        case 5:
        var fs = require('fs');
        fs.appendFile('liststudent.json', JSON.stringify(Student), function (err) {
            if (err) throw err;
            console.log('Saved!');
            menu();
        });
        break;
        default:
            rl.close();
            menu();
    }
})
}
menu();
