import {Injectable} from '@nestjs/common';
import {IBankAccount} from './banc-account.interface';
import {BankAccount} from './banc-account.entity';

@Injectable()
export class BankAccountService {
  createNewAccount(): IBankAccount {
    return new BankAccount();
  }

  topUpAccount(bankAccount: IBankAccount, amount: number): void {
    bankAccount.topUp(amount);
  }

  withdrawnAccount(bankAccount: IBankAccount, amount: number): void {
    bankAccount.withdrawn(amount);
  }
}
