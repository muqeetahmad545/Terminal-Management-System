import { UserFilterParams } from "../../../domain/models/Login";
import { Transactions } from "../../../domain/models/Transactions";
import axiosInstance from "../../api/axiosInstance";
import { ITransaction } from "./I_TransactionRepositry";

export class TransactionRepositry implements ITransaction {
  async getAllTransactions(
    queryParams: UserFilterParams
  ): Promise<Transactions[]> {
    const response = await axiosInstance.get<{ data: Transactions[] }>(
      "transactions",
      { params: queryParams }
    );
    return response.data.data;
  }
  async getAllTransactionById(id: string): Promise<Transactions> {
    const response = await axiosInstance.get<{ data: Transactions }>(
      "transactions/" + id
    );
    return response.data.data;
  }
}
