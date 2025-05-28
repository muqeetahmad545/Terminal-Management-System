import { UserFilterParams } from "../../../domain/models/Login";
import { Transactions } from "../../../domain/models/Transactions";

export interface ITransaction {
  // transactions
  getAllTransactions(queryParams: UserFilterParams): Promise<Transactions[]>;
  getAllTransactionById(id: string): Promise<Transactions>;
}
