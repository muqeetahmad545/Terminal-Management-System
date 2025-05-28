import { X } from 'lucide-react';
import './styles.css';
import { ReactNode, MouseEvent } from 'react';

interface AppModalInterface {
	appModalTitle?: string;
	children: ReactNode;
	apponModalClosed?: (e: MouseEvent<HTMLElement>) => void;
}
const AppModal = ({
	children,
	appModalTitle,
	apponModalClosed,
}: AppModalInterface) => {
	return (
		<div className='fixed top-0 left-0 w-full h-full backdrop-blur-sm modal-container flex items-center justify-center'>
			<div className='modal p-5 rounded-md bg-white w-1/2'>
				<div className='modal-header flex justify-between items-center border-b pb-2 text-gray-700'>
					<h3 className='font-medium '>{appModalTitle}</h3>
					<span className='cursor-pointer' onClick={apponModalClosed}>
						<X size={20} />
					</span>
				</div>

				<div className='modal-body mt-10'>{children}</div>
			</div>
		</div>
	);
};

export default AppModal;
