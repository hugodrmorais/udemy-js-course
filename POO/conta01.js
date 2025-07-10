// Bank Account Challenge
/*
1. Create abstract account BankAccount
- customer
- number
- balance
- deposit(amount)
- withdraw(amount)
*/

class BankAccount {
  constructor(client, number) {
    // Enforces that BankAccount cannot be instantiated directly.
    // It must be extended by a subclass.
    if (this.constructor === BankAccount) {
      throw new Error("BankAccount is an abstract class");
    }

    this.client = client;   // The account holder
    this.number = number;   // The account number
    this.balance = 0;       // Initial balance is zero
  }

  // Method to deposit money into the account
  deposit(amount) {
    this.balance += amount;
  }

  // Abstract method: must be implemented by subclasses
  withdraw() {
    throw new Error("withdraw() method must be implemented");
  }
}
