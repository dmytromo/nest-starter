import {IBankAccount} from './banc-account.interface';

export class BankAccount implements IBankAccount {
  id: string;
  balance: number;

  constructor() {
    this.balance = 0;
  }

  getBalance = () => this.balance;

  topUp(amount: number): void {
    this.balance = this.balance + amount;
  }

  withdrawn(amount: number): void {
    this.balance = this.balance - amount;
  }
}
