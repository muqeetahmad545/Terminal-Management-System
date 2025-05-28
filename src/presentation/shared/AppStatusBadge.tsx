import { MouseEvent } from 'react';

interface AppStatusBadgeInterface {
	appStatus: string;
	appStatusType?: string;
	appStatusClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}

const AppStatusBadge = ({
	appStatus,
	appStatusClick,
}: AppStatusBadgeInterface) => {
	const statusClass =
		appStatus === 'Active'
			? 'bg-green-50  border-green-300 text-green-500'
			: appStatus === 'Inactive'
			? 'bg-red-50  border-red-300 text-red-500'
			: 'bg-yellow-50  border-yellow-300 text-yellow-500';

	return (
		<span
			onClick={appStatusClick}
			className={`${statusClass} cursor-pointer  border text-xs uppercase font-normal px-2.5 py-0.5 rounded-full `}
		>
			{appStatus}
		</span>
	);
};

export default AppStatusBadge;
