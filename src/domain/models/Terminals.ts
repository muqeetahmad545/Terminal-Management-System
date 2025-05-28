import { Merchant } from './Merchant';

export interface Terminal {
	id?: number;
	serial_number: string;
	model: string;
	manufacturer: string;
	created_from_portal: boolean;
	app_name?: string;
	os_name?: string;
	firmware_version?: string;
	network_name?: string;
	battery_percentage?: string;
	network_signal_strength?: string;
	merchant_id?: number;
	merchant?: Merchant;
	created_by?: number | null;
	status?: string;
}
