import { Merchant } from "./Merchant";
import { Terminal } from "./Terminals";

export interface Transactions {
  id: string;
  uuid: number;
  merchant: Merchant;
  createdAt: string;
  app_name: string;
  longitude: string;
  latitude: string;
  warranty_expiry: string;
  tender_type: string;
  status: string;
  amount: number;
  rrn: string;
  stan: string;
  terminal: Terminal;
  emv_entry_mode: string;
  emv_mid: string;
  emv_auth: string;
  emv_tvr: string;
  emv_tid: string;
  emv_aid: string;
  emv_cvm_method: string;
  emv_tsi: string;
}
