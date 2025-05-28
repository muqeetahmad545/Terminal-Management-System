import { ChangeEvent } from 'react';

interface AppInputFiledInterface {
	appIsBgDark?: boolean;
	appOnInputChnage?: (e: ChangeEvent<HTMLInputElement>) => void;
	appInputName?: string;
	appInputValue?: string;
	appInputType?: string;
}

const AppInputField = ({
	appIsBgDark,
	appOnInputChnage,
	appInputName,
	appInputValue,
	appInputType,
}: AppInputFiledInterface) => {
	return (
		<>
			<input
				onChange={appOnInputChnage}
				name={appInputName}
				value={appInputValue}
				type={appInputType || 'text'}
				className={`${
					appIsBgDark ? 'bg-transparent text-white ' : ''
				} relative top-0 left-0 w-full h-full px-3 text-xs text-gray-700 border-none rounded-md focus:outline-gray-200`}
			/>
		</>
	);
};

export default AppInputField;
