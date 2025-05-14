import * as readline from 'readline';
import { bookList, InsertBook, EditBook, deleteBook } from './Books';
import { userList, InsertUser, EditUser, deleteUser  } from './Users';
import { processLendBook, processReturnBook, userBorrowBooks, viewLendingHistory} from './LendingBook';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
                InsertBook(()=>{
                    menu();
                })
                    
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
menu();