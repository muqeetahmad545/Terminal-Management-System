import {
	AuthInterFace,
	AuthResponseInterface,
	UserFilterParams,
} from '../../../domain/models/Login';
import axiosInstance from '../../api/axiosInstance';
import { I_AuthRepositry } from './I_AuthRespositry';

export class AuthRepositry implements I_AuthRepositry {
	async loginUser(payload: AuthInterFace): Promise<AuthResponseInterface> {
		console.log('ERPPO');

		const response = await axiosInstance.post<AuthResponseInterface>(
			'/users/login',
			payload,
		);

		return response.data;
	}

	async getAllUSers(params: UserFilterParams): Promise<AuthInterFace[]> {
		const response = await axiosInstance.get<{
			data: AuthInterFace[];
		}>('/users', { params: params });
		return response.data.data;
	}

	async createNewUser(payload: AuthInterFace): Promise<AuthResponseInterface> {
		const response = await axiosInstance.post('/users', payload);
		return response.data;
	}

	async deleteUser(id: number): Promise<AuthResponseInterface> {
		const response = await axiosInstance.delete('/users/' + id);
		return response.data;
	}

	async updateUser(
		id: number,
		payload: AuthInterFace,
	): Promise<AuthResponseInterface> {
		const response = await axiosInstance.put(`users/${id}`, payload);
		return response.data;
	}

	async userDetails(id: number): Promise<AuthInterFace> {
		const response = await axiosInstance.get<{ data: AuthInterFace }>(
			'/users/' + id,
		);
		return response.data.data;
	}
}
