interface AppValidationMessageInterface {
	appValidationMessage: string;
}

const AppValidationMessage = ({
	appValidationMessage,
}: AppValidationMessageInterface) => {
	return (
		<span className='inline-block text-xs text-red-500'>
			{appValidationMessage}
		</span>
	);
};

export default AppValidationMessage;
