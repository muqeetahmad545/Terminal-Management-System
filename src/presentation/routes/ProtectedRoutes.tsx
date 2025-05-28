import { Navigate, Outlet } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { decodeToken } from 'react-jwt';

interface RolesInterface {
	role: string[];
}

export interface DecodedTokenInterface {
	role: string;
	id: string;
	exp: number;
}

const ProtectedRoutes = ({ role }: RolesInterface) => {
	const token = localStorage.getItem('token') || '';
	const { isExpired } = useJwt(token);
	const decoded = decodeToken<DecodedTokenInterface>(token);

	if (!decoded) {
		console.log('Token is still being decoded or is invalid.');
		// return null; // or a loading spinner if needed
	}

	// const userRole = decoded?.role;
	const userRole = localStorage.getItem('role') || '';

	if (!token) {
		// Redirect to sign-in if no token or unable to decode
		return <Navigate to='/sign-in' replace />;
	}

	if (!role.includes(userRole)) {
		console.log('ROLE NOT MATCHING');
		return <Navigate to={'/'} replace />;
	}

	if (isExpired) {
		return <Navigate to={'/sign-in'} replace />;
	}

	return <Outlet />;
};

export default ProtectedRoutes;
