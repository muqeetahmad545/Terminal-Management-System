import { Organization } from "./Organization";
export interface Merchant {
  id?: string;
  uuid?: string;
  name: string;
  mcc: string;
  address: string;
  pin: string;
  email: string;
  phone: string;
  organization_id?: string | any;
  organization?: Organization;
  status: string;
}
