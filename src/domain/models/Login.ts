export interface AuthInterFace {
	id?: number;
	email: string;
	password?: string;
	first_name?: string;
	last_name?: string;
	phone?: string;
	role?: string;
	status?: string;
}

export interface AuthResponseInterface {
	data: string;
	message: string;
	status: string;
}

export interface UserFilterParams {
	status?: string; // Optional field
	role?: string; // Optional field[key: string]: string; // To allow additional properties if needed
	organization_id?: number | null;
	[key: string]: string | number | null | undefined; // Allow additional properties
}
