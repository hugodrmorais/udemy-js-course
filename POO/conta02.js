// Bank Account Challenge
/*
2. Create two classes that inherit from BankAccount
- CheckingAccount
- Limit
- SavingsAccount
- Anniversary
*/

class BankAccount {
    constructor(client, number) {
        // Enforces that BankAccount cannot be instantiated directly.
        // It must be extended by a subclass, acting as an abstract class.
        if (this.constructor === BankAccount) {
            throw new Error("BankAccount is an abstract class");
        }

        this.client = client;   // The account holder's name
        this.number = number;   // The account number
        this.balance = 0;       // Initial balance is zero for all accounts
    }

    // Method to deposit money into the account
    deposit(amount) {
        this.balance += amount;
    }

    // Abstract method: must be implemented by concrete subclasses.
    // Throws an error if called directly on the abstract class or if not overridden.
    withdraw() {
        throw new Error("withdraw() method must be implemented");
    }
}

class SavingsAccount extends BankAccount {
    constructor(client, number) {
        super(client, number); // Calls the parent BankAccount constructor to set client and number
        this.anniversary = Date.now(); // Specific property for SavingsAccount: creation timestamp
    }

    // Concrete implementation of the withdraw method for SavingsAccount.
    // Withdrawals are limited strictly by the current balance.
    withdraw(amount) {
        if (amount > this.balance) {
            throw new Error("Insufficient balance"); // Error if amount exceeds balance
        }
        this.balance -= amount; // Deduct the amount from the balance
    }
}

class CheckingAccount extends BankAccount {
    constructor(client, number) {
        super(client, number); // Calls the parent BankAccount constructor
        this.limit = 0; // Specific property for CheckingAccount: overdraft limit
    }

    // Concrete implementation of the withdraw method for CheckingAccount.
    // Withdrawals can use the balance plus the available limit.
    withdraw(amount) {
        let available = this.balance + this.limit; // Calculate total available funds
        if (amount > available) {
            throw new Error("Insufficient balance"); // Error if amount exceeds available funds
        }
        this.balance -= amount; // Deduct the amount from the balance
    }
}

// --- Example Usage ---

// // Create instances of the concrete account types
// const savingsAcc1 = new SavingsAccount("daniel", 1);
// const savingsAcc2 = new SavingsAccount("maria", 2);
// const checkingAcc1 = new CheckingAccount("joão", 3);

// // Deposit funds into accounts
// savingsAcc1.deposit(1000);
// checkingAcc1.limit = 1000; // Set a limit for the checking account
// checkingAcc1.deposit(2000);

// // Log the initial state of the checking account
// console.log(checkingAcc1);

// // Attempt a withdrawal from the checking account that uses the limit
// // Balance: 2000, Limit: 1000. Available: 3000. Withdrawing 3000.
// // New balance will be 0.
// try {
//     checkingAcc1.withdraw(3000);
//     console.log(checkingAcc1); // Log state after successful withdrawal
// } catch (error) {
//     console.error(error.message);
// }


// // Attempt a withdrawal from the savings account that exceeds the balance
// // Balance: 1000. Withdrawing 1001. This should throw an error.
// try {
//     savingsAcc1.withdraw(1001);
//     console.log(savingsAcc1); // This line won't be reached if an error is thrown
// } catch (error) {
//     console.error(error.message); // Log the "Insufficient balance" error
// }

// // Log the final state of the savings account (balance should still be 1000)
// console.log(savingsAcc1);
