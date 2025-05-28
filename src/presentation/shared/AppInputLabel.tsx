interface AppInputLabelProps {
	appInoutLabelText: string;
	appIsBgDark?: boolean;
}
const AppInputLabel = ({
	appInoutLabelText,
	appIsBgDark,
}: AppInputLabelProps) => {
	return (
		<label
			htmlFor=''
			className={`${
				appIsBgDark ? 'bg-blue-950 text-white' : 'bg-white text-gray-500'
			} absolute top-0 z-10 inline-block px-3 text-sm -translate-y-1/2  left-5`}
		>
			{appInoutLabelText}
		</label>
	);
};

export default AppInputLabel;
