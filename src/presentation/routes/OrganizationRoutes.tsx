import { RouteObject } from 'react-router-dom';

import { Layout } from '../components';
import OrganizationList from '../../modules/organizations/components/OrganizationList';
import OrganizationForm from '../../modules/organizations/components/OrganizationForm';
import ProtectedRoutes from './ProtectedRoutes';
import OrganizationConfigurations from '../../modules/organizations/components/OrganizationConfigurations';

const OrganizationRoutes: RouteObject[] = [
	{
		path: '/organizations',
		element: <ProtectedRoutes role={['Admin']} />,
		children: [
			{
				index: true,
				element: (
					<Layout>
						<OrganizationList />
					</Layout>
				),
			},
			{
				path: 'create',
				element: (
					<Layout>
						<OrganizationForm />
					</Layout>
				),
			},
			{
				path: 'edit/:id',
				element: (
					<Layout>
						<OrganizationForm />
					</Layout>
				),
			},
			{
				path: 'configurations/:id',
				element: (
					<Layout>
						<OrganizationConfigurations />
					</Layout>
				),
			},
		],
	},
];

export default OrganizationRoutes;
