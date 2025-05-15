import { rl } from './TaskApp'
import { projectList, calculateProjectProcess } from './Projects';

interface Task {
    id: number;
    nameTask: string;
    status: string;
    beginDate: Date;
    endDate: Date;
    idProject: number | null;
    idUser: number | null;
}

class Tasks {
    private task: Task;
    constructor() {
        this.task = {
            id: 0,
            nameTask: "",
            status: "pending",
            beginDate: new Date(""),
            endDate: new Date(""),
            idProject: null,
            idUser: null
        };
    }
    getTask(): any {
        return this.task;
    }
    setTask(newValue: Task): void {
        this.task = newValue;
    }
}

export const taskList: Task[] = [
    {
        id: 1,
        nameTask: "Complete project proposal",
        status: "pending",
        beginDate: new Date("2023-06-15"),
        endDate: new Date("2023-06-30"),
        idProject: 1,
        idUser: 1
    },
    {
        id: 2,
        nameTask: "Schedule team meeting",
        status: "completed",
        beginDate: new Date("2023-06-10"),
        endDate: new Date("2023-06-15"),
        idProject: 1,
        idUser: 1
    },
    {
        id: 3,
        nameTask: "Review code changes",
        status: "in-progress",
        beginDate: new Date("2023-06-15"),
        endDate: new Date("2023-06-20"),
        idProject: 1,
        idUser: 1
    }
];

export const addTask = (callback: () => void): void => {
    rl.question("Enter ID of project you want to add Task: ", (id) => {
        const projectId = parseInt(id);
        const project = projectList.find(item => item.id === projectId);
        
        if (!project) {
            console.log("Project does not exist!");
            callback();
            return;
        }
        
        if (project.process === 100) {
            console.log("Cannot add tasks to completed projects (100% progress)!");
            callback();
            return;
        }
        
        const task = {
            id: 0,
            nameTask: "",
            status: "pending",
            process: 0,
            beginDate: new Date(""),
            endDate: new Date(""),
            idProject: null as number | null,
            idUser: null
        };
        
        task.idProject = projectId;
        
        rl.question("Enter Name of Task: ", (name) => {
            rl.question("Enter status: ", (status) => {
                rl.question("Enter Begin Date(YYYY-MM-DD): ", (beginDate) => {
                    rl.question("Enter End Date(YYYY-MM-DD): ", (endDate) => {
                        task.id = taskList.length + 1;
                        task.nameTask = name;
                        task.status = status;
                        const beginDateObj = new Date(beginDate);
                        const endDateObj = new Date(endDate);
                        if (isNaN(beginDateObj.getTime()) || isNaN(endDateObj.getTime())) {
                            console.log("Invalid date format! Use YYYY-MM-DD format.");
                            callback();
                            return;
                        }
                        if (endDateObj <= beginDateObj) {
                            console.log("End date must be after begin date!");
                            callback();
                            return;
                        }
                        if (beginDateObj < project.beginDate) {
                            console.log("Task begin date cannot be before project begin date!");
                            callback();
                            return;
                        }

                        if (endDateObj > project.endDate) {
                            console.log("Task end date cannot be after project end date!");
                            callback();
                            return;
                        }
                        task.beginDate = new Date(beginDate);
                        task.endDate = new Date(endDate);
                        const createTask = new Tasks();
                        createTask.setTask(task);
                        taskList.push(createTask.getTask());
                        console.log("Create Task Successfully!!!");
                        calculateProjectProcess(projectId);
                        callback();
                    })
                })
            })
        })
    })
}

export const listTaskByProjectID = (id): void => {
    taskList.map(item => {
        if (item.idProject == parseInt(id)) {
            console.log(item)
        }
    })
}

export const updateTaskStatus = (callback: () => void): void => {
    rl.question("Enter Task ID: ", (taskId) => {
        const task = taskList.find(t => t.id === parseInt(taskId));
        
        if (!task) {
            console.log("Task not found!");
            callback();
            return;
        }
        
        rl.question("Enter new status (pending/in-progress/completed): ", (status) => {
            task.status = status.toLowerCase();
            console.log(`Task status updated to: ${status}`);
            
            if (task.idProject) {
                const newProcess = calculateProjectProcess(task.idProject);
                console.log(`Project completion updated to: ${newProcess}%`);
            }
            
            callback();
        });
    });
};
