interface AppSelectOptionsInterface {
	options: { value: string; label: string }[];
	defaultOption?: string;
	onChange?: (value: string) => void;
	className?: string;
	value?: string;
}
const AppSelectOptions = ({
	options,
	defaultOption = 'Select an option',
	onChange,
	className = '',
	value,
}: AppSelectOptionsInterface) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (onChange) {
			onChange(event.target.value);
		}
	};
	return (
		<select
			value={value}
			onChange={handleChange}
			className={`bg-transparent top-0 left-0 w-full border-none  text-gray-700 text-sm rounded-md ${className}`}
		>
			<option value='' disabled selected>
				{defaultOption}
			</option>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default AppSelectOptions;
