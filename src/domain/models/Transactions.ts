import { Merchant } from "./Merchant";
import { Terminal } from "./Terminals";

export interface Transactions {
  id: string;
  uuid: number;
  merchant: Merchant;
  createdAt: string;
  tender_type: string;
  status: string;
  amount: number;
  rrn: string;
  stan: string;
  terminal: Terminal;
}
