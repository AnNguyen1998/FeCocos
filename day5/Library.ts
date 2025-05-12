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
}
interface Lending {
    idbook: number;
    iduser: number;
    borrowedDate: Date;
    bookReturnDate: Date;
}
class BookLending {
    private lendingInformation: Lending;
    constructor(lendingInformation: Lending) {
        this.lendingInformation = lendingInformation;
    }
    getLendingInformation() {
        return this.lendingInformation;
    }
    setLendingInformation(b: Book, u: User, borrowedDate, bookReturnDate): string {
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
    constructor(user: User) {
        this.user = user;
    }
    getUser(): User {
        return this.user;
    }
    setUser(u: User): string {
        this.user.iduser = u.iduser;
        this.user.username = u.username;
        this.user.age = u.age;
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
                    bookList.push(book);
                    console.log("Book added successfully!");
                    callback();
                });
            });
        });
    });
}
const getBookByID = (id) => {
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
const deleteBook = (callback: () => void): void =>{
    rl.question("Enter ID of book you want to delete: ",(id)=>{
        const bookByID = getBookByID(id);
        bookByID[0].status = bookByID[0].status ? false : bookByID[0].status;
       [...bookList,bookByID];
       console.log("Delete successfully!");
       callback();
    })
}
const menu = () => {
    console.log("********** MENU ***********");
    console.log("1. List Book in library");
    console.log("2. Add book to library");
    console.log("3. Edit Book");
    console.log("4. Delete Book");
    console.log("0. Exit");

    rl.question("Please Enter your choose: ", (number) => {
        switch (parseInt(number)) {
            case 1:
                bookList.map(item => {
                    if(item.status){
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
                deleteBook(()=>{
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