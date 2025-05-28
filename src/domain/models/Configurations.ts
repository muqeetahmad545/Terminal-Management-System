import { Merchant } from './Merchant';
import { Organization } from './Organization';
import { Terminal } from './Terminals';

export interface Configurations {
	id?: number;
	validate_date_time: boolean;
	geo_location: boolean;
	stand_alone_mode: boolean;
	auto_print_merchant_copy: boolean;
	auto_print_customer_copy: boolean;
	qr_code_receipts: boolean;
	automatically_sms_receipts: boolean;
	automatically_email_receipts: boolean;
	card_present_terminal: boolean;
	type: string;
	organization_id?: number;
	merchant_id?: number;
	terminal_id?: number;
	organization?: Organization;
	merchant?: Merchant;
	terminal?: Terminal;
}
