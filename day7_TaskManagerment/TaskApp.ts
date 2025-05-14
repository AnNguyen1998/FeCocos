import * as readline from 'readline';
import { taskList, addTask } from './Tasks';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const menu = () => {
    console.log("********** MENU ***********");
    console.log("1. List Task in project");
    console.log("2. Add Task to project");
    console.log("0. Exit");

    rl.question("Please Enter your choose: ", (number) => {
        switch (parseInt(number)) {
            case 1:
                taskList.map(item => {
                        console.log(item);
                });
                menu();
                break;
            case 2:
                addTask(()=>{
                    menu();
                })
                break;
            case 0:
                console.log("Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice!");
                menu();
                break;
        }
    });
}
menu();