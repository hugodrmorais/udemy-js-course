// Transfer Class
class Transfer {
  // Static method to perform a transfer between two bank accounts
  static execute(sourceAccount, destinationAccount, amount) {
    // Input validation: Ensure both accounts are instances of BankAccount or its subclasses.
    // Note: The original condition `!contaOrigem instanceof ContaBancaria` is slightly
    // incorrect due to operator precedence. It should be `!(contaOrigem instanceof ContaBancaria)`.
    // Corrected below for robustness.
    if (!(sourceAccount instanceof BankAccount) ||
      !(destinationAccount instanceof BankAccount)) {
      throw new Error("Accounts must inherit from BankAccount");
    }

    try {
      // Attempt to withdraw from the source account.
      // Polymorphism: The correct 'withdraw' method (Savings or Checking) is called automatically.
      sourceAccount.withdraw(amount);
      // Deposit the amount into the destination account.
      destinationAccount.deposit(amount);
      console.log(`Transfer successful! ${amount} transferred from account ${sourceAccount.number} to ${destinationAccount.number}.`);
    } catch (e) {
      // Catch any errors (e.g., "Insufficient balance") during the withdrawal process.
      console.error("Transfer failed:", e.message);
    }
  }
}

// --- Client Classes ---

// Client Class (Abstract)
class Client {
  constructor(name, document, documentType) {
    if (this.constructor === Client) {
      throw new Error("Client is an abstract class");
    }
    this.name = name;
    this.document = document; // e.g., ID card number, passport number
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

// --- Bank Account Classes ---

// Abstract BankAccount Class
class BankAccount {
  constructor(client, number) {
    if (this.constructor === BankAccount) {
      throw new Error("BankAccount is an abstract class");
    }

    this.client = client;
    this.number = number;
    this.balance = 0;
  }

  get clientData() {
    return `${this.client.name}, ${this.client.documentType}: ${this.client.document}`;
  }

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
    super(client, number);
    this.anniversary = Date.now(); // Account creation timestamp
  }

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
    super(client, number);
    this.limit = 0; // Overdraft limit
  }

  withdraw(amount) {
    let available = this.balance + this.limit;
    if (amount > available) {
      throw new Error("Insufficient balance");
    }
    this.balance -= amount;
  }
}

// --- Example Usage with New Client Types and Transfers ---

// Create Client instances
const danielIndividual = new Individual("Daniel", "12.133.144-10");
const mariaLegalEntity = new LegalEntity("Maria's Bakery", "123.123.123/0001-01");
const hugoIndividual = new Individual("Hugo", "99.888.777-66");

// Create account instances
const savingsAccDaniel = new SavingsAccount(danielIndividual, 1001);
const savingsAccMaria = new SavingsAccount(mariaLegalEntity, 1002);
const checkingAccMaria = new CheckingAccount(mariaLegalEntity, 2001);
const checkingAccHugo = new CheckingAccount(hugoIndividual, 2002);

// Initial deposits
savingsAccDaniel.deposit(1000);
checkingAccMaria.limit = 500;
checkingAccMaria.deposit(1500);
checkingAccHugo.deposit(200);

console.log("\n--- Initial Balances ---");
console.log("Daniel Savings:", savingsAccDaniel.balance);
console.log("Maria Checking:", checkingAccMaria.balance);
console.log("Hugo Checking:", checkingAccHugo.balance);

// --- Performing Transfers ---

console.log("\n--- Transfer Operations ---");

// Transfer from Savings (Daniel) to Checking (Maria)
console.log("\nAttempting transfer from Daniel's Savings to Maria's Checking (500)...");
Transfer.execute(savingsAccDaniel, checkingAccMaria, 500);
console.log("Daniel Savings after transfer:", savingsAccDaniel.balance);   // Expected: 500
console.log("Maria Checking after transfer:", checkingAccMaria.balance); // Expected: 2000 (1500 + 500)

// Transfer from Checking (Maria) to Savings (Maria) - using limit
console.log("\nAttempting transfer from Maria's Checking to Maria's Savings (2000 - using limit)...");
// Maria Checking has 2000, limit 500. Total available 2500.
Transfer.execute(checkingAccMaria, savingsAccMaria, 2000);
console.log("Maria Checking after transfer:", checkingAccMaria.balance); // Expected: 0
console.log("Maria Savings after transfer:", savingsAccMaria.balance); // Expected: 2000

// Transfer that should fail due to insufficient funds (Hugo's checking)
console.log("\nAttempting transfer from Hugo's Checking (200) to Daniel's Savings (300)...");
Transfer.execute(checkingAccHugo, savingsAccDaniel, 300); // Should fail: "Insufficient balance"
console.log("Hugo Checking after failed transfer:", checkingAccHugo.balance); // Expected: 200 (unchanged)
console.log("Daniel Savings after failed transfer attempt:", savingsAccDaniel.balance); // Expected: 500 (unchanged)

// Transfer between different account types (Checking to Savings)
console.log("\nAttempting transfer from Maria's Checking to Daniel's Savings (100)...");
Transfer.execute(checkingAccMaria, savingsAccDaniel, 100);
console.log("Maria Checking after transfer:", checkingAccMaria.balance); // Expected: -100 (used limit)
console.log("Daniel Savings after transfer:", savingsAccDaniel.balance);   // Expected: 600

console.log("\n--- Final Balances ---");
console.log("Daniel Savings:", savingsAccDaniel.balance);
console.log("Maria Checking:", checkingAccMaria.balance);
console.log("Maria Savings:", savingsAccMaria.balance);
console.log("Hugo Checking:", checkingAccHugo.balance);
