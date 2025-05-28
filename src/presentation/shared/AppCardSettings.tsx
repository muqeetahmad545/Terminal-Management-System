import { ReactNode } from 'react';

interface AppCardSettingsInterface {
	appCardIcon: ReactNode;
	appCardTitle: string;
	appCardMessage: string;
	appCardIsActive: boolean;
	appCardonClick: () => void;
}

const AppCardSettings = ({
	appCardIcon,
	appCardTitle,
	appCardMessage,
	appCardIsActive,
	appCardonClick,
}: AppCardSettingsInterface) => {
	return (
		<div
			onClick={appCardonClick}
			className={` relative p-5   border transition-all rounded-md cursor-pointer ${
				appCardIsActive ? 'border-purple-600 ' : 'border-gray-300  '
			}`}
		>
			<div className=''>
				<div className='flex items-center gap-2 mb-3'>
					<span className='text-gray-600'>{appCardIcon}</span>
					<strong className='block font-medium text-gray-700'>
						{appCardTitle}
					</strong>
					<div
						className={`relative ml-4 w-11 h-6 rounded-full transition-colors ${
							appCardIsActive ? 'bg-purple-600' : 'bg-gray-300'
						}`}
					>
						<div
							className={`absolute top-1/2 -translate-y-1/2 start-[2px] w-5 h-5 rounded-full bg-white transition-transform ${
								appCardIsActive ? 'translate-x-full' : 'translate-x-0'
							}`}
						></div>
					</div>
				</div>

				<p className='text-sm text-gray-600'>{appCardMessage}</p>
			</div>
			<div>
				<input
					type='checkbox'
					checked={appCardIsActive}
					onChange={appCardonClick}
					className='hidden'
				/>
			</div>
		</div>
	);
};

export default AppCardSettings;
