import AppLoader from './AppLoader';

interface AppButtonProps {
	appButtonOnClick?: (e: React.MouseEvent) => void;
	appBtnText?: string;
	icon?: string;
	appIsBtnRadius?: boolean;
	appIsOutlineBtn?: boolean;
	appIsShortBtn?: boolean;
	appIsBgDark?: boolean;
	appIsLoader?: boolean;
}

const AppButton = ({
	appButtonOnClick,
	appBtnText,
	appIsBtnRadius,
	appIsOutlineBtn,
	appIsShortBtn,
	appIsBgDark,
	appIsLoader,
	icon,
}: AppButtonProps) => {
	return (
		<button
			disabled={appIsLoader}
			onClick={appButtonOnClick}
			type='button'
			className={`${appIsBtnRadius ? 'rounded-full h-11' : 'h-12 rounded-md'} 
			${
				appIsOutlineBtn
					? 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-indigo-900'
					: 'theme-color text-white hover:bg-orange-500'
			} 
			${appIsShortBtn ? 'w-[100px]  !h-10' : 'w-[150px]'}  

			${appIsBgDark ? '!bg-orange-500' : ''}
			
						${icon}

			text-sm     font-normal  px-3    py-2.5`}
		>
			{appIsLoader ? <AppLoader /> : appBtnText || 'Create'}

		</button>
	);
};

export default AppButton;
