import * as readline from 'readline';
import { taskList, addTask, updateTaskStatus } from './Tasks';
import { addProject, getProjectByID, projectList } from './Projects';
import { userList, assignTaskToUser, viewUserTasks, addUser } from './Users';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const menu = () => {
    console.log("********** MENU ***********");
    console.log("1. List Project");
    console.log("2. List Task");
    console.log("3. List User");
    console.log("4. Add Project");
    console.log("5. Add Task to project");
    console.log("6. Add User");
    console.log("7. Project detail");
    console.log("8. Assign Task to User");
    console.log("9. View User's Tasks");
    console.log("10. Update Task Status");
    console.log("0. Exit");

    rl.question("Please Enter your choose: ", (number) => {
        switch (parseInt(number)) {
            case 1:
                projectList.map(item => {
                    console.log(item);
                });
                menu();
                break;
            case 2:
                taskList.map(item => {
                    console.log(item);
                });
                menu();
                break;
            case 3:
                userList.map(item => {
                    console.log(item);
                });
                menu();
                break;
            case 4:
                addProject(() => {
                    menu();
                })
                break;
            case 5:
                addTask(() => {
                    menu();
                })
                break;
            case 6:
                addUser(() => {
                    menu();
                })
                break;
            case 7:
                getProjectByID(() => {
                    menu();
                })
                break;
            case 8:
                assignTaskToUser(() => menu());
                break;
            case 9:
                viewUserTasks(() => menu());
                break;
            case 10:
                updateTaskStatus(() => menu());
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