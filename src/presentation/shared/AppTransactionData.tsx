interface AppTransactionDataProps {
	appTransKey: string;
	appTransValue: string | number;
	appIsTransBadge?: boolean;
}

const AppTransactionData = ({
	appTransKey,
	appTransValue,
	appIsTransBadge,
}: AppTransactionDataProps) => {
	const normalizedValue = String(appTransValue).toLowerCase();
	const colorClasses: Record<string, string> = {
		Approved: 'bg-green-50 border border-green-300 text-green-600',
		Declined: 'bg-red-50 border border-red-300 text-red-600',
		Voided: 'bg-yellow-50 border border-yellow-300 text-yellow-600',
		Refunded: 'bg-blue-50 border border-blue-300 text-blue-600',
		Failed: 'bg-red-50 border border-red-300 text-red-600',
		Reversed: 'bg-purple-50 border border-purple-300 text-purple-600',
		confirmed: 'bg-green-50 border border-green-300 text-green-600',
	};
	const status =
		colorClasses[normalizedValue] ||
		'bg-gray-50 border border-gray-300 text-gray-600';
	return (
		<p className='flex items-center justify-between mb-6 text-sm text-gray-500 rounded-md'>
			<span>{appTransKey}</span>
			{!appIsTransBadge ? (
				<span className='text-gray-800'>{appTransValue}</span>
			) : (
				<span
					className={
						status + ' text-xs uppercase font-normal px-2.5 py-0.5 rounded-full'
					}
				>
					{appTransValue}
				</span>
			)}
		</p>
	);
};

export default AppTransactionData;
