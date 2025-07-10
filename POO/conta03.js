// Client Class
class Client {
    constructor(name, document) {
        this.name = name;
        this.document = document; // e.g., ID card number, passport number
    }
}

// Abstract BankAccount Class
class BankAccount {
    constructor(client, number) {
        // Enforce that BankAccount cannot be instantiated directly.
        // It serves as an abstract base class.
        if (this.constructor === BankAccount) {
            throw new Error("BankAccount is an abstract class");
        }

        this.client = client;   // Composing the Client object
        this.number = number;   // The account number
        this.balance = 0;       // Initial balance is zero
    }

    // Method to deposit money into the account
    deposit(amount) {
        this.balance += amount;
    }

    // Abstract method: must be implemented by concrete subclasses.
    withdraw() {
        throw new Error("withdraw() method must be implemented");
    }
}

// SavingsAccount Class - extends BankAccount
class SavingsAccount extends BankAccount {
    constructor(client, number) {
        super(client, number); // Call the parent BankAccount constructor
        this.anniversary = Date.now(); // Specific property: account creation timestamp
    }

    // Concrete implementation of the withdraw method for SavingsAccount.
    // Withdrawals are limited strictly by the current balance.
    withdraw(amount) {
        if (amount > this.balance) {
            throw new Error("Insufficient balance");
        }
        this.balance -= amount;
    }
}

// CheckingAccount Class - extends BankAccount
class CheckingAccount extends BankAccount {
    constructor(client, number) {
        super(client, number); // Call the parent BankAccount constructor
        this.limit = 0; // Specific property: overdraft limit
    }

    // Concrete implementation of the withdraw method for CheckingAccount.
    // Withdrawals can use the balance plus the available limit.
    withdraw(amount) {
        let available = this.balance + this.limit;
        if (amount > available) {
            throw new Error("Insufficient balance");
        }
        this.balance -= amount;
    }
}

// --- Example Usage ---

// Create Client instances
const daniel = new Client("Daniel", "123.456.789-00");
const maria = new Client("Maria", "987.654.321-00");

// Create account instances, passing Client objects
const savingsAcc1 = new SavingsAccount(daniel, 1);
const savingsAcc2 = new SavingsAccount(maria, 2);
const checkingAcc1 = new CheckingAccount(maria, 3);

// Perform operations
savingsAcc1.deposit(1000); // Daniel's savings: 1000
checkingAcc1.limit = 1000; // Maria's checking limit: 1000
checkingAcc1.deposit(2000); // Maria's checking: 2000

// Maria's checking account: balance 2000, limit 1000. Available 3000. Withdraw 3000.
// Balance becomes 0.
try {
    checkingAcc1.withdraw(3000);
    console.log(checkingAcc1); // Log the checking account after withdrawal
} catch (error) {
    console.error("Error withdrawing from checking account:", error.message);
}


// Daniel's savings account: balance 1000. Withdraw 500.
// Balance becomes 500.
try {
    savingsAcc1.withdraw(500);
    console.log(savingsAcc1); // Log Daniel's savings after withdrawal
} catch (error) {
    console.error("Error withdrawing from savings account:", error.message);
}

// Log Maria's second savings account (should still be 0 balance)
console.log(savingsAcc2);
