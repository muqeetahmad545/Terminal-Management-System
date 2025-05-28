import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './presentation/components/Layout.tsx';
import { Toaster } from 'react-hot-toast';

import { AppLoginUI } from './modules/index.ts';
import {
	MerchantsRoutes,
	OrganizationRoutes,
	SuperAdminRoutes,
	TerminalRoutes,
	TransactionRoutes,
} from './presentation/routes/index.ts';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Layout>
				<p>Dahsadas</p>
			</Layout>
		),
	},
	{
		path: '/sign-in',
		element: <AppLoginUI />,
	},
	...SuperAdminRoutes,
	...OrganizationRoutes,
	...TransactionRoutes,
	...MerchantsRoutes,
	...TerminalRoutes,
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Toaster />
		<RouterProvider router={router} />
	</StrictMode>,
);
