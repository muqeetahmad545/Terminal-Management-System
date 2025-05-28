import { ReactNode } from 'react';

interface AppInputWrapperProps {
	children: ReactNode;
	appInputIsDescription?: boolean;
	appIsError?: boolean;
}
const AppInputWrapper = ({
	children,
	appInputIsDescription,
	appIsError,
}: AppInputWrapperProps) => {
	return (
		<div
			className={`relative ${
				appInputIsDescription ? 'h-32' : 'h-12'
			}   border rounded-md ${
				appIsError ? 'mb-10' : 'mb-7'
			} input-wrapper h flex-1`}
		>
			{children}
		</div>
	);
};

export default AppInputWrapper;
