import { UserFilterParams } from '../../../domain/models/Login';
import { SuccessReponseInterface } from '../../../domain/models/Organization';
import { Terminal } from '../../../domain/models/Terminals';
import axiosInstance from '../../api/axiosInstance';
import { I_TerminalRepositry } from './I_TerminalRepositry';
export class TerminalRepositery implements I_TerminalRepositry {
	async createTerminal(
		payload: Terminal | FormData,
	): Promise<SuccessReponseInterface> {
		const response = await axiosInstance.post('terminals', payload);
		return response.data;
	}
	async findAllTerminals(filterParams: UserFilterParams): Promise<Terminal[]> {
		const response = await axiosInstance.get<{ data: Terminal[] }>(
			'terminals',
			{ params: filterParams },
		);
		return response.data.data;
	}
	async findOneTerminalByPK(id: number): Promise<Terminal> {
		const response = await axiosInstance.get<{ data: Terminal }>(
			'terminals/' + id,
		);
		return response.data.data;
	}
	async deleteTerminal(id: number): Promise<SuccessReponseInterface> {
		const response = await axiosInstance.delete('terminals/' + id);
		return response.data;
	}
	async updateTerminal(
		payload: Terminal,
		id: number,
	): Promise<SuccessReponseInterface> {
		const response = await axiosInstance.put('terminals/' + id, payload);
		return response.data;
	}
}
