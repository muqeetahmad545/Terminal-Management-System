import {
	AuthInterFace,
	AuthResponseInterface,
	UserFilterParams,
} from '../../../domain/models/Login';

export interface I_AuthRepositry {
	getAllUSers(params?: UserFilterParams): Promise<AuthInterFace[]>;
	loginUser(auht: AuthInterFace): Promise<AuthResponseInterface>;
	createNewUser(auth: AuthInterFace): Promise<AuthResponseInterface>;
	deleteUser(id: number): Promise<AuthResponseInterface>;
	userDetails(id: number): Promise<AuthInterFace>;
}
