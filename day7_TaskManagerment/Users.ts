import { rl } from './TaskApp'
import { taskList } from './Tasks'

interface User {
    id: number;
    username: string;
    status: boolean;
    assignedTasks: number[];
}

class Users {
    private user: User;
    constructor() {
        this.user = {
            id: 0,
            username: "",
            status: true,
            assignedTasks: []
        };
    }
    getUser(): any {
        return this.user;
    }
    setUser(newValue: User): void {
        this.user = newValue;
    }
}

export const userList: User[] = [
    {
        id: 1,
        username: "John",
        status: true,
        assignedTasks: []
    }
];

export const addUser = (callback: () => void): void => {
    const user = {
        id: 0,
        username: "",
        status: true,
        assignedTasks: []
    };

    rl.question("Enter Username: ", (name) => {
        rl.question("Enter status: ", (status) => {
            user.id = userList.length + 1;
            user.username = name;
            if (status == 'true') {
                user.status = true;
            } else if (status == 'false') {
                user.status = false;
            }
            const createUser = new Users();
            createUser.setUser(user);
            userList.push(createUser.getUser());
            console.log("Create Project Successfully!!!");
            callback();
        })
    })
}

export const assignTaskToUser = (callback: () => void): void => {
    rl.question("Enter User ID: ", (userId) => {
        rl.question("Enter Task ID: ", (taskId) => {
            const userIdNum = parseInt(userId);
            const taskIdNum = parseInt(taskId);
            
            const user = userList.find(u => u.id === userIdNum);
            const task = taskList.find(t => t.id === taskIdNum);
            
            if (!user) {
                console.log("User not found!");
                callback();
                return;
            }
            
            if (!task) {
                console.log("Task not found!");
                callback();
                return;
            }
            
            if (task.status.toLowerCase() === "completed" || task.status.toLowerCase() === "done") {
                console.log("Cannot assign completed tasks to users!");
                callback();
                return;
            }
            
            if (user.assignedTasks.includes(taskIdNum)) {
                console.log("Task is already assigned to this user!");
                callback();
                return;
            }
            
            user.assignedTasks.push(taskIdNum);
            
            if (task.idUser != userIdNum) {
                task.idUser = userIdNum;
            }
            
            console.log(`Task "${task.nameTask}" assigned to user "${user.username}"`);
            callback();
        });
    });
};

export const viewUserTasks = (callback: () => void): void => {
    rl.question("Enter User ID: ", (userId) => {
        const userIdNum = parseInt(userId);
        const user = userList.find(u => u.id === userIdNum);
        
        if (!user) {
            console.log("User not found!");
            callback();
            return;
        }
        
        console.log(`\n=== Tasks assigned to ${user.username} ===`);
        
        if (user.assignedTasks.length === 0) {
            console.log("No tasks assigned to this user.");
        } else {
            user.assignedTasks.forEach(taskId => {
                const task = taskList.find(t => t.id === taskId);
                if (task) {
                    console.log(`ID: ${task.id}, Name: ${task.nameTask}, Status: ${task.status}`);
                    console.log(`Dates: ${task.beginDate.toISOString().split('T')[0]} to ${task.endDate.toISOString().split('T')[0]}`);
                    console.log("-------------------");
                }
            });
        }
        
        callback();
    });
};
