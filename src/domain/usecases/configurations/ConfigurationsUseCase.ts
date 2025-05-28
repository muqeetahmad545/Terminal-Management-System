import { Configurations } from '../../models/Configurations';
import { ConfigurationRepositry } from './../../../data/repositries/Configurations/Configurations';
export class ConfigurationUseCases {
	constructor(private config: ConfigurationRepositry) {}

	// MAKE
	async makeConfiguration(payload: Configurations) {
		const data = await this.config.makeConfiguration(payload);
		return data;
	}

	// FIND
	async findConfigurations(
		id: number,
		type: string,
		organization_id: number | null,
		merchant_id: number | null,
		terminal_id: number | null,
	) {
		const data = await this.config.findConfiguration(
			id,
			type,
			organization_id,
			merchant_id,
			terminal_id,
		);
		return data;
	}
}
