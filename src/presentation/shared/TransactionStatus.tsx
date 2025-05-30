import {
	Ban,
	CircleAlert,
	CircleCheck,
	CircleX,
	RefreshCcw,
	RotateCcw,
} from 'lucide-react';

interface TransactionStatusProps {
	transactionPrefix?: string;
	transactionStatus: string;
}

const TransactionStatus = ({
	transactionPrefix,
	transactionStatus,
}: TransactionStatusProps) => {
	const normalizedValue = transactionStatus.toLowerCase();
	const statusIcons: Record<string, JSX.Element> = {
		approved: <CircleCheck size={15} />,
		confirmed: <CircleCheck size={15} />,
		declined: <CircleAlert size={15} />,
		voided: <Ban size={15} />,
		refunded: <RefreshCcw size={15} />,
		failed: <CircleX size={15} />,
		reversed: <RotateCcw size={15} />,
	};

	const colorClasses: Record<string, string> = {
		approved: 'bg-green-50 border-green-300 text-green-600',
		confirmed: 'bg-green-50 border-green-300 text-green-600',
		declined: 'bg-red-50 border-red-300 text-red-600',
		voided: 'bg-yellow-50 border-yellow-300 text-yellow-600',
		refunded: 'bg-blue-50 border-blue-300 text-blue-600',
		failed: 'bg-red-50 border-red-300 text-red-600',
		reversed: 'bg-purple-50 border-purple-300 text-purple-600',
	};

	const transactionIcon = statusIcons[normalizedValue];
	const statusClasses =
		colorClasses[normalizedValue] ||
		'bg-gray-50 border border-gray-300 text-gray-600';

	return (
		<div className='flex flex-1 items-center justify-start gap-2 w-[100px]'>
			<span
				className={`flex items-center justify-center w-6 h-6 border rounded-md ${statusClasses}`}
			>
				{transactionIcon}
			</span>
			<p>
				<strong className='block text-sm font-medium'>
					{transactionPrefix}
				</strong>{' '}
				<span className='text-sm capitalize'>{transactionStatus}</span>
			</p>
		</div>
	);
};

export default TransactionStatus;
