interface Book {
    idbook: number;
    bookName: string;
    quantity: number;
    type: string;
    author: string;
    status: boolean;
}
interface User {
    iduser: number;
    username: string;
    age: number;
    status: boolean;
}
interface Lending {
    idbook: number;
    iduser: number;
    borrowedDate: Date;
    bookReturnDate: Date;
}
class BookLending<T extends Book, U extends User> {
    private lendingInformation: Lending;
    constructor(lendingInformation: Lending) {
        this.lendingInformation = lendingInformation;
    }
    getLendingInformation() {
        return this.lendingInformation;
    }
    setLendingInformation(b: T, u: U, borrowedDate: Date, bookReturnDate: Date): string {
        this.lendingInformation.idbook = b.idbook;
        this.lendingInformation.iduser = u.iduser;
        this.lendingInformation.borrowedDate = borrowedDate;
        this.lendingInformation.bookReturnDate = bookReturnDate;
        return "Saved!";
    }
}
class Library {
    private book: Book;
    constructor() {
        this.book = {
            idbook: 0,
            bookName: '',
            quantity: 0,
            type: '',
            author: '',
            status: true
        };
    }
    getBook(): Book {
        return this.book;
    }
    setBook(b: Book): string {
        this.book.idbook = b.idbook;
        this.book.author = b.author;
        this.book.bookName = b.bookName;
        this.book.quantity = b.quantity;
        this.book.type = b.type;
        return "Saved!";
    }
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

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const bookList: Book[] = [
    {
        idbook: 1,
        bookName: "The Great Gatsby",
        quantity: 5,
        type: "Fiction",
        author: "F. Scott Fitzgerald",
        status: true
    },
    {
        idbook: 2,
        bookName: "To Kill a Mockingbird",
        quantity: 3,
        type: "Fiction",
        author: "Harper Lee",
        status: true
    },
    {
        idbook: 3,
        bookName: "1984",
        quantity: 4,
        type: "Science Fiction",
        author: "George Orwell",
        status: false
    }
];
const userList: User[] = [
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
const lendingList: Lending[] = [];

const InsertBook = (callback: () => void): void => {
    const book: Book = {
        idbook: 0,
        bookName: '',
        quantity: 0,
        type: '',
        author: '',
        status: true
    }
    const library = new Library();
    rl.question("Name of book: ", (name) => {
        rl.question("Quantity of book: ", (quantity) => {
            rl.question("Type of book: ", (type) => {
                rl.question("Author of book: ", (author) => {
                    book.idbook = bookList.length + 1;
                    book.bookName = name;
                    book.quantity = quantity;
                    book.type = type;
                    book.author = author;
                    library.setBook(book);
                    bookList.push(library.getBook());
                    console.log("Book added successfully!");
                    callback();
                });
            });
        });
    });
}
const getBookByID = (id): Book[] => {
    const getByID = bookList.filter(item => item.idbook == id);
    return getByID;
}
const EditBook = (callback: () => void): void => {
    rl.question("Enter ID of book you want to Edit: ", (id) => {
        const bookEdit = getBookByID(id);
        console.log(bookEdit);
        rl.question("Enter new name (Enter is skip): ", (name) => {
            rl.question("Enter new quantity(Enter is skip): ", (quantity) => {
                rl.question("Enter new type(Enter is skip): ", (type) => {
                    rl.question("Enter new author(Enter is skip): ", (author) => {
                        rl.question("Change status(Enter is skip): ", (status) => {
                            bookEdit[0].bookName = name ? name : bookEdit[0].bookName;
                            bookEdit[0].quantity = quantity ? quantity : bookEdit[0].quantity;
                            bookEdit[0].type = type ? type : bookEdit[0].type;
                            bookEdit[0].author = author ? author : bookEdit[0].author;
                            bookEdit[0].status = status ? status : bookEdit[0].status;
                            [...bookList, bookEdit];
                            console.log("Update book successfully!");
                            callback();
                        })
                    })
                })
            })
        })
    })
}
const deleteBook = (callback: () => void): void => {
    rl.question("Enter ID of book you want to delete: ", (id) => {
        const bookByID = getBookByID(id);
        bookByID[0].status = bookByID[0].status ? false : true;
        [...bookList, bookByID];
        console.log("Delete successfully!");
        callback();
    })
}
const processLendBook = (callback: () => void): void => {
    rl.question("Enter user ID: ", (userId) => {
        rl.question("Enter book ID: ", (bookId) => {
            const user = getUserByID(parseInt(userId));
            const book = getBookByID(parseInt(bookId));

            if (user.length === 0 || book.length === 0) {
                console.log("User or book not found!");
                callback();
                return;
            }

            if (!user[0].status || !book[0].status) {
                console.log("User or book is not active!");
                callback();
                return;
            }

            if (book[0].quantity <= 0) {
                console.log("Book is out of stock!");
                callback();
                return;
            }

            const existingLending = lendingList.find(
                lending => lending.iduser === user[0].iduser &&
                    lending.idbook === book[0].idbook
            );

            if (existingLending) {
                console.log("User already has this book!");
                callback();
                return;
            }

            const borrowedDate = new Date();
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + 14);

            const lending = new BookLending<Book, User>({
                idbook: book[0].idbook,
                iduser: user[0].iduser,
                borrowedDate: borrowedDate,
                bookReturnDate: returnDate
            });

            lendingList.push(lending.getLendingInformation());

            book[0].quantity -= 1;
            console.log("Book lent successfully!");
            console.log("Return date:", returnDate.toDateString());
            callback();
        });
    });
};

const processReturnBook = (callback: () => void): void => {
    rl.question("Enter user ID: ", (userId) => {
        rl.question("Enter book ID: ", (bookId) => {
            const user = getUserByID(parseInt(userId));
            const book = getBookByID(parseInt(bookId));

            if (user.length === 0 || book.length === 0) {
                console.log("User or book not found!");
                callback();
                return;
            }

            if (!user[0].status || !book[0].status) {
                console.log("User or book is not active!");
                callback();
                return;
            }

            const lendingIndex = lendingList.findIndex(
                lending => lending.iduser === user[0].iduser &&
                    lending.idbook === book[0].idbook
            );

            if (lendingIndex === -1) {
                console.log("No lending history found for this user and book!");
                callback();
                return;
            }

            lendingList.splice(lendingIndex, 1);

            book[0].quantity += 1;
            console.log("Book returned successfully!");
            callback();
        });
    });
};

const viewLendingHistory = (): void => {
    console.log("\nCurrent Lending History:");
    lendingList.forEach((lending, index) => {
        const user = getUserByID(lending.iduser)[0];
        const book = getBookByID(lending.idbook)[0];
        console.log(`\nHistory ${index + 1}:`);
        console.log(`User: ${user.username}`);
        console.log(`Book: ${book.bookName}`);
        console.log(`Borrowed Date: ${lending.borrowedDate.toDateString()}`);
        console.log(`Return Date: ${lending.bookReturnDate.toDateString()}`);
    });
};

const userBorrowBooks = (callback: () => void): void => {
    rl.question("Enter ID user you want to check: ", (id) => {
        const user = getUserByID(id)[0];
        console.log(`Book that ${user.username} borrowed: `);
        lendingList.map(item => {
            if (item.iduser == id) {
                const book = getBookByID(item.idbook)[0];
                console.log(`Book: ${book.bookName}`);
            }
        })
        callback();
    })
};

const menu = () => {
    console.log("********** MENU ***********");
    console.log("1. List Book in library");
    console.log("2. Add book to library");
    console.log("3. Edit Book");
    console.log("4. Delete Book");
    console.log("5. Lend Book");
    console.log("6. Return Book");
    console.log("7. View Lending History");
    console.log("8. Change to User Menu");
    console.log("0. Exit");

    rl.question("Please Enter your choose: ", (number) => {
        switch (parseInt(number)) {
            case 1:
                bookList.map(item => {
                    if (item.status) {
                        console.log(item);
                    }
                });
                menu();
                break;
            case 2:
                InsertBook(() => {
                    menu();
                });
                break;
            case 3:
                EditBook(() => {
                    menu();
                });
                break;
            case 4:
                deleteBook(() => {
                    menu();
                });
                break;
            case 5:
                processLendBook(() => {
                    menu();
                });
                break;
            case 6:
                processReturnBook(() => {
                    menu();
                });
                break;
            case 7:
                viewLendingHistory();
                menu();
                break;
            case 8:
                userMenu();
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
const userMenu = () => {
    console.log("********** USER MENU ***********");
    console.log("1. List User");
    console.log("2. Add User");
    console.log("3. Edit User");
    console.log("4. Delete User");
    console.log("5. Books that user borrowed")
    console.log("6. Change to Book Menu");
    console.log("0. Exit");
    rl.question("Please Enter your choose: ", (number) => {
        switch (parseInt(number)) {
            case 1:
                userList.map(item => {
                    if (item.status) {
                        console.log(item);
                    }
                });
                userMenu();
                break;
            case 2:
                InsertUser(() => {
                    userMenu();
                });
                break;
            case 3:
                EditUser(() => {
                    userMenu();
                });
                break;
            case 4:
                deleteUser(() => {
                    userMenu();
                })
                break;
            case 5:
                userBorrowBooks(() => {
                    userMenu();
                })
                break;
            case 6:
                menu();
                break;
            case 0:
                console.log("Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice!");
                userMenu();
                break;
        }
    });
}
const InsertUser = (callback: () => void): void => {
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
            user.age = age;
            user.iduser = userList.length + 1;
            addUser.setUser(user);
            userList.push(addUser.getUser());
            console.log("Add user successfully!");
            callback();
        })
    })
}
const getUserByID = (id): User[] => {
    const getUser = userList.filter(item => item.iduser == id);
    return getUser;
}
const EditUser = (callback: () => void): void => {
    rl.question("Enter ID user you want to edit: ", (id) => {
        const getuser = getUserByID(id);
        rl.question("Enter new username: ", (username: string | number) => {
            rl.question("Enter age: ", (age: number) => {
                rl.question("Change status true/false: ", (status: true | false) => {
                    getuser[0].username = username.toString() ? username.toString() : getuser[0].username;
                    getuser[0].age = age ? age : getuser[0].age;
                    getuser[0].status = status ? status : getuser[0].status;
                    [...userList, getuser];
                    console.log("Update user successfully!");
                    callback();
                })
            })
        })
    });
}
const deleteUser = (callback: () => void): void => {
    rl.question("Enter ID user you want to delete: ", (id) => {
        const getuser = getUserByID(id);
        getuser[0].status = getuser[0] ? false : true;
        [...userList, getuser];
        console.log("Delete user successfully!");
        callback();
    })
}
menu();