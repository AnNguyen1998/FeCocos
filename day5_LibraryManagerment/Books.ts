import {rl} from './LibraryApp';

export interface Book {
    idbook: number;
    bookName: string;
    quantity: number;
    type: string;
    author: string;
    status: boolean;
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

export const bookList: Book[] = [
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
        status: true
    }
];

export const getBookByID = (id: number): Book[] => {
    return bookList.filter(book => book.idbook === parseInt(id.toString()));
};

export const InsertBook = (callback: ()=> void): void => {
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
                    book.quantity = parseInt(quantity);
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

export const EditBook = (callback: () => void): void => {
    rl.question("Enter ID of book you want to Edit: ", (id) => {
        const bookEdit = getBookByID(parseInt(id));
        console.log(bookEdit);
        rl.question("Enter new name (Enter is skip): ", (name) => {
            rl.question("Enter new quantity(Enter is skip): ", (quantity) => {
                rl.question("Enter new type(Enter is skip): ", (type) => {
                    rl.question("Enter new author(Enter is skip): ", (author) => {
                        rl.question("Change status(Enter is skip): ", (status) => {
                            bookEdit[0].bookName = name ? name : bookEdit[0].bookName;
                            bookEdit[0].quantity = parseInt(quantity) ? parseInt(quantity) : bookEdit[0].quantity;
                            bookEdit[0].type = type ? type : bookEdit[0].type;
                            bookEdit[0].author = author ? author : bookEdit[0].author;
                            if (status == 'true') {
                                bookEdit[0].status = true;
                            }else if (status == 'false') {
                                bookEdit[0].status = false;
                            }
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
export const deleteBook = (callback: () => void): void => {
    rl.question("Enter ID of book you want to delete: ", (id) => {
        const bookByID = getBookByID(parseInt(id));
        bookByID[0].status = bookByID[0].status ? false : true;
        [...bookList, bookByID];
        console.log("Delete successfully!");
        callback();
    })
}