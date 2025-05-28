import { RouteObject } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import { Layout } from '../components';
import UsersListUI from '../../modules/auth/UsersListUI';
import AppCreateNewUserUI from '../../modules/auth/AppCreateNewUserUI';

const SuperAdminRoutes: RouteObject[] = [
	{
		path: 'users',
		element: <ProtectedRoutes role={['SuperAdmin']} />,
		children: [
			{
				index: true,
				element: (
					<Layout>
						<UsersListUI />
					</Layout>
				),
			},
			{
				path: 'create',
				element: (
					<Layout>
						<AppCreateNewUserUI />{' '}
					</Layout>
				),
			},
			{
				path: 'edit/:id',
				element: (
					<Layout>
						<AppCreateNewUserUI />
					</Layout>
				),
			},
		],
	},
];

export default SuperAdminRoutes;
