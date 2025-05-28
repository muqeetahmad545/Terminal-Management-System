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
	const statusObject: Record<string, JSX.Element> = {
		Approved: <CircleCheck size={15} />,
		Declined: <CircleAlert size={15} />,
		Voided: <Ban size={15} />,
		Refunded: <RefreshCcw size={15} />,
		Failed: <CircleX size={15} />,
		Reversed: <RotateCcw size={15} />,
	};
	const transactionIcon = statusObject[transactionStatus];
	const colorClasses: Record<string, string> = {
		Approved: 'bg-green-50 border-green-300 text-green-600',
		Declined: 'bg-red-50 border-red-300 text-red-600',
		Voided: 'bg-yellow-50 border-yellow-300 text-yellow-600',
		Refunded: 'bg-blue-50 border-blue-300 text-blue-600',
		Failed: 'bg-red-50 border-red-300 text-red-600',
		Reversed: 'bg-purple-50 border-purple-300 text-purple-600',
	};
	const statusClasses = colorClasses[transactionStatus];
	return (
		<div className='flex flex-1 items-center justify-start gap-2 w-[100px]'>
			<span
				className={`flex items-center justify-center w-6 h-6 border  rounded-md  ${statusClasses}`}
			>
				{transactionIcon}
			</span>
			<p>
				<strong className='block text-sm font-medium'>
					{transactionPrefix}
				</strong>{' '}
				<span className='text-sm'>{transactionStatus}</span>{' '}
			</p>
		</div>
	);
};

export default TransactionStatus;
