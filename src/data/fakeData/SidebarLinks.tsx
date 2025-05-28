import {
	Banknote,
	Building2,
	LayoutPanelLeft,
	TabletSmartphone,
	Users,
} from 'lucide-react';

export const sidebarLinks = [
	{
		icon: <Users className='inline-block' size={20} />,
		text: 'Users',
		url: '/users',
		class: '',
		roles: ['SuperAdmin'],
	},
	{
		icon: <LayoutPanelLeft className='inline-block' size={20} />,
		text: 'Dashboard',
		url: '/',
		class: '',
		roles: ['Admin'],
	},
	{
		icon: <Building2 className='inline-block ' size={20} />,
		text: 'Organizations',
		url: '/organizations',
		class: 'active-menu',
		roles: ['Admin'],
	},
	{
		icon: <Users className='inline-block' size={20} />,
		text: 'Merchants',
		url: '/merchants',
		roles: ['Admin'],
	},
	{
		icon: <TabletSmartphone className='inline-block' size={20} />,
		text: 'Terminals',
		url: '/terminals',
		roles: ['Admin'],
	},
	{
		icon: <Banknote className='inline-block' size={20} />,
		text: 'Transactions',
		url: '/transactions',
		roles: ['Admin'],
	},
];
