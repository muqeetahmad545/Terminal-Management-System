import { Configurations } from '../../../domain/models/Configurations';
import { SuccessReponseInterface } from '../../../domain/models/Organization';

export interface I_Configuration {
	makeConfiguration(payload: Configurations): Promise<SuccessReponseInterface>;
	findConfiguration(
		id: number,
		type: string,
		organization_id?: number | null,
		merchant_id?: number | null,
		terminal_id?: number | null,
	): Promise<Configurations>;
}
