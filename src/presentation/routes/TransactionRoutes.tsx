import { RouteObject } from 'react-router-dom';
import { Layout } from '../components';
import TransactionList from '../../modules/transactions/components/TransactionList';
import TransactionDetailsView from '../../modules/transactions/components/TransactionDetailsView';

const TransactionRoutes: RouteObject[] = [
	{
		path: '/transactions',
		element: (
			<Layout>
				<TransactionList />
			</Layout>
		),
	},
	{
		path: '/transaction/:id',
		element: (
			<Layout>
				<TransactionDetailsView />
			</Layout>
		),
	},
];

export default TransactionRoutes;
