export interface IBankAccount {
  id: string;
  balance: number;
  getBalance(): number;
  topUp(amount: number): void;
  withdrawn(amount: number): void;
}
