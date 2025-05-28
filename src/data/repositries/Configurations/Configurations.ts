import { Configurations } from './../../../domain/models/Configurations';

import { SuccessReponseInterface } from '../../../domain/models/Organization';
import axiosInstance from '../../api/axiosInstance';
import { I_Configuration } from './I_Configurations';

export class ConfigurationRepositry implements I_Configuration {
	async makeConfiguration(
		payload: Configurations,
	): Promise<SuccessReponseInterface> {
		const data = await axiosInstance.post('/configurations', payload);
		return data.data;
	}

	async findConfiguration(
		id: number,
		type: string,
		organization_id: number | null,
		merchant_id: number | null,
		terminal_id: number | null,
	): Promise<Configurations> {
		const data = await axiosInstance.get<{ data: Configurations }>(
			'/configurations/' + id,
			{
				params: { type, organization_id, merchant_id, terminal_id },
			},
		);
		return data.data.data;
	}
}
