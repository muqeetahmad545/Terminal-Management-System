import { Merchant } from "./Merchant";

export interface Terminal {
  id?: string | number;
  uuid?: string;
  serial_number: string;
  model: string;
  manufacturer: string;
  display_name: string;
  warranty_expiry: string;
  created_from_portal: boolean;
  app_name?: string;
  os_name?: string;
  firmware_version?: string;
  network_name?: string;
  battery_percentage?: string | any;
  network_signal_strength?: string;
  merchant_id?: string;
  merchant?: Merchant;
  created_by?: number | null;
  status?: string;
  app_version?: string;
}
