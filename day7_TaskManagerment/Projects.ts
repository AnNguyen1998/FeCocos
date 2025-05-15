import { rl } from './TaskApp'
import { listTaskByProjectID, taskList } from './Tasks';
interface Project {
    id: number;
    nameProject: string;
    process: number;
    beginDate: Date;
    endDate: Date;
}

class Projects {
    private project: Project;
    constructor() {
        this.project = {
            id: 0,
            nameProject: "",
            process: 0,
            beginDate: new Date(""),
            endDate: new Date(""),
        };
    }
    getProject(): any {
        return this.project;
    }
    setProject(newValue: Project): void {
        this.project = newValue;
    }
}

export const projectList: Project[] = [
    {
        id: 1,
        nameProject: "Project A",
        process: 35,
        beginDate: new Date("2023-06-15"),
        endDate: new Date("2023-06-30")
    }
];

export const addProject = (callback: () => void): void => {
    const project = {
        id: 0,
        nameProject: "",
        process: 0,
        beginDate: new Date(""),
        endDate: new Date("")
    };

    rl.question("Enter Name of Project: ", (name) => {
        rl.question("Enter Begin Date(YYYY-MM-DD): ", (beginDate) => {
            rl.question("Enter End Date(YYYY-MM-DD): ", (endDate) => {
                project.id = projectList.length + 1;
                project.nameProject = name;
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
                project.beginDate = new Date(beginDate);
                project.endDate = new Date(endDate);
                const createTask = new Projects();
                createTask.setProject(project);
                projectList.push(createTask.getProject());
                console.log("Create Project Successfully!!!");
                callback();
            })
        })
    })
}

export const getProjectByID = (callback: () => void): void => {
    rl.question("Enter Project ID you want to see: ", (id) => {
        projectList.map((item) => {
            console.log("Infomation of Project")
            if (item.id == parseInt(id)) {
                console.log(item)
            }
        })
        console.log("All tasks of this Project")
        listTaskByProjectID(id);
        callback();
    })
}

export const calculateProjectProcess = (projectId: number): number => {

    const projectTasks = taskList.filter(task => task.idProject === projectId);

    if (projectTasks.length === 0) {
        return 0;
    }

    const completedTasks = projectTasks.filter(
        task => task.status.toLowerCase() === "completed").length;

    const process = Math.round((completedTasks / projectTasks.length) * 100);

    const project = projectList.find(p => p.id === projectId);
    if (project) {
        project.process = process;
    }

    return process;
};
