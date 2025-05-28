import { ArrowLeftRight, Banknote, ReceiptText, Settings } from 'lucide-react';
interface TabsProps {
	activeIndex: number;
	setActiveIndex: (index: number) => void;
}
const AppConfigTabsBar = ({ activeIndex, setActiveIndex }: TabsProps) => {
	const tabsHeader = [
		{
			label: 'General Settings',
			icon: <Settings size={18} />,
		},
		{
			label: 'Receipt Settings',
			icon: <ReceiptText size={18} />,
		},
		{
			label: 'Payment Methods',
			icon: <Banknote size={18} />,
		},
		{
			label: 'Transaction Types',
			icon: <ArrowLeftRight size={18} />,
		},
	];
	return (
		<ul className='flex items-center justify-between gap-3 p-3 rounded-md bg-gray-50 tabs mt-5'>
			{tabsHeader.map((tab, index) => (
				<li
					key={index}
					onClick={() => setActiveIndex(index)} // Update the active index
					className={`cursor-pointer flex items-center gap-2 ${
						activeIndex === index
							? 'text-purple-600  border-purple-600'
							: 'text-gray-500'
					}`}
				>
					<span>{tab.icon}</span>
					{tab.label}
				</li>
			))}
		</ul>
	);
};

export default AppConfigTabsBar;
