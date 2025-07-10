// Client Class (Abstract)
class Client {
  constructor(name, document, documentType) {
    // Enforce that Client cannot be instantiated directly.
    if (this.constructor === Client) {
      throw new Error("Client is an abstract class");
    }
    this.name = name;
    this.document = document;
    this.documentType = documentType; // e.g., "CPF" or "CNPJ"
  }
}

// Individual Client Class - extends Client
class Individual extends Client {
  constructor(name, document) {
    super(name, document, "CPF"); // Automatically sets documentType to CPF
  }
}

// Legal Entity Client Class - extends Client
class LegalEntity extends Client {
  constructor(name, document) {
    super(name, document, "CNPJ"); // Automatically sets documentType to CNPJ
  }
}

// Example of creating specific client types
const client1 = new Individual("Daniel", "12.133.144-30");
const client2 = new LegalEntity("Daniel's Snacks", "122.133.144/0001-01");

console.log(client1);
console.log(client2);

// --- Bank Account System (Adapted) ---

// Abstract BankAccount Class
class BankAccount {
  constructor(client, number) {
    // Enforce that BankAccount cannot be instantiated directly.
    if (this.constructor === BankAccount) {
      throw new Error("BankAccount is an abstract class");
    }

    this.client = client;   // Composing the Client object (Individual or LegalEntity)
    this.number = number;   // The account number
    this.balance = 0;       // Initial balance is zero
  }

  // Getter to retrieve formatted client data
  get clientData() {
    return `${this.client.name}, ${this.client.documentType}: ${this.client.document}`;
    // The commented-out code is an alternative if the document type wasn't explicitly
    // stored or if specific formatting per type was needed.
    // if (this.client.constructor === Individual) {
    //     return `${this.client.name}, document: ${this.client.cpf}`
    // } else {
    //     return `${this.client.name}, document: ${this.client.cnpj}`
    // }
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
  withdraw(amount) {
    let available = this.balance + this.limit;
    if (amount > available) {
      throw new Error("Insufficient balance");
    }
    this.balance -= amount;
  }
}

// --- Example Usage with New Client Types ---

// Create Client instances
const danielIndividual = new Individual("Daniel", "12.133.144-10");
const mariaLegalEntity = new LegalEntity("Maria's Bakery", "123.123.123/0001-01");

// Create account instances, passing specific Client objects
const savingsAcc1 = new SavingsAccount(danielIndividual, 1);
const savingsAcc2 = new SavingsAccount(mariaLegalEntity, 2); // A legal entity with a savings account
const checkingAcc1 = new CheckingAccount(mariaLegalEntity, 3); // A legal entity with a checking account

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

// --- Using the new clientData getter ---
console.log(checkingAcc1.clientData); // Output: Maria's Bakery, CNPJ: 123.123.123/0001-01
console.log(savingsAcc1.clientData);  // Output: Daniel, CPF: 12.133.144-10
console.log(savingsAcc2.clientData);  // Output: Maria's Bakery, CNPJ: 123.123.123/0001-01
