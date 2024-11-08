import {Test, TestingModule} from '@nestjs/testing';
import {BankAccountService} from './bank-account.service';

describe('BankAccountService', () => {
  let service: BankAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankAccountService],
    }).compile();

    service = module.get<BankAccountService>(BankAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Balance operations', () => {
    it('Create new Bank account, initial balance should be 0', () => {
      const bankAccount = service.createNewAccount();
      const balance = bankAccount.getBalance();
      expect(balance).toBe(0);
    });

    it('Top-up Bank account with 10$, should increase amout by 10$', () => {
      const TOP_UP_AMOUNT = 10;
      const bankAccount = service.createNewAccount();
      const initialBalance = bankAccount.getBalance();
      expect(initialBalance).toBe(0);
      service.topUpAccount(bankAccount, TOP_UP_AMOUNT);
      const updatedBalance = bankAccount.getBalance();
      expect(updatedBalance).toBe(TOP_UP_AMOUNT);
      expect(updatedBalance - initialBalance).toBe(TOP_UP_AMOUNT);
    });

    it('Withdrawn account with 10$, should decrease amout by 10$', () => {
      const TOP_UP_AMOUNT = 20;
      const WITHDRAWN_AMOUNT = 10;
      const bankAccount = service.createNewAccount();
      const initialBalance = bankAccount.getBalance();
      expect(initialBalance).toBe(0);
      service.topUpAccount(bankAccount, TOP_UP_AMOUNT);
      service.withdrawnAccount(bankAccount, WITHDRAWN_AMOUNT);
      const updatedBalance = bankAccount.getBalance();
      expect(updatedBalance).toBe(10);
      expect(updatedBalance + WITHDRAWN_AMOUNT).toBe(TOP_UP_AMOUNT);
    });
  });
});
