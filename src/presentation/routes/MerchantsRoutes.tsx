import { RouteObject } from 'react-router-dom';
import { Layout } from '../components';
import MerchantsList from '../../modules/merchants/components/MerchantsList';
import MerchantsForm from '../../modules/merchants/components/MerchantsForm';
import ProtectedRoutes from './ProtectedRoutes';
import MerchantConfigurations from '../../modules/merchants/components/MerchantConfigurations';

const MerchantsRoutes: RouteObject[] = [
	{
		path: '/merchants',
		element: <ProtectedRoutes role={['Admin']} />,
		children: [
			{
				index: true,
				element: (
					<Layout>
						<MerchantsList />
					</Layout>
				),
			},
			{
				path: 'create',
				element: (
					<Layout>
						<MerchantsForm />
					</Layout>
				),
			},
			{
				path: 'edit/:id',
				element: (
					<Layout>
						<MerchantsForm />
					</Layout>
				),
			},
			{
				path: 'configurations/:id',
				element: (
					<Layout>
						<MerchantConfigurations />
					</Layout>
				),
			},
		],
	},
];

export default MerchantsRoutes;
