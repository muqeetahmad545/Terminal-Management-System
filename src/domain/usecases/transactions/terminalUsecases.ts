import { TransactionRepositry } from "../../../data/repositries/Transactions/TransactionsRepositry";
import { UserFilterParams } from "../../models/Login";

export class TransactionUseCases {
  constructor(private transactionRepo: TransactionRepositry) {}

  //
  async findTransactions(queryParams: UserFilterParams) {
    const transactions = await this.transactionRepo.getAllTransactions(
      queryParams
    );
    return transactions;
  }

  async findTransactionByID(id: string) {
    const transaction = await this.transactionRepo.getAllTransactionById(id);
    return transaction;
  }
}
