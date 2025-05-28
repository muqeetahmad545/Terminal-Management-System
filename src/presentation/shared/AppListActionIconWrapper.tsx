import { ReactNode, MouseEvent } from 'react';

interface AppListActionIconWrapperProps {
	children: ReactNode;
	actionClick?: (e: MouseEvent<HTMLInputElement>) => void;
}
const AppListActionIconWrapper = ({
	children,
	actionClick,
}: AppListActionIconWrapperProps) => {
	return (
		<span
			onClick={actionClick}
			className='flex items-center justify-center w-8 h-8 border rounded-md cursor-pointer hover:bg-slate-200'
		>
			{children}
		</span>
	);
};

export default AppListActionIconWrapper;
