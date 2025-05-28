import { useEffect, useState } from 'react';
import { AuthInterFace } from '../../../domain/models/Login';
import { AuthRepositry } from '../../../data/repositries/Auth/AuthRepositry';
import { AuthUseCases } from '../../../domain/usecases/auth/AuthUseCases';

export const useAuthUser = () => {
	//? STATES
	const [users, setUsers] = useState<AuthInterFace[]>([]);
	const [recordStats, setRcordStats] = useState({ active: 0, inactive: 0 });

	//? INSTANCES
	const authRepositry = new AuthRepositry();
	const authUseCases = new AuthUseCases(authRepositry);

	//? HANDLERS
	const FetchAllUsers = async () => {
		const data = await authUseCases.FetchAllUsers({});
		const inActiveUsersCount = data.filter(
			(user) => user.status === 'Inactive',
		).length;
		const activeUsersCount = data.filter(
			(user) => user.status === 'Active',
		).length;

		setRcordStats({
			inactive: inActiveUsersCount,
			active: activeUsersCount,
		});
		setUsers(data);

		return data;
	};

	//? EFFECTS
	useEffect(() => {
		FetchAllUsers();
	}, []);

	//? RETURN
	return { users, recordStats, authUseCases, setUsers, FetchAllUsers };
};
