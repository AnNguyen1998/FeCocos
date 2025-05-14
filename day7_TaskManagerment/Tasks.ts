import { rl } from './TaskApp'
interface Task {
    id: number;
    nameTask: string;
    status: string;
    process: number;
    beginDate: Date;
    endDate: Date;
}

class Tasks {
    private task: Task;
    constructor() {
        this.task = {
            id : 0,
            nameTask : "",
            status: "pending",
            process: 0,
            beginDate: new Date(""),
            endDate: new Date("")
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
      process: 25,
      beginDate: new Date("2023-06-15"),
      endDate: new Date("2023-06-30")
    },
    {
      id: 2,
      nameTask: "Schedule team meeting",
      status: "completed",
      process: 100,
      beginDate: new Date("2023-06-10"),
      endDate: new Date("2023-06-15")
    },
    {
      id: 3,
      nameTask: "Review code changes",
      status: "in-progress",
      process: 75,
      beginDate: new Date("2023-06-15"),
      endDate: new Date("2023-06-20")
    }
  ];

export const addTask = (callback: () => void): void => {
    const task = {
        id : 0,
        nameTask : "",
        status: "pending",
        process: 0,
        beginDate: new Date(""),
        endDate: new Date("")
    };

    rl.question("Enter Name of Task: ", (name) => {
        rl.question("Enter status: ", (status) => {
            rl.question("Enter process: ", (process) => {
                rl.question("Enter Begin Date: ", (beginDate) => {
                    rl.question("Enter End Date: ", (endDate) => {
                        task.id = taskList.length + 1;
                        task.nameTask = name;
                        task.status = process;
                        task.beginDate = new Date(beginDate);
                        task.endDate = new Date(endDate);
                        const createTask = new Tasks();
                        createTask.setTask(task);
                        taskList.push(createTask.getTask());
                        console.log("Create Task Successfully!!!");
                        callback();
                    })
                })
            })
        })
    })
}
