import { AuthRepositry } from '../../../data/repositries/Auth/AuthRepositry';
import { createUserSchema } from '../../../utills/UserValidator';
import {
	AuthInterFace,
	AuthResponseInterface,
	UserFilterParams,
} from '../../models/Login';
import * as Yup from 'yup';

export class AuthUseCases {
	constructor(private authRepo: AuthRepositry) {}

	// LOGIN
	async LoginUser(auth: AuthInterFace) {
		const data = await this.authRepo.loginUser(auth);

		return data;
	}

	// FETCH USERS
	async FetchAllUsers(params: UserFilterParams) {
		const data = this.authRepo.getAllUSers(params);
		return data;
	}

	// CREATE NEW UER
	async CreateNewUser(payload: AuthInterFace): Promise<{
		success: boolean;
		data?: AuthResponseInterface;
		errors?: { [key: string]: string };
	}> {
		const errors: { [key: string]: string } = {};
		try {
			await createUserSchema.validate(payload, { abortEarly: false }); // Validates and throws an error if any field fails
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				// Loop through the errors and populate the errors object with field names and messages
				error.inner.forEach((err) => {
					if (err.path) {
						errors[err.path] = err.message;
					}
				});
				return { success: false, errors };
			}
		}
		const data = await this.authRepo.createNewUser(payload);
		return { success: true, data: data };
	}

	// DELETE USER
	async DeleteUser(id: number) {
		const data = await this.authRepo.deleteUser(id);
		return data;
	}

	// UPDATE USER
	async UpdateUser(
		id: number,
		payload: AuthInterFace,
	): Promise<{
		success: boolean;
		data?: AuthResponseInterface;
		errors?: { [key: string]: string };
	}> {
		const data = await this.authRepo.updateUser(id, payload);
		return { success: true, data };
	}

	// FIND SINGLE USER
	async FindSingleUSer(id: number) {
		const data = await this.authRepo.userDetails(id);
		return data;
	}
}
