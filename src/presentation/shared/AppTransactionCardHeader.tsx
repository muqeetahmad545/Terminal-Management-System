import AppButton from './AppButton';

interface AppTransactionCardHeader {
	appTransactionCardTitle: string;
	appIsTrasactionButton?: boolean;
}

const AppTransactionCardHeader = ({
	appTransactionCardTitle,
	appIsTrasactionButton,
}: AppTransactionCardHeader) => {
	return (
		<div className='flex items-center justify-between pb-3 mb-5 border-b border-gray-200'>
			<strong className='text-sm font-medium text-gray-600'>
				{appTransactionCardTitle}
			</strong>
			{appIsTrasactionButton && (
				<AppButton
					appBtnText='Open'
					appIsBtnRadius={true}
					appIsOutlineBtn={true}
					appIsShortBtn={true}
				/>
			)}
		</div>
	);
};

export default AppTransactionCardHeader;
