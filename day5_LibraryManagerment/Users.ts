import {rl} from './LibraryApp';

export interface User {
    iduser: number;
    username: string;
    age: number;
    status: boolean;
}

class Users {
    private user: User;
    constructor() {
        this.user = {
            iduser: 0,
            username: '',
            age: 0,
            status: true
        };
    }
    getUser(): User {
        return this.user;
    }
    setUser(u: User): string {
        this.user.iduser = u.iduser;
        this.user.username = u.username;
        this.user.age = u.age;
        this.user.status = u.status;
        return "Saved!";
    }
}

export const userList: User[] = [
    {
        iduser: 1,
        username: "Gatsby",
        age: 25,
        status: true
    },
    {
        iduser: 2,
        username: "Mockingbird",
        age: 33,
        status: true
    },
    {
        iduser: 3,
        username: "Memory1984",
        age: 24,
        status: true
    }
];

export const InsertUser = (callback: () => void): void => {
    const user: User = {
        iduser: 0,
        username: '',
        age: 0,
        status: true
    }
    const addUser = new Users();
    rl.question("Enter username: ", (username) => {
        rl.question("Enter age: ", (age) => {
            user.username = username;
            user.age = parseInt(age);
            user.iduser = userList.length + 1;
            addUser.setUser(user);
            userList.push(addUser.getUser());
            console.log("Add user successfully!");
            callback();
        })
    })
}
export const getUserByID = (id): User[] => {
    const getUser = userList.filter(item => item.iduser == id);
    return getUser;
}
export const EditUser = (callback: () => void): void => {
    rl.question("Enter ID user you want to edit: ", (id) => {
        const getuser = getUserByID(id);
        rl.question("Enter new username: ", (username) => {
            rl.question("Enter age: ", (age) => {
                rl.question("Change status true/false: ", (status) => {
                    getuser[0].username = username ? username : getuser[0].username;
                    getuser[0].age = parseInt(age) ? parseInt(age) : getuser[0].age;
                    if (status == 'true') {
                        getuser[0].status = true;
                    }else if (status == 'false') {
                        getuser[0].status = false;
                    }
                    [...userList, getuser];
                    console.log("Update user successfully!");
                    callback();
                })
            })
        })
    });
}
export const deleteUser = (callback: () => void): void => {
    rl.question("Enter ID user you want to delete: ", (id) => {
        const getuser = getUserByID(id);
        getuser[0].status = getuser[0] ? false : true;
        [...userList, getuser];
        console.log("Delete user successfully!");
        callback();
    })
}