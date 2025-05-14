import { rl } from './LibraryApp';
import { getBookByID } from './Books';
import { getUserByID } from './Users';
import { Book } from './Books';
import { User } from './Users';

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

const lendingList: Lending[] = [];

export const processLendBook = (callback: () => void): void => {
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

export const processReturnBook = (callback: () => void): void => {
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

export const viewLendingHistory = (): void => {
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

export const userBorrowBooks = (callback: () => void): void => {
    rl.question("Enter ID user you want to check: ", (id) => {
        const user = getUserByID(id)[0];
        console.log(`Book that ${user.username} borrowed: `);
        lendingList.map(item => {
            if (item.iduser == parseInt(id)) {
                const book = getBookByID(item.idbook)[0];
                console.log(`Book: ${book.bookName}`);
            }
        })
        callback();
    })
};