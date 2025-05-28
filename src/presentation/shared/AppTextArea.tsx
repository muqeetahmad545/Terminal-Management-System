import { ChangeEvent } from 'react';

interface AppTextAreaInterface {
	appTextValue: string;
	appOnTextchange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	appTextName: string;
}

const AppTextArea = ({
	appTextValue,
	appOnTextchange,
	appTextName,
}: AppTextAreaInterface) => {
	return (
		<textarea
			id='message'
			rows={4}
			className='absolute top-0 left-0 block w-full h-full px-3 py-4 text-xs text-gray-700 border-none rounded-md focus:outline-gray-200 dark:bg-gray-700'
			placeholder=''
			onChange={appOnTextchange}
			value={appTextValue}
			name={appTextName}
		></textarea>
	);
};

export default AppTextArea;
