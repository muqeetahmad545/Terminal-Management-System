import { RouteObject } from 'react-router-dom';
import { Layout } from '../components';
import TerminalsList from '../../modules/terminals/components/TerminalsList';
import TerminalForm from '../../modules/terminals/components/TerminalForm';
import ProtectedRoutes from './ProtectedRoutes';
import TerminalConfigurations from '../../modules/terminals/components/TerminalConfigurations';

const TerminalRoutes: RouteObject[] = [
	{
		path: '/terminals',
		element: <ProtectedRoutes role={['Admin']} />,
		children: [
			{
				index: true,
				element: (
					<Layout>
						<TerminalsList />
					</Layout>
				),
			},
			{
				path: 'create',
				element: (
					<Layout>
						<TerminalForm />
					</Layout>
				),
			},
			{
				path: 'edit/:id',
				element: (
					<Layout>
						<TerminalForm />
					</Layout>
				),
			},
			{
				path: 'configurations/:id',
				element: (
					<Layout>
						<TerminalConfigurations />
					</Layout>
				),
			},
		],
	},
];

export default TerminalRoutes;
