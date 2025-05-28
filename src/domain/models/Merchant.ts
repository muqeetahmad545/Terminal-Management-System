import { Organization } from './Organization';
export interface Merchant {
	id?: number;
	name: string;
	mcc: string;
	address: string;
	pin: string;
	email: string;
	phone: string;
	organization_id?: number | null;
	organization?: Organization;
	status: string;
}
