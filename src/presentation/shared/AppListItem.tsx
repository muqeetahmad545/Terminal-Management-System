import { ReactNode } from 'react';

interface AppListItemProps {
	appIndex?: number;
	children: ReactNode;
}

const AppListItem = ({ appIndex, children }: AppListItemProps) => {
	return (
		<li
			key={appIndex}
			className='flex items-center justify-between gap-5 p-2 mb-5 text-gray-500 rounded-md bg-gray-50'
		>
			{children}
		</li>
	);
};

export default AppListItem;
