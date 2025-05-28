import { ReactNode } from 'react';

interface AppInputWrapperFlexContainerProps {
	children: ReactNode;
}
const AppInputWrapperFlexContainer = ({
	children,
}: AppInputWrapperFlexContainerProps) => {
	return (
		<div className='flex items-center justify-between gap-5'>{children}</div>
	);
};

export default AppInputWrapperFlexContainer;
